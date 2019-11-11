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
    private ffmpegFolder: string = path.join(Paths.applicatioData(), "FFmpeg");
    private _ffmpegPath: string;

    constructor(private logger: Logger) {
        // Make sure _ffmpegPath is set
        this.isFFmpegInstalled();
    }

    public get ffmpegPath(): string {
        return this._ffmpegPath;
    }

    public async ensureFFmpegIsAvailableAsync(): Promise<void> {
        if (this.isFFmpegInstalled()) {
            this.logger.info("FFmpeg is already installed. No need to download.", "FFmpegInstaller", "downloadFFmpegIfneededAsync");

            return;
        }

        this.logger.info("Start downloading FFmpeg.", "FFmpegInstaller", "downloadFFmpegIfneededAsync");
        await ffbinaries.downloadBinaries(['ffmpeg'], { destination: this.ffmpegFolder });
        this.logger.info("Finished downloading FFmpeg.", "FFmpegInstaller", "downloadFFmpegIfneededAsync");
    }

    private isFFmpegInstalled(): boolean {
        if (fs.existsSync(this.ffmpegFolder)) {
            this._ffmpegPath = fs.readdirSync(this.ffmpegFolder).find(file => file.includes('ffmpeg'));

            if (this._ffmpegPath) {
                this.logger.info(`FFmpeg was found in at ${this._ffmpegPath}`, "FFmpegInstaller", "isFFmpegInstalled");

                return true;
            }
        }

        this.logger.info(`FFmpeg was not found in folder ${this.ffmpegFolder}`, "FFmpegInstaller", "isFFmpegInstalled");

        return false;
    }
}