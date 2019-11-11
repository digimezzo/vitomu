import * as ytdl from 'ytdl-core';
import * as ffmpeg from 'fluent-ffmpeg';
import { Logger } from '../../core/logger';
import { VideoDetails } from './videoDetails';
import { Readable } from 'stream';
import * as progress from 'progress-stream';
import * as path from 'path';
import * as sanitize from 'sanitize-filename';
import * as fs from 'fs-extra';

export class YoutubeDownloader {
    private youtubeBaseUrl: string = "http://www.youtube.com/watch?v=";
    private youtubeVideoQuality: string = "highest";
    private requestOptions: any = { maxRedirects: 5 }; // TODO: shouldn't this be typed?
    private progressTimeoutMilliseconds: number = 100;
    private outputPath = "/home/raphael/Downloads/Vitomu";

    constructor(private logger: Logger) {
    }

    public async downloadAsync(ffmpegPath: string, videoId: string): Promise<void> {
        let videoUrl: string = this.youtubeBaseUrl + videoId;

        try {
            // Get info
            let videoInfo: ytdl.videoInfo = await ytdl.getInfo(videoUrl);
            let videoDetails: VideoDetails = new VideoDetails(videoInfo);
            let fileName: string = path.join(this.outputPath, sanitize(videoDetails.videoTitle) + ".mp3");

            this.logger.info(`File name: ${fileName}`, "YoutubeDownloader", "downloadAsync");

            // Make sure outputPath exists
            await fs.ensureDir(this.outputPath);

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
                    this.logger.info(`Progress: ${progress.percentage.toString()}`, "YoutubeDownloader", "downloadAsync");
                    // TODO
                });

                var outputOptions = [
                    "-id3v2_version", "4",
                    "-metadata", "title=" + videoDetails.title,
                    "-metadata", "artist=" + videoDetails.artist
                ];

                // Start encoding
                let proc: any = new ffmpeg({
                    source: videoStream.pipe(str), ffmpegPath: ffmpegPath
                })
                    .audioBitrate(videoInfo.formats[0].audioBitrate)
                    .withAudioCodec("libmp3lame")
                    .toFormat("mp3")
                    .outputOptions(outputOptions)
                    .on("error", (error) => {
                        // TODO
                        this.logger.info(`An error occurred while encoding. Error: ${error}`, "YoutubeDownloader", "downloadAsync");
                    })
                    .on("end", () => {
                        // TODO
                    })
                    .saveToFile(fileName);
            });
        } catch (error) {
            this.logger.error(`Could not download video. Error: ${error}`, "YoutubeDownloader", "downloadAsync");
        }
    }
}