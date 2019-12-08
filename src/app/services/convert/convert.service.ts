import * as ytdl from 'ytdl-core';
import * as ffmpeg from 'fluent-ffmpeg-corrected';
import { Logger } from '../../core/logger';
import { VideoDetails } from './video-details';
import { Readable } from 'stream';
import * as progress from 'progress-stream';
import * as path from 'path';
import * as sanitize from 'sanitize-filename';
import { Injectable } from '@angular/core';
import { FFmpegChecker } from './ffmpeg-checker';
import { FileSystem } from '../../core/file-system';
import { Subject, Observable } from 'rxjs';
import { AudioFormat } from '../../core/audio-format';
import { Constants } from '../../core/constants';
import { Settings } from '../../core/settings';

@Injectable({
    providedIn: 'root',
})
export class ConvertService {
    private youtubeVideoQuality: string = "highest";
    private requestOptions: any = { maxRedirects: 5 };
    private progressTimeoutMilliseconds: number = 100;
    private outputPath = path.join(this.fileSystem.musicDirectory(), "Vitomu");

    private convertStatusChanged = new Subject<boolean>();
    public convertStatusChanged$: Observable<boolean> = this.convertStatusChanged.asObservable();

    private convertProgressChanged = new Subject<number>();
    public convertProgressChanged$: Observable<number> = this.convertProgressChanged.asObservable();

    private conversionSuccessful = new Subject<string>();
    public conversionSuccessful$: Observable<string> = this.conversionSuccessful.asObservable();

    private _selectedAudioFormat: AudioFormat;
    private _selectedAudioBitrate: number;

    constructor(private logger: Logger, private ffmpegChecker: FFmpegChecker, private fileSystem: FileSystem, private settings: Settings) {
        this._selectedAudioBitrate = this.audioBitrates.find(x => x === this.settings.audioBitrate);
        this._selectedAudioFormat = this.audioFormats.find(x => x.id === this.settings.audioFormat);
    }

    public audioFormats: AudioFormat[] = Constants.audioFormats;
    public audioBitrates: number[] = Constants.audioBitrates;

    public get selectedAudioFormat(): AudioFormat {
        return this._selectedAudioFormat;
    }

    public set selectedColorTheme(v: AudioFormat) {
        this._selectedAudioFormat = v;
        this.settings.audioFormat = v.id;
    }

    public get selectedAudioBitrate(): number {
        return this._selectedAudioBitrate;
    }

    public set selectedAudioBitrate(v: number) {
        this._selectedAudioBitrate = v;
        this.settings.audioBitrate = v;
    }

    public onConvertStatusChanged(isConverting: boolean): void {
        this.convertStatusChanged.next(isConverting);
    }

    public onConvertProgressChanged(progressPercent: number): void {
        this.convertProgressChanged.next(progressPercent);
    }

    public onConvertionSuccessful(fileName: string): void {
        this.conversionSuccessful.next(fileName);
    }

    public isVideoUrlConvertible(videoUrl: string): boolean {
        if (videoUrl && videoUrl.includes('www.youtube.com/watch?v=')) {
            return true;
        }

        return false;
    }

    public async convertAsync(videoUrl: string): Promise<void> {
        try {
            await this.ffmpegChecker.ensureFFmpegIsAvailableAsync();
        } catch (error) {
            this.logger.error(`Could not ensure that FFmpeg is available. Error: ${error}`, "ConvertService", "convertAsync");
            // TODO: make sure the user sees when this fails.
            return;
        }

        if (!this.ffmpegChecker.isFfmpegInPath && !this.ffmpegChecker.ffmpegPath) {
            this.logger.error("FFmpeg is not available.", "ConvertService", "convertAsync");
            // TODO: make sure the user sees when this fails.
            return;
        }

        this.onConvertProgressChanged(0);
        this.onConvertStatusChanged(true);

        try {
            // Get info
            let videoInfo: ytdl.videoInfo = await ytdl.getInfo(videoUrl);
            let videoDetails: VideoDetails = new VideoDetails(videoInfo);
            let fileName: string = path.join(this.outputPath, sanitize(videoDetails.videoTitle) + this.selectedAudioFormat.extension);

            this.logger.info(`File name: ${fileName}`, "ConvertService", "convertAsync");

            // Make sure outputPath exists
            await this.fileSystem.ensureDirectoryAsync(this.outputPath);

            // Download
            let videoStream: Readable = ytdl.downloadFromInfo(videoInfo, { quality: this.youtubeVideoQuality, requestOptions: this.requestOptions });

            videoStream.on("response", (httpResponse) => {
                // Setup of progress module
                let str: any = progress({
                    length: parseInt(httpResponse.headers["content-length"]),
                    time: this.progressTimeoutMilliseconds
                });

                // Add progress event listener
                str.on("progress", (progress) => {
                    this.onConvertProgressChanged(parseInt(progress.percentage, 10));
                });

                if (!this.ffmpegChecker.isFfmpegInPath) {
                    ffmpeg.setFfmpegPath(this.ffmpegChecker.ffmpegPath);
                }

                // Start encoding
                   //.audioBitrate(videoInfo.formats[0].audioBitrate)
                   // Non-working link: https://www.youtube.com/watch?v=A_hbnW0Axvk&list=RDA_hbnW0Axvk&start_radio=1
                let proc: any = new ffmpeg({
                    source: videoStream.pipe(str)
                })
                    .audioBitrate(this.selectedAudioBitrate)
                    .toFormat(this.selectedAudioFormat.ffmpegFormat)
                    .on("error", (error) => {
                        this.onConvertStatusChanged(false);
                        this.logger.error(`An error occurred while encoding. Error: ${error}`, "ConvertService", "convertAsync");
                    })
                    .on("end", () => {
                        this.onConvertStatusChanged(false);
                        this.onConvertionSuccessful(fileName);
                        this.logger.info(`Convertion of video '${videoUrl}' to file '${fileName}' was succesful`, "ConvertService", "convertAsync");

                    })
                    .saveToFile(fileName);
            });
        } catch (error) {
            this.onConvertStatusChanged(false);
            this.logger.error(`Could not download video. Error: ${error}`, "ConvertService", "convertAsync");
        }
    }
}