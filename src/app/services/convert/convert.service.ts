import { Injectable } from '@angular/core';
import { Logger } from '../../core/logger';
import { FFmpegInstaller } from './ffmpegInstaller';
import { YoutubeDownloader } from './youtubeDownloader';

@Injectable({
    providedIn: 'root',
})
export class ConvertService {
    constructor(private logger: Logger) {

    }

    public initialize(): void {
        let ffmpegInstaller = new FFmpegInstaller(this.logger);
        ffmpegInstaller.downloadFFmpegIfneeded();
        let downloader: YoutubeDownloader = new YoutubeDownloader(this.logger);
        downloader.downloadAsync(ffmpegInstaller.ffmpegPath, "3BE0D9geu2o");
    }
}