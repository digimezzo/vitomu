import { Injectable } from '@angular/core';
import * as child from 'child_process';
import { Environment } from '../../core/environment';
import { FileSystem } from '../../core/file-system';
import { Logger } from '../../core/logger';
import { YoutubeDownloaderConstants } from './youtube-downloader-constants';

@Injectable()
export class YoutubeDownloaderUpdater {
    constructor(private environment: Environment, private fileSystem: FileSystem, private logger: Logger) {}

    public updateYoutubeDownloader(youtubeDownloaderPath: string): void {
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
                }
            });

            process.stdout.on('data', (data) => {
                this.logger.info(data.toString(), 'YoutubeDownloaderUpdater', 'updateYoutubeDownloader');
            });
        } catch (error) {
            this.logger.error(
                `Could not update ${YoutubeDownloaderConstants.downloaderName}. Error: ${error}`,
                'YoutubeDownloaderUpdater',
                'updateYoutubeDownloader'
            );
        }
    }
}
