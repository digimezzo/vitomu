import { Injectable } from '@angular/core';
import { FileSystem } from '../../core/file-system';
import { Logger } from '../../core/logger';
import { DependencyChecker } from './dependency-checker';
import { YoutubeDownloaderConstants } from './youtube-downloader-constants';

@Injectable()
export class DependencyCheckerFactory {
    private dependenciesSubFolder: string = 'Dependencies';

    constructor(private logger: Logger, private fileSystem: FileSystem) {}

    public createFfmpegChecker(): DependencyChecker {
        return new DependencyChecker(this.dependenciesSubFolder, 'ffmpeg', this.logger, this.fileSystem);
    }

    public createYoutubeDownloaderChecker(): DependencyChecker {
        return new DependencyChecker(this.dependenciesSubFolder, YoutubeDownloaderConstants.downloaderName, this.logger, this.fileSystem);
    }
}
