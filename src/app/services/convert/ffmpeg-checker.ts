import { Injectable } from '@angular/core';
import * as path from 'path';
import { FileSystem } from '../../core/file-system';
import { Logger } from '../../core/logger';

@Injectable()
export class FFmpegChecker {
    private ffmpegFolder: string = path.join(this.fileSystem.applicatioDataDirectory(), 'FFmpeg');

    constructor(private logger: Logger, private fileSystem: FileSystem) {
    }

    public async isFFmpegAvailableAsync(): Promise<boolean> {
        return await this.isFFmpegInSystemPathAsync() || this.getPathOfDownloadedFFmpeg() !== '';
    }

    public async isFFmpegInSystemPathAsync(): Promise<boolean> {
        return await this.fileSystem.commanExistsAsync('ffmpeg');
    }

    public getPathOfDownloadedFFmpeg(): string {
        if (!this.fileSystem.pathExists(this.ffmpegFolder)) {
            this.logger.info(`FFmpeg folder "${this.ffmpegFolder}" was not found`, 'FFmpegChecker', 'getPathOfDownloadedFFmpeg');
            return '';
        }

        const ffmpegFile: string = this.fileSystem.readDirectory(this.ffmpegFolder).find(file => file.includes('ffmpeg'));

        if (!ffmpegFile) {
            this.logger.info(`FFmpeg was not found in folder ${this.ffmpegFolder}`, 'FFmpegChecker', 'getPathOfDownloadedFFmpeg');
            return '';
        }

        const ffmpegPath: string = path.join(this.ffmpegFolder, ffmpegFile);
        this.logger.info(`FFmpeg was found in at '${ffmpegPath}'`, 'FFmpegChecker', 'getPathOfDownloadedFFmpeg');

        return ffmpegPath;
    }
}
