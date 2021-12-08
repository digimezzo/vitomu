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
        const promise = new Promise<void>(async (resolve, reject) => {
            try {
                const updateCommand: string = `${youtubeDownloaderPath} -U`;

                this.logger.info(`Executing command:. ${updateCommand}`, 'YoutubeDownloaderUpdater', 'updateYoutubeDownloader');

                const process: child.ChildProcess = child.exec(updateCommand, (err, stdout, stderr) => {
                    if (err) {
                        this.logger.error(
                            `An error occurred while updating ${YoutubeDownloaderConstants.downloaderName}. Error: ${err}`,
                            'YoutubeDownloaderUpdater',
                            'updateYupdateYoutubeDownloaderoutubeDlAsync'
                        );

                        resolve();
                    }
                });

                process.stdout.on('data', (data) => {
                    this.logger.info(data.toString(), 'YoutubeDownloaderUpdater', 'updateYoutubeDownloader');
                });

                process.on('exit', () => {
                    this.logger.info(
                        `Finished updating ${YoutubeDownloaderConstants.downloaderName}.`,
                        'YoutubeDownloaderUpdater',
                        'updateYoutubeDownloader'
                    );

                    resolve();
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
