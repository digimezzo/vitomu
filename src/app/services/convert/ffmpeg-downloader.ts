import * as ffbinaries from 'ffbinaries';
import { Injectable } from '@angular/core';

@Injectable()
export class FFmpegDownloader {

    constructor() {
    }

    public async downloadAsync(ffmpegFolder: string): Promise<void> {
        return new Promise((resolve, reject) => {
            ffbinaries.downloadBinaries(['ffmpeg'], { destination: ffmpegFolder }, (error: string) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }
}