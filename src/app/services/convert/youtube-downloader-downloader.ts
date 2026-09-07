import { Injectable } from '@angular/core';
import * as child from 'child_process';
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

            // Preserve completed downloads after late redirect timeouts.
            const downloaderHelper: any = new DownloaderHelper(downloadUrl, downloadFolder, {
                httpsRequestOptions: { rejectUnauthorized: false, timeout: 30000 },
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
                    reject(err);
                }
            });

            downloaderHelper.on('start', () => {
                this.logger.info(
                    `Starting ${fileToDownload} download from ${downloadUrl}.`,
                    'YoutubeDownloaderDownloader',
                    'downloadAsync'
                );
            });

            downloaderHelper.on('end', async () => {
                isDownloadFinished = true;

                try {
                    if (!this.environment.isWindows()) {
                        this.fileSystem.makeFileExecutable(destinationDownloadPath);
                    }

                    if (!(await this.isExecutableValidAsync(destinationDownloadPath))) {
                        throw new Error(`${fileToDownload} could not be executed after downloading.`);
                    }
                    this.logger.info(
                        `Finished downloading ${fileToDownload} from ${downloadUrl}.`,
                        'YoutubeDownloaderDownloader',
                        'downloadAsync'
                    );
                    resolve();
                } catch (error) {
                    this.fileSystem.deleteFileIfExists(destinationDownloadPath);
                    reject(error);
                }
            });

            downloaderHelper.start();
        });

        return promise;
    }

    public async isExecutableValidAsync(executablePath: string): Promise<boolean> {
        return await new Promise<boolean>((resolve) => {
            child.execFile(executablePath, ['--version'], { timeout: 30000 }, (error) => {
                if (error) {
                    this.logger.error(
                        `Downloaded ${YoutubeDownloaderConstants.downloaderName} is invalid. Error: ${error}`,
                        'YoutubeDownloaderDownloader',
                        'isExecutableValidAsync'
                    );
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
    }
}
