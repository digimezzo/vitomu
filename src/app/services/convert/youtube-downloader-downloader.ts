import { Injectable } from '@angular/core';
import { DownloaderHelper } from 'node-downloader-helper';
import { Environment } from '../../core/environment';
import { FileSystem } from '../../core/file-system';
import { Logger } from '../../core/logger';
import { YoutubeDownloaderConstants } from './youtube-downloader-constants';

@Injectable()
export class YoutubeDownloaderDownloader {
    constructor(private environment: Environment, private fileSystem: FileSystem, private logger: Logger) {}

    public async downloadAsync(downloadFolder: string): Promise<void> {
        const promise = new Promise<void>(async (resolve, reject) => {
            await this.fileSystem.ensureDirectoryAsync(downloadFolder);

            let fileToDownload: string = YoutubeDownloaderConstants.downloaderName;

            if (this.environment.isWindows()) {
                fileToDownload = `${fileToDownload}.exe`;
            }

            const downloadUrl: string = `${YoutubeDownloaderConstants.downloaderDownloadUrl}${fileToDownload}`;
            const destinationDownloadPath: string = this.fileSystem.combinePath([downloadFolder, fileToDownload]);

            const downloaderHelper: any = new DownloaderHelper(downloadUrl, downloadFolder, {
                httpsRequestOptions: { rejectUnauthorized: false },
            });

            downloaderHelper.on('error', (err) => {
                this.logger.error(
                    `Could not download ${fileToDownload} from ${downloadUrl}. Error: ${err}`,
                    'YoutubeDownloaderDownloader',
                    'downloadAsync'
                );
                resolve();
            });

            downloaderHelper.on('start', () => {
                this.logger.info(
                    `Starting ${fileToDownload} download from ${downloadUrl}.`,
                    'YoutubeDownloaderDownloader',
                    'downloadAsync'
                );
            });

            downloaderHelper.on('end', () => {
                this.logger.info(
                    `Finished downloading ${fileToDownload} from ${downloadUrl}.`,
                    'YoutubeDownloaderDownloader',
                    'downloadAsync'
                );

                if (!this.environment.isWindows()) {
                    this.fileSystem.makeFileExecutable(destinationDownloadPath);
                }

                resolve();
            });

            downloaderHelper.start();
        });

        return promise;
    }
}
