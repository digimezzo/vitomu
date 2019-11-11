import { Injectable } from '@angular/core';
import { Logger } from '../../core/logger';
import { FFmpegInstaller } from './ffmpegInstaller';
import { YoutubeDownloader } from './youtubeDownloader';

@Injectable({
    providedIn: 'root',
})
export class ConvertService {
    constructor(private logger: Logger, private ffmpegInstaller: FFmpegInstaller, private youtubeDownloader: YoutubeDownloader) {

    }

    public async initializeAsync(): Promise<void> {
        await this.ffmpegInstaller.downloadFFmpegIfneededAsync();
    }

    public async convertAsync(videoId: string): Promise<void>{
        await this.youtubeDownloader.downloadAsync(this.ffmpegInstaller.ffmpegPath, videoId);
    }
}