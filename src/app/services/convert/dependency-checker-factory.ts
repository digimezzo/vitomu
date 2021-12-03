import { Injectable } from '@angular/core';
import { FileSystem } from '../../core/file-system';
import { Logger } from '../../core/logger';
import { DependencyChecker } from './dependency-checker';

@Injectable()
export class DependencyCheckerFactory {
    constructor(private logger: Logger, private fileSystem: FileSystem) {}

    public createFfmpegChecker(): DependencyChecker {
        return new DependencyChecker('FFmpeg', 'ffmpeg', this.logger, this.fileSystem);
    }

    public createYoutubeDlChecker(): DependencyChecker {
        return new DependencyChecker('Youtube-dl', 'youtube-dl', this.logger, this.fileSystem);
    }
}
