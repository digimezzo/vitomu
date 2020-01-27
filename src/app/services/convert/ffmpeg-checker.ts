import { Injectable } from '@angular/core';
import * as path from 'path';
import { FileSystem } from '../../core/file-system';
import { Logger } from '../../core/logger';

@Injectable()
export class FFmpegChecker {
    constructor(private logger: Logger, private fileSystem: FileSystem) {
    }

    public get downloadedFFmpegFolder(): string {
        return path.join(this.fileSystem.applicatioDataDirectory(), 'FFmpeg');
    }

    public async isFFmpegAvailableAsync(): Promise<boolean> {
        return await this.isFFmpegInSystemPathAsync() || this.getPathOfDownloadedFFmpeg() !== '';
    }

    public async isFFmpegInSystemPathAsync(): Promise<boolean> {
        return await this.fileSystem.commanExistsAsync('ffmpeg');
    }

    public getPathOfDownloadedFFmpeg(): string {
        if (!this.fileSystem.pathExists(this.downloadedFFmpegFolder)) {
            this.logger.info(`FFmpeg folder "${this.downloadedFFmpegFolder}" was not found`, 'FFmpegChecker', 'getPathOfDownloadedFFmpeg');

            return '';
        }

        const ffmpegFile: string = this.fileSystem.readDirectory(this.downloadedFFmpegFolder).find(file => file.includes('ffmpeg'));

        if (!ffmpegFile) {
            this.logger.info(`FFmpeg was not found in folder ${this.downloadedFFmpegFolder}`, 'FFmpegChecker', 'getPathOfDownloadedFFmpeg');

            return '';
        }

        const ffmpegPath: string = path.join(this.downloadedFFmpegFolder, ffmpegFile);
        this.logger.info(`FFmpeg was found in at '${ffmpegPath}'`, 'FFmpegChecker', 'getPathOfDownloadedFFmpeg');

        return ffmpegPath;
    }
}
