import * as child from 'child_process';
import { AudioFormat } from '../../common/audio-format';
import { Environment } from '../../common/io/environment';
import { Logger } from '../../common/logger';
import { Strings } from '../../common/strings';
import { ConversionResult } from './conversion-result';
import { VideoConverter } from './video-converter';
import { YoutubeDownloaderConstants } from './youtube-downloader-constants';

export class YoutubeVideoConverter implements VideoConverter {
    private conversionTimeoutMilliseconds: number = 30 * 60 * 1000;

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
            if (!Strings.isNullOrWhiteSpace(youtubeDownloaderPathOverride)) {
                youtubeDownloaderExecutable = youtubeDownloaderPathOverride;
            }

            let separator: string = '/';

            if (this.environment.isWindows()) {
                separator = '\\';
            }

            const youtubeDownloaderArguments: string[] = [videoUrl];

            if (!Strings.isNullOrWhiteSpace(ffmpegPathOverride)) {
                youtubeDownloaderArguments.push('--ffmpeg-location', ffmpegPathOverride);
            }

            youtubeDownloaderArguments.push(
                '--no-check-certificate',
                '--no-playlist',
                '--newline',
                '--print',
                'after_move:__VITOMU_OUTPUT__%(filepath)s',
                '--progress',
                '--progress-template',
                'download:__VITOMU_PROGRESS__%(progress._percent_str)s',
                '--progress-template',
                'postprocess:__VITOMU_POSTPROCESS__',
                '--output',
                `${outputDirectory}${separator}%(title)s.%(ext)s`,
                '-f',
                'bestaudio',
                '--extract-audio',
                '--audio-format',
                audioFormat.ffmpegFormat,
                '--audio-quality',
                `${bitrate}k`
            );
            this.logger.info(
                `Executing command: ${youtubeDownloaderExecutable} ${youtubeDownloaderArguments.join(' ')}`,
                'YoutubeVideoConverter',
                'convertAsync'
            );

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
                const process: child.ChildProcess = child.execFile(youtubeDownloaderExecutable, youtubeDownloaderArguments, {
                    timeout: this.conversionTimeoutMilliseconds,
                    maxBuffer: 10 * 1024 * 1024,
                });

                process.stdout?.on('data', (data) => processOutput(data.toString()));
                process.stderr?.on('data', (data) => processOutput(data.toString()));
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
        if (line.startsWith('__VITOMU_OUTPUT__')) {
            this.convertedFilePath = line.replace('__VITOMU_OUTPUT__', '').trim();
        } else if (line.startsWith('__VITOMU_PROGRESS__')) {
            progressCallback(this.getProgressPercentFromYoutubeDownloaderProgress(line));
        } else if (line.startsWith('__VITOMU_POSTPROCESS__')) {
            progressCallback(-1);
        }
    }

    private getProgressPercentFromYoutubeDownloaderProgress(youtubeDownloaderProgress: string): number {
        try {
            const match: RegExpMatchArray | null = youtubeDownloaderProgress.match(/(\d+(?:\.\d+)?)%/);

            if (match !== null && !Strings.isNullOrWhiteSpace(match[1])) {
                const progressPercent: number = parseFloat(match[1]);
                return Math.max(0, Math.min(100, Math.round(progressPercent)));
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
}
