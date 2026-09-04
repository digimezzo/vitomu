import * as child from 'child_process';
import { AudioFormat } from '../../common/audio-format';
import { Environment } from '../../common/io/environment';
import { Logger } from '../../common/logger';
import { Strings } from '../../common/strings';
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

            const youtubeDownloaderCommand: string = `${youtubeDownloaderExecutable} "${videoUrl}" ${ffmpegLocationParameter} --no-check-certificate --no-playlist --newline --output "${outputDirectory}${separator}%(title)s.%(ext)s" -f bestaudio --extract-audio --audio-format ${audioFormat.ffmpegFormat} --audio-quality ${bitrate}k`;
            this.logger.info(`Executing command: ${youtubeDownloaderCommand}`, 'YoutubeVideoConverter', 'convertAsync');

            try {
                let outputBuffer: string = '';
                let diagnosticOutput: string = '';
                let settled: boolean = false;
                const resolveConversion = (result: ConversionResult): void => {
                    if (!settled) {
                        settled = true;
                        resolve(result);
                    }
                };
                const processOutput = (data: string): void => {
                    diagnosticOutput += data;
                    outputBuffer += data;
                    const lines: string[] = outputBuffer.split(/\r?\n|\r/);
                    outputBuffer = lines.pop() || '';

                    lines.forEach((line) => this.processOutputLine(line, progressCallback));
                };
                const process: child.ChildProcess = child.exec(youtubeDownloaderCommand);

                process.stdout.on('data', (data) => processOutput(data.toString()));
                process.stderr.on('data', (data) => processOutput(data.toString()));
                process.on('close', (code) => {
                    processOutput(`${outputBuffer}\n`);
                    const conversionSucceeded: boolean = code === 0 && !Strings.isNullOrWhiteSpace(this.convertedFilePath);

                    if (!conversionSucceeded) {
                        this.logger.error(
                            `Conversion failed. Exit code: ${code}. Output path: ${this.convertedFilePath || '(none)'}. Process output: ${diagnosticOutput.trim() || '(none)'}`,
                            'YoutubeVideoConverter',
                            'convertAsync'
                        );
                    }

                    resolveConversion(new ConversionResult(conversionSucceeded, this.convertedFilePath));
                });
                process.on('error', (error) => {
                    this.logger.error(`Could not start conversion. Error: ${error}`, 'YoutubeVideoConverter', 'convertAsync');
                    resolveConversion(new ConversionResult(false, ''));
                });
            } catch (error) {
                this.logger.error(`Could not convert video. Error: ${error}`, 'YoutubeVideoConverter', 'convertVideoAsync');
                resolve(new ConversionResult(false, ''));
            }
        });

        return promise;
    }

    private processOutputLine(line: string, progressCallback: any): void {
        if (line.includes('[download]') && line.includes('%')) {
            progressCallback(this.getProgressPercentFromYoutubeDownloaderProgress(line));
        } else if (line.includes('[ExtractAudio] Destination:')) {
            this.convertedFilePath = this.getFilePathFromYoutubeDownloaderProgress(line);
            progressCallback(-1);
        } else if (line.includes('[download]') && line.includes('has already been downloaded')) {
            this.convertedFilePath = this.getAlreadyDownloadedFilePath(line);
        } else if (line.includes('[ExtractAudio] Not converting audio')) {
            this.convertedFilePath = this.getAlreadyConvertedFilePath(line);
        }
    }

    private getAlreadyDownloadedFilePath(youtubeDownloaderProgress: string): string {
        return youtubeDownloaderProgress.replace(/^\[download\]\s+/, '').replace(/\s+has already been downloaded\s*$/, '').trim();
    }

    private getAlreadyConvertedFilePath(youtubeDownloaderProgress: string): string {
        return youtubeDownloaderProgress.replace(/^\[ExtractAudio\] Not converting audio\s+/, '').replace(/; file is already in target format.*$/, '').trim();
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
