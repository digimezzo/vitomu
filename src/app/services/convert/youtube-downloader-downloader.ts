import { Injectable } from '@angular/core';
import { DownloaderHelper } from 'node-downloader-helper';
import { Environment } from '../../common/io/environment';
import { FileSystem } from '../../common/io/file-system';
import { Logger } from '../../common/logger';
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

            // The download URL redirects, which leaves a request that times out after the file is
            // already complete. The default removeOnFail/removeOnStop would then delete that file.
            const downloaderHelper: any = new DownloaderHelper(downloadUrl, downloadFolder, {
                httpsRequestOptions: { rejectUnauthorized: false },
                removeOnFail: false,
                removeOnStop: false,
            });

            let isDownloadFinished: boolean = false;

            downloaderHelper.on('error', (err) => {
                this.logger.error(
                    `Could not download ${fileToDownload} from ${downloadUrl}. Error: ${err}`,
                    'YoutubeDownloaderDownloader',
                    'downloadAsync'
                );

                if (!isDownloadFinished) {
                    this.fileSystem.deleteFileIfExists(destinationDownloadPath);
                }

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
                isDownloadFinished = true;

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
