import { Injectable } from '@angular/core';
import * as path from 'path';
import { FileSystem } from '../../core/file-system';
import { Logger } from '../../core/logger';
import { FFmpegDownloader } from './ffmpeg-downloader';

@Injectable()
export class FFmpegChecker {
    private ffmpegFolder: string = path.join(this.fileSystem.applicatioDataDirectory(), 'FFmpeg');

    constructor(private logger: Logger, private ffmpegDownloader: FFmpegDownloader, private fileSystem: FileSystem) {
    }

    public async ensureFFmpegIsAvailableAsync(): Promise<void> {
        if (await this.isFFmpegInSystemPathAsync()) {
            this.logger.info('FFmpeg command was found. No need to set FFmpeg path.', 'FFmpegChecker', 'ensureFFmpegIsAvailableAsync');

            return;
        }

        if (!this.getPathOfDownloadedFFmpeg()) {
            this.logger.info('Start downloading FFmpeg.', 'FFmpegChecker', 'ensureFFmpegIsAvailableAsync');
            await this.ffmpegDownloader.downloadAsync(this.ffmpegFolder);
            this.logger.info('Finished downloading FFmpeg.', 'FFmpegChecker', 'ensureFFmpegIsAvailableAsync');
        }
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
