import { Injectable } from '@angular/core';
import * as child from 'child_process';
import { Environment } from '../../common/io/environment';
import { FileSystem } from '../../common/io/file-system';
import { Logger } from '../../common/logger';
import { YoutubeDownloaderConstants } from './youtube-downloader-constants';

@Injectable()
export class YoutubeDownloaderUpdater {
    constructor(private environment: Environment, private fileSystem: FileSystem, private logger: Logger) {}

    public async updateYoutubeDownloaderAsync(youtubeDownloaderPath: string): Promise<void> {
        const promise = new Promise<void>((resolve) => {
            try {
                this.logger.info(
                    `Executing command: ${youtubeDownloaderPath} -U`,
                    'YoutubeDownloaderUpdater',
                    'updateYoutubeDownloader'
                );

                const process: child.ChildProcess = child.execFile(youtubeDownloaderPath, ['-U'], { timeout: 5 * 60 * 1000 }, (err) => {
                    if (err) {
                        this.logger.error(
                            `An error occurred while updating ${YoutubeDownloaderConstants.downloaderName}. Error: ${err}`,
                            'YoutubeDownloaderUpdater',
                            'updateYoutubeDownloaderAsync'
                        );
                    }

                    resolve();
                });

                process.stdout?.on('data', (data) => {
                    this.logger.info(data.toString(), 'YoutubeDownloaderUpdater', 'updateYoutubeDownloader');
                });

                process.on('close', (code) => {
                    if (code === 0) {
                        this.logger.info(
                            `Finished updating ${YoutubeDownloaderConstants.downloaderName}.`,
                            'YoutubeDownloaderUpdater',
                            'updateYoutubeDownloader'
                        );
                    }
                });
            } catch (error) {
                this.logger.error(
                    `Could not update ${YoutubeDownloaderConstants.downloaderName}. Error: ${error}`,
                    'YoutubeDownloaderUpdater',
                    'updateYoutubeDownloader'
                );

                resolve();
            }
        });

        return promise;
    }
}
