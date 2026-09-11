import * as child from 'child_process';
import * as path from 'path';
import { AudioFormat } from '../../common/audio-format';
import { Logger } from '../../common/logger';
import { Strings } from '../../common/strings';
import { ConversionResult } from './conversion-result';
import { VideoConverter } from './video-converter';

export class LocalVideoConverter implements VideoConverter {
    private conversionTimeoutMilliseconds: number = 30 * 60 * 1000;

    constructor(private logger: Logger) {}

    public async convertAsync(
        videoPath: string,
        outputDirectory: string,
        audioFormat: AudioFormat,
        bitrate: number,
        ffmpegPathOverride: string,
        youtubeDownloaderPathOverride: string,
        progressCallback: any
    ): Promise<ConversionResult> {
        const ffmpegExecutable: string = Strings.isNullOrWhiteSpace(ffmpegPathOverride) ? 'ffmpeg' : ffmpegPathOverride;
        const trimmedVideoPath: string = videoPath.trim();
        let convertedFilePath: string = path.join(outputDirectory, `${path.parse(trimmedVideoPath).name}${audioFormat.extension}`);

        if (path.resolve(trimmedVideoPath) === path.resolve(convertedFilePath)) {
            convertedFilePath = path.join(outputDirectory, `${path.parse(trimmedVideoPath).name}-converted${audioFormat.extension}`);
        }

        const ffmpegArguments: string[] = [
            '-y',
            '-i',
            trimmedVideoPath,
            '-vn',
            '-b:a',
            `${bitrate}k`,
            convertedFilePath,
        ];

        this.logger.info(
            `Executing command: ${ffmpegExecutable} ${ffmpegArguments.join(' ')}`,
            'LocalVideoConverter',
            'convertAsync'
        );
        progressCallback(-1);

        return await new Promise<ConversionResult>((resolve) => {
            try {
                const process: child.ChildProcess = child.execFile(ffmpegExecutable, ffmpegArguments, {
                    timeout: this.conversionTimeoutMilliseconds,
                    maxBuffer: 10 * 1024 * 1024,
                });
                let diagnosticOutput: string = '';

                process.stdout?.on('data', (data) => (diagnosticOutput += data.toString()));
                process.stderr?.on('data', (data) => (diagnosticOutput += data.toString()));
                process.on('close', (code) => {
                    const conversionSucceeded: boolean = code === 0;

                    if (!conversionSucceeded) {
                        this.logger.error(
                            `Conversion failed. Exit code: ${code}. Process output: ${diagnosticOutput.trim() || '(none)'}`,
                            'LocalVideoConverter',
                            'convertAsync'
                        );
                    }

                    resolve(new ConversionResult(conversionSucceeded, conversionSucceeded ? convertedFilePath : ''));
                });
                process.on('error', (error) => {
                    this.logger.error(`Could not start conversion. Error: ${error}`, 'LocalVideoConverter', 'convertAsync');
                    resolve(new ConversionResult(false, ''));
                });
            } catch (error) {
                this.logger.error(`Could not convert video. Error: ${error}`, 'LocalVideoConverter', 'convertAsync');
                resolve(new ConversionResult(false, ''));
            }
        });
    }
}