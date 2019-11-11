import { Logger } from '../../core/logger';
import * as path from 'path';
import { Paths } from '../../core/paths';
import * as fs from 'fs-extra';
import * as ffbinaries from 'ffbinaries';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class FFmpegInstaller {
    private ffmpegFolder: string = path.join(Paths.applicatioDataFolder(), "FFmpeg");
    private _ffmpegPath: string;

    constructor(private logger: Logger) {
    }

    public get ffmpegPath(): string {
        return this._ffmpegPath;
    }

    public async ensureFFmpegIsAvailableAsync(): Promise<void> {
        let ffmpegPath: string = this.getFFmpegPath();

        if (!ffmpegPath) {
            this.logger.info("Start downloading FFmpeg.", "FFmpegInstaller", "downloadFFmpegIfneededAsync");
            await this.downloadFFmpegAsync();
            this.logger.info("Finished downloading FFmpeg.", "FFmpegInstaller", "downloadFFmpegIfneededAsync");
            ffmpegPath = this.getFFmpegPath();
        }

        this._ffmpegPath = ffmpegPath;
    }

    private async downloadFFmpegAsync(): Promise<void> {
        return new Promise((resolve, reject) => {
            ffbinaries.downloadBinaries(['ffmpeg'], { destination: this.ffmpegFolder }, (error: string) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    private getFFmpegPath(): string {
        if (fs.existsSync(this.ffmpegFolder)) {
            let ffmpegPath: string = fs.readdirSync(this.ffmpegFolder).find(file => file.includes('ffmpeg'));

            if (ffmpegPath) {
                this.logger.info(`FFmpeg was found in at ${ffmpegPath}`, "FFmpegInstaller", "isFFmpegInstalled");

                return ffmpegPath;
            }
        }

        this.logger.info(`FFmpeg was not found in folder ${this.ffmpegFolder}`, "FFmpegInstaller", "isFFmpegInstalled");

        return "";
    }
}