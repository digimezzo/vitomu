import { Injectable } from '@angular/core';
import * as path from 'path';
import { FileSystem } from '../../core/file-system';
import { Logger } from '../../core/logger';

@Injectable()
export class YoutubeDlChecker {
    constructor(private logger: Logger, private fileSystem: FileSystem) {}

    public get downloadedYoutubeDlFolder(): string {
        return path.join(this.fileSystem.applicatioDataDirectory(), 'Youtube-dl');
    }

    public async isYoutubeDlAvailableAsync(): Promise<boolean> {
        return (await this.isYoutubeDlInSystemPathAsync()) || this.getPathOfDownloadedYoutubeDl() !== '';
    }

    public async isYoutubeDlInSystemPathAsync(): Promise<boolean> {
        return await this.fileSystem.commanExistsAsync('youtube-dl');
    }

    public getPathOfDownloadedYoutubeDl(): string {
        if (!this.fileSystem.pathExists(this.downloadedYoutubeDlFolder)) {
            this.logger.info(
                `Youtube-dl folder "${this.downloadedYoutubeDlFolder}" was not found`,
                'YoutubeDlChecker',
                'getPathOfDownloadedYoutubeDl'
            );

            return '';
        }

        const youtubeDlFile: string = this.fileSystem
            .readDirectory(this.downloadedYoutubeDlFolder)
            .find((file) => file.includes('youtube-dl'));

        if (!youtubeDlFile) {
            this.logger.info(
                `Youtube-dl was not found in folder ${this.downloadedYoutubeDlFolder}`,
                'YoutubeDlChecker',
                'getPathOfDownloadedYoutubeDl'
            );

            return '';
        }

        const youtubeDlPath: string = path.join(this.downloadedYoutubeDlFolder, youtubeDlFile);
        this.logger.info(`Youtube-dl was found in at '${youtubeDlPath}'`, 'YoutubeDlChecker', 'getPathOfDownloadedYoutubeDl');

        return youtubeDlPath;
    }
}
