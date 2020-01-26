import { Injectable } from '@angular/core';
import * as path from 'path';
import { FileSystem } from '../../core/file-system';
import { Logger } from '../../core/logger';
import { FFmpegDownloader } from './ffmpeg-downloader';

@Injectable()
export class FFmpegChecker {
    private ffmpegFolder: string = path.join(this.fileSystem.applicatioDataDirectory(), 'FFmpeg');
    private _ffmpegPath: string = '';
    private _isFfmpegInPath: boolean;

    constructor(private logger: Logger, private ffmpegDownloader: FFmpegDownloader, private fileSystem: FileSystem) {
    }

    public get ffmpegPath(): string {
        return this._ffmpegPath;
    }

    public get isFfmpegInPath(): boolean {
        return this._isFfmpegInPath;
    }

    public async ensureFFmpegIsAvailableAsync(): Promise<void> {
        this._isFfmpegInPath = await this.fileSystem.commanExistsAsync('ffmpeg');

        if (this._isFfmpegInPath) {
            this.logger.info('FFmpeg command was found. No need to set FFmpeg path.', 'FFmpegChecker', 'ensureFFmpegIsAvailableAsync');

            return;
        }

        let ffmpegPath: string = this.getDownloadedFFmpegPath();

        if (!ffmpegPath) {
            this.logger.info('Start downloading FFmpeg.', 'FFmpegChecker', 'ensureFFmpegIsAvailableAsync');
            await this.ffmpegDownloader.downloadAsync(this.ffmpegFolder);
            this.logger.info('Finished downloading FFmpeg.', 'FFmpegChecker', 'ensureFFmpegIsAvailableAsync');
            ffmpegPath = this.getDownloadedFFmpegPath();
        }

        this._ffmpegPath = ffmpegPath;
    }

    public getDownloadedFFmpegPath(): string {
        if (!this.fileSystem.pathExists(this.ffmpegFolder)) {
            this.logger.info(`FFmpeg folder "${this.ffmpegFolder}" was not found`, 'FFmpegChecker', 'getDownloadedFFmpegPath');
            return '';
        }

        const ffmpegFile: string = this.fileSystem.readDirectory(this.ffmpegFolder).find(file => file.includes('ffmpeg'));

        if (!ffmpegFile) {
            this.logger.info(`FFmpeg was not found in folder ${this.ffmpegFolder}`, 'FFmpegChecker', 'getDownloadedFFmpegPath');
            return '';
        }

        const ffmpegPath: string = path.join(this.ffmpegFolder, ffmpegFile);
        this.logger.info(`FFmpeg was found in at '${ffmpegPath}'`, 'FFmpegChecker', 'getDownloadedFFmpegPath');

        return ffmpegPath;
    }
}
