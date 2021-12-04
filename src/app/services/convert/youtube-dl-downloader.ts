import { Injectable } from '@angular/core';
import * as https from 'https';
import { Environment } from '../../core/environment';
import { FileSystem } from '../../core/file-system';

@Injectable()
export class YoutubeDlDownloader {
    constructor(private environment: Environment, private fileSystem: FileSystem) {}

    public async downloadAsync(downloadFolder: string): Promise<void> {
        await this.fileSystem.ensureDirectoryAsync(downloadFolder);

        let fileToDownload: string = 'youtube-dl';

        if (this.environment.isWindows()) {
            fileToDownload = 'youtube-dl.exe';
        }

        const destinationDownloadPath: string = this.fileSystem.combinePath([downloadFolder, fileToDownload]);

        const stream: any = this.fileSystem.createWriteStream(destinationDownloadPath);

        const request: any = https.get(`https://yt-dl.org/downloads/latest/${fileToDownload}`, (response: any) => {
            response.pipe(stream);
        });

        stream.on('finish', () => {
            if (!this.environment.isWindows()) {
                this.fileSystem.makeFileExecutable(destinationDownloadPath);
            }
        });

        stream.end();
    }
}
