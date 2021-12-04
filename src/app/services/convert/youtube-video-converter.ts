import * as child from 'child_process';
import { AudioFormat } from '../../core/audio-format';
import { Environment } from '../../core/environment';
import { Logger } from '../../core/logger';
import { Strings } from '../../core/Strings';
import { ConversionResult } from './conversion-result';
import { VideoConverter } from './video-converter';

export class YoutubeVideoConverter implements VideoConverter {
    private youtubeVideoQuality: string = 'highest';
    private requestOptions: any = { maxRedirects: 5 };
    private progressTimeoutMilliseconds: number = 100;

    constructor(private environment: Environment, private logger: Logger) {}

    public async convertAsync(
        videoUrl: string,
        outputDirectory: string,
        audioFormat: AudioFormat,
        bitrate: number,
        ffmpegPathOverride: string,
        youtubeDlPathOverride: string,
        progressCallback: any
    ): Promise<ConversionResult> {
        const promise = new Promise<ConversionResult>(async (resolve, reject) => {
            progressCallback(0);

            let youtubeDlExecutable: string = 'youtube-dl';
            let ffmpegLocationParameter: string = '';

            if (!Strings.isNullOrWhiteSpace(youtubeDlPathOverride)) {
                youtubeDlExecutable = youtubeDlPathOverride;
            }

            if (!Strings.isNullOrWhiteSpace(ffmpegPathOverride)) {
                ffmpegLocationParameter = `--ffmpeg-location "${ffmpegPathOverride}"`;
            }

            let separator: string = '/';

            if (this.environment.isWindows()) {
                separator = '\\';
            }

            const youtubeDlCommand: string = `${youtubeDlExecutable} "${videoUrl}" ${ffmpegLocationParameter} --no-check-certificate --no-playlist --output "${outputDirectory}${separator}%(title)s.%(ext)s" -f bestaudio --extract-audio --audio-format ${audioFormat.ffmpegFormat} --audio-quality ${bitrate}k`;
            this.logger.info(`Executing command: ${youtubeDlCommand}`, 'YoutubeVideoConverter', 'convertAsync');

            try {
                const process: child.ChildProcess = child.exec(youtubeDlCommand, (err, stdout, stderr) => {
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
                    if (data.toString().includes('[download]')) {
                        const progressPercent: number = this.getProgressPercentFromYoutubeDlProgress(data.toString());
                        progressCallback(progressPercent);
                    } else if (data.toString().includes('[ffmpeg] Destination')) {
                        const filePath: string = this.getFilePathFromYoutubeDlProgress(data.toString());
                        resolve(new ConversionResult(true, filePath));
                    }
                });
            } catch (error) {
                this.logger.error(`Could not convert video. Error: ${error}`, 'YoutubeVideoConverter', 'convertVideoAsync');
                resolve(new ConversionResult(false, ''));
            }
        });

        return promise;
    }

    private getProgressPercentFromYoutubeDlProgress(youtubeDlProgress: string): number {
        try {
            // [download]  98.3% of 3.98MiB at 75.19KiB/s ETA 00:00
            const pieces: string[] = youtubeDlProgress.split('%');

            return parseInt(pieces[0].replace('[download]', '').trim(), 10);
        } catch (error) {
            this.logger.error(
                `Could not get progress percent. Error: ${error}`,
                'YoutubeVideoConverter',
                'getProgressPercentFromYoutubeDlProgress'
            );
        }

        return 0;
    }

    private getFilePathFromYoutubeDlProgress(youtubeDlProgress: string): string {
        try {
            // [ffmpeg] Destination: /home/raphael/Music/Vitomu/ilan Bluestone (@iBluestone) feat. Giuseppe De Luca - Stardust & Madness.mp
            return youtubeDlProgress.replace('[ffmpeg] Destination:', '').trim();
        } catch (error) {
            this.logger.error(`Could not get file path. Error: ${error}`, 'YoutubeVideoConverter', 'getFilePathFromYoutubeDlProgress');
        }

        return '';
    }
}
