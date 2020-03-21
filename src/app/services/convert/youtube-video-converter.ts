import * as ffmpeg from 'fluent-ffmpeg-corrected';
import * as path from 'path';
import * as progressStream from 'progress-stream';
import { Observable, Subject } from 'rxjs';
import * as sanitize from 'sanitize-filename';
import { Readable } from 'stream';
import * as ytdl from 'ytdl-core';
import { AudioFormat } from '../../core/audio-format';
import { Logger } from '../../core/logger';
import { VideoDetails } from './video-details';
import { VideoConverter } from './video-converter';
import { ConversionResult } from './conversion-result';

export class YoutubeVideoConverter implements VideoConverter {
    private youtubeVideoQuality: string = 'highest';
    private requestOptions: any = { maxRedirects: 5 };
    private progressTimeoutMilliseconds: number = 100;

    constructor(private logger: Logger) {
    }

    public async convertAsync(
        videoUrl: string,
        outputDirectory: string,
        audioFormat: AudioFormat,
        bitrate: number,
        ffmpegPathOverride: string,
        progressCallback: any): Promise<ConversionResult> {

        const promise = new Promise<ConversionResult>(async (resolve, reject) => {
            progressCallback(0);

            try {
                // Get info
                const videoInfo: ytdl.videoInfo = await ytdl.getInfo(videoUrl);
                const videoDetails: VideoDetails = new VideoDetails(videoInfo);
                const filePath: string = path.join(outputDirectory, sanitize(videoDetails.videoTitle) + audioFormat.extension);

                this.logger.info(`File path: ${filePath}`, 'YoutubeVideoConverter', 'convertVideoAsync');

                // Download
                const videoStream: Readable = ytdl.downloadFromInfo(videoInfo, {
                    quality: this.youtubeVideoQuality,
                    requestOptions: this.requestOptions
                });
                videoStream.on('response', async (httpResponse) => {
                    // Setup of progress module
                    const str: any = progressStream({
                        length: parseInt(httpResponse.headers['content-length'], 10),
                        time: this.progressTimeoutMilliseconds
                    });

                    // Add progress event listener
                    str.on('progress', (progress) => {
                        progressCallback(parseInt(progress.percentage, 10));
                    });

                    if (ffmpegPathOverride) {
                        ffmpeg.setFfmpegPath(ffmpegPathOverride);
                    }

                    // Start encoding
                    // .audioBitrate(videoInfo.formats[0].audioBitrate)
                    const proc: any = new ffmpeg({
                        source: videoStream.pipe(str)
                    })
                        .audioBitrate(bitrate)
                        .toFormat(audioFormat.ffmpegFormat)
                        .on('error', (error) => {
                            this.logger.error(`An error occurred while converting. Error: ${error}`, 'YoutubeVideoConverter', 'convertVideoAsync');
                            resolve(new ConversionResult(false, ''));
                        })
                        .on('end', () => {
                            this.logger.info(`Convertion of video '${videoUrl}' to file '${filePath}' was succesful`, 'YoutubeVideoConverter', 'convertVideoAsync');
                            resolve(new ConversionResult(true, filePath));
                        })
                        .saveToFile(filePath);
                });
            } catch (error) {
                this.logger.error(`Could not convert video. Error: ${error}`, 'YoutubeVideoConverter', 'convertVideoAsync');
                resolve(new ConversionResult(false, ''));
            }
        });

        return promise;
    }
}
