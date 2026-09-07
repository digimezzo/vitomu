import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Constants } from '../../common/application/constants';
import { AudioFormat } from '../../common/audio-format';
import { FileSystem } from '../../common/io/file-system';
import { Logger } from '../../common/logger';
import { BaseSettings } from '../../common/settings/base-settings';
import { Strings } from '../../common/strings';
import { BaseConvertService } from './base-convert.service';
import { ConversionResult as ConversionResult } from './conversion-result';
import { DependencyChecker } from './dependency-checker';
import { DependencyCheckerFactory } from './dependency-checker-factory';
import { FFmpegDownloader } from './ffmpeg-downloader';
import { VideoConverter } from './video-converter';
import { VideoConverterFactory } from './video-converter.factory';
import { YoutubeDownloaderConstants } from './youtube-downloader-constants';
import { YoutubeDownloaderDownloader } from './youtube-downloader-downloader';
import { YoutubeDownloaderUpdater } from './youtube-downloader-updater';

@Injectable({
    providedIn: 'root',
})
export class ConvertService implements BaseConvertService {
    private outputDirectory: string = '';
    private _lastConvertedFilePath: string = '';
    private _lastConvertedFileName: string = '';

    private conversionProgressChanged: Subject<number> = new Subject<number>();

    private _selectedAudioFormat: AudioFormat;
    private _selectedAudioBitrate: number;

    private ffmpegChecker: DependencyChecker = this.dependencyCheckerFactory.createFfmpegChecker();
    private youtubeDownloaderChecker: DependencyChecker = this.dependencyCheckerFactory.createYoutubeDownloaderChecker();

    constructor(
        private logger: Logger,
        private dependencyCheckerFactory: DependencyCheckerFactory,
        private ffmpegDownloader: FFmpegDownloader,
        private youtubeDownloaderDownloader: YoutubeDownloaderDownloader,
        private youtubeDownloaderUpdater: YoutubeDownloaderUpdater,
        private fileSystem: FileSystem,
        private settings: BaseSettings,
        private videoConverterFactory: VideoConverterFactory
    ) {
        this.outputDirectory = this.fileSystem.combinePath([this.fileSystem.musicDirectory(), 'Vitomu']);
        this._selectedAudioFormat = this.audioFormats.find((x) => x.id === this.settings.audioFormat)!;
        this._selectedAudioBitrate = this.audioBitrates.find((x) => x === this.settings.audioBitrate)!;
    }

    public audioFormats: AudioFormat[] = Constants.audioFormats;
    public audioBitrates: number[] = Constants.audioBitrates;

    public conversionProgressChanged$: Observable<number> = this.conversionProgressChanged.asObservable();

    public get lastConvertedFilePath(): string {
        return this._lastConvertedFilePath;
    }

    public set lastConvertedFilePath(v: string) {
        this._lastConvertedFilePath = v;
    }

    public get lastConvertedFileName(): string {
        return this._lastConvertedFileName;
    }

    public set lastConvertedFileName(v: string) {
        this._lastConvertedFileName = v;
    }

    public get selectedAudioFormat(): AudioFormat {
        return this._selectedAudioFormat;
    }

    public set selectedAudioFormat(v: AudioFormat) {
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

    public onConversionProgressChanged(progressPercent: number): void {
        this.conversionProgressChanged.next(progressPercent);
    }

    public isVideoUrlConvertible(videoUrl: string): boolean {
        if (!Strings.isNullOrWhiteSpace(videoUrl) && !/[\r\n]/.test(videoUrl)) {
            const trimmedVideoUrl: string = videoUrl.trim();
            return Constants.youtubeLinks.some((x) => trimmedVideoUrl.includes(x));
        }

        return false;
    }

    public async isFfmpegAvailableAsync(): Promise<boolean> {
        return await this.ffmpegChecker.isDependencyAvailableAsync();
    }

    public async isYoutubeDownloaderAvailableAsync(): Promise<boolean> {
        if (await this.youtubeDownloaderChecker.isDependencyInSystemPathAsync()) {
            return true;
        }

        const youtubeDownloaderPath: string = this.youtubeDownloaderChecker.getPathOfDownloadedDependency();

        if (Strings.isNullOrWhiteSpace(youtubeDownloaderPath)) {
            return false;
        }

        if (await this.youtubeDownloaderDownloader.isExecutableValidAsync(youtubeDownloaderPath)) {
            return true;
        }

        this.fileSystem.deleteFileIfExists(youtubeDownloaderPath);
        return false;
    }

    public async downloadFfmpegAsync(): Promise<void> {
        if (!(await this.ffmpegChecker.isDependencyAvailableAsync())) {
            this.logger.info('Start downloading FFmpeg.', 'ConvertService', 'downloadFfmpegAsync');
            await this.ffmpegDownloader.downloadAsync(this.ffmpegChecker.downloadedDependencyFolder);
            this.logger.info('Finished downloading FFmpeg.', 'ConvertService', 'downloadFfmpegAsync');
        }
    }

    public async downloadYoutubeDownloaderAsync(): Promise<void> {
        if (!(await this.isYoutubeDownloaderAvailableAsync())) {
            this.logger.info(
                `Start downloading ${YoutubeDownloaderConstants.downloaderName}.`,
                'ConvertService',
                'downloadYoutubeDownloaderAsync'
            );
            await this.youtubeDownloaderDownloader.downloadAsync(this.youtubeDownloaderChecker.downloadedDependencyFolder);
            this.logger.info(
                `Finished downloading ${YoutubeDownloaderConstants.downloaderName}.`,
                'ConvertService',
                'downloadYoutubeDownloaderAsync'
            );
        }
    }

    public async updateYoutubeDownloaderAsync(): Promise<void> {
        // We only update the Youtube downloader if it is our own
        const youtubeDownloaderPath: string = this.youtubeDownloaderChecker.getPathOfDownloadedDependency();

        if (!Strings.isNullOrWhiteSpace(youtubeDownloaderPath) && (await this.youtubeDownloaderDownloader.isExecutableValidAsync(youtubeDownloaderPath))) {
            this.logger.info(
                `Start updating ${YoutubeDownloaderConstants.downloaderName}.`,
                'ConvertService',
                'updateYoutubeDownloaderAsync'
            );
            await this.youtubeDownloaderUpdater.updateYoutubeDownloaderAsync(youtubeDownloaderPath);
            this.logger.info(
                `Finished updating ${YoutubeDownloaderConstants.downloaderName}.`,
                'ConvertService',
                'updateYoutubeDownloaderAsync'
            );
        } else if (!Strings.isNullOrWhiteSpace(youtubeDownloaderPath)) {
            this.fileSystem.deleteFileIfExists(youtubeDownloaderPath);
        }
    }

    public async convertAsync(videoUrl: string): Promise<ConversionResult> {
        await this.fileSystem.ensureDirectoryAsync(this.outputDirectory);

        let ffmpegPathOverride: string = '';

        if (!(await this.ffmpegChecker.isDependencyInSystemPathAsync())) {
            ffmpegPathOverride = this.ffmpegChecker.getPathOfDownloadedDependency();
        }

        let youtubeDownloaderPathOverride: string = '';

        if (!(await this.youtubeDownloaderChecker.isDependencyInSystemPathAsync())) {
            youtubeDownloaderPathOverride = this.youtubeDownloaderChecker.getPathOfDownloadedDependency();
        }

        const videoConverter: VideoConverter = this.videoConverterFactory.create(videoUrl);

        const conversionResult: ConversionResult = await videoConverter.convertAsync(
            videoUrl,
            this.outputDirectory,
            this.selectedAudioFormat,
            this.selectedAudioBitrate,
            ffmpegPathOverride,
            youtubeDownloaderPathOverride,
            (progressPercent) => this.onConversionProgressChanged(progressPercent)
        );

        if (conversionResult.isConversionSuccessful) {
            this.lastConvertedFilePath = conversionResult.convertedFilePath;
            this.lastConvertedFileName = this.fileSystem.getFileName(conversionResult.convertedFilePath);
        }

        return conversionResult;
    }
}
