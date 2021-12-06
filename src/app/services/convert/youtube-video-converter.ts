import * as child from 'child_process';
import { AudioFormat } from '../../common/audio-format';
import { Environment } from '../../common/environment';
import { Logger } from '../../common/logger';
import { Strings } from '../../common/Strings';
import { ConversionResult } from './conversion-result';
import { VideoConverter } from './video-converter';
import { YoutubeDownloaderConstants } from './youtube-downloader-constants';

export class YoutubeVideoConverter implements VideoConverter {
    private youtubeVideoQuality: string = 'highest';
    private requestOptions: any = { maxRedirects: 5 };
    private progressTimeoutMilliseconds: number = 100;

    private convertedFilePath: string = '';

    constructor(private environment: Environment, private logger: Logger) {}

    public async convertAsync(
        videoUrl: string,
        outputDirectory: string,
        audioFormat: AudioFormat,
        bitrate: number,
        ffmpegPathOverride: string,
        youtubeDownloaderPathOverride: string,
        progressCallback: any
    ): Promise<ConversionResult> {
        const promise = new Promise<ConversionResult>(async (resolve, reject) => {
            this.convertedFilePath = '';

            progressCallback(0);

            let youtubeDownloaderExecutable: string = YoutubeDownloaderConstants.downloaderName;
            let ffmpegLocationParameter: string = '';

            if (!Strings.isNullOrWhiteSpace(youtubeDownloaderPathOverride)) {
                youtubeDownloaderExecutable = youtubeDownloaderPathOverride;
            }

            if (!Strings.isNullOrWhiteSpace(ffmpegPathOverride)) {
                ffmpegLocationParameter = `--ffmpeg-location "${ffmpegPathOverride}"`;
            }

            let separator: string = '/';

            if (this.environment.isWindows()) {
                separator = '\\';
            }

            const youtubeDownloaderCommand: string = `${youtubeDownloaderExecutable} "${videoUrl}" ${ffmpegLocationParameter} --no-check-certificate --no-playlist --output "${outputDirectory}${separator}%(title)s.%(ext)s" -f bestaudio --extract-audio --audio-format ${audioFormat.ffmpegFormat} --audio-quality ${bitrate}k`;
            this.logger.info(`Executing command: ${youtubeDownloaderCommand}`, 'YoutubeVideoConverter', 'convertAsync');

            try {
                const process: child.ChildProcess = child.exec(youtubeDownloaderCommand, (err, stdout, stderr) => {
                    if (err) {
                        this.logger.error(
                            `An error occurred while converting. Error: ${err}`,
                            'YoutubeVideoConverter',
                            'convertVideoAsync'
                        );

                        resolve(new ConversionResult(false, ''));
                    }
                });

                process.stdout.on('data', (data) => {
                    if (data.toString().includes('[download]') && data.toString().includes('%')) {
                        const progressPercent: number = this.getProgressPercentFromYoutubeDownloaderProgress(data.toString());
                        progressCallback(progressPercent);
                    } else if (data.toString().includes('[ExtractAudio] Destination:')) {
                        this.convertedFilePath = this.getFilePathFromYoutubeDownloaderProgress(data.toString());
                    } else if (data.toString().includes('Deleting original file')) {
                        resolve(new ConversionResult(true, this.convertedFilePath));
                    }
                });
            } catch (error) {
                this.logger.error(`Could not convert video. Error: ${error}`, 'YoutubeVideoConverter', 'convertVideoAsync');
                resolve(new ConversionResult(false, ''));
            }
        });

        return promise;
    }

    private getProgressPercentFromYoutubeDownloaderProgress(youtubeDownloaderProgress: string): number {
        try {
            // [download] 100% of 7.33MiB in 00:01
            const pieces: string[] = youtubeDownloaderProgress.split('%');

            const stringToParse: string = pieces[0].replace('[download]', '').trim();

            if (!Strings.isNullOrWhiteSpace(stringToParse)) {
                return parseInt(stringToParse, 10);
            }
        } catch (error) {
            this.logger.error(
                `Could not get progress percent. Error: ${error}`,
                'YoutubeVideoConverter',
                'getProgressPercentFromYoutubeDownloaderProgress'
            );
        }

        return 0;
    }

    private getFilePathFromYoutubeDownloaderProgress(youtubeDownloaderProgress: string): string {
        try {
            // [ExtractAudio] Destination: /home/raphael/Music/Vitomu/Shapov & Nerak - Heaven.mp3
            return youtubeDownloaderProgress.replace('[ExtractAudio] Destination:', '').trim();
        } catch (error) {
            this.logger.error(
                `Could not get file path. Error: ${error}`,
                'YoutubeVideoConverter',
                'getFilePathFromYoutubeDownloaderProgress'
            );
        }

        return '';
    }
}
