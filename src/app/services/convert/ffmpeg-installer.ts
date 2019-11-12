import { Logger } from '../../core/logger';
import * as path from 'path';
import { Injectable } from '@angular/core';
import { FileSystem } from '../../core/file-system';
import { FFmpegDownloader } from './ffmpeg-downloader';

@Injectable()
export class FFmpegInstaller {
    private ffmpegFolder: string = path.join(this.fileSystem.applicatioDataFolder(), "FFmpeg");
    private _ffmpegPath: string;

    constructor(private logger: Logger, private ffmpegDownloader: FFmpegDownloader, private fileSystem: FileSystem) {
    }

    public get ffmpegPath(): string {
        return this._ffmpegPath;
    }

    public async ensureFFmpegIsAvailableAsync(): Promise<void> {
        let ffmpegPath: string = this.getFFmpegPath();

        if (!ffmpegPath) {
            this.logger.info("Start downloading FFmpeg.", "FFmpegInstaller", "downloadFFmpegIfneededAsync");
            await this.ffmpegDownloader.downloadAsync(this.ffmpegFolder);
            this.logger.info("Finished downloading FFmpeg.", "FFmpegInstaller", "downloadFFmpegIfneededAsync");
            ffmpegPath = this.getFFmpegPath();
        }

        this._ffmpegPath = ffmpegPath;
    }

    private getFFmpegPath(): string {
        if (this.fileSystem.existsSync(this.ffmpegFolder)) {
            let ffmpegPath: string = this.fileSystem.readdirSync(this.ffmpegFolder).find(file => file.includes('ffmpeg'));

            if (ffmpegPath) {
                this.logger.info(`FFmpeg was found in at ${ffmpegPath}`, "FFmpegInstaller", "isFFmpegInstalled");

                return ffmpegPath;
            }
        }

        this.logger.info(`FFmpeg was not found in folder ${this.ffmpegFolder}`, "FFmpegInstaller", "isFFmpegInstalled");

        return "";
    }
}