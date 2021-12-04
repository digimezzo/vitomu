import { Injectable } from '@angular/core';
import { Environment } from '../../core/environment';
import { FileSystem } from '../../core/file-system';
import { Logger } from '../../core/logger';
@Injectable()
export class YoutubeDlDownloader {
    constructor(private environment: Environment, private fileSystem: FileSystem, private logger: Logger) {}

    public async downloadAsync(downloadFolder: string): Promise<void> {
        const promise = new Promise<void>(async (resolve, reject) => {
            await this.fileSystem.ensureDirectoryAsync(downloadFolder);

            let fileToDownload: string = 'youtube-dl';

            if (this.environment.isWindows()) {
                fileToDownload = 'youtube-dl.exe';
            }

            const source: string = `https://yt-dl.org/downloads/latest/${fileToDownload}`;
            const destinationDownloadPath: string = this.fileSystem.combinePath([downloadFolder, fileToDownload]);

            const { DownloaderHelper } = require('node-downloader-helper');

            const dl = new DownloaderHelper(source, downloadFolder, { httpsRequestOptions: { rejectUnauthorized: false } });

            dl.on('error', (err) => {
                this.logger.error(`Could not download Youtube-dl. Error: ${err}`, 'YoutubeDlDownloader', 'downloadAsync');
                resolve();
            });

            dl.on('start', () => {
                this.logger.info('Starting Youtube-dl download.', 'YoutubeDlDownloader', 'downloadAsync');
            });

            dl.on('end', () => {
                this.logger.info('Finished downloading Youtube-dl.', 'YoutubeDlDownloader', 'downloadAsync');

                if (!this.environment.isWindows()) {
                    this.fileSystem.makeFileExecutable(destinationDownloadPath);
                }

                resolve();
            });

            dl.start();
        });

        return promise;
    }
}
