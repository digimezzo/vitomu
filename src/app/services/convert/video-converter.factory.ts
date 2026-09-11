import { Injectable } from '@angular/core';
import { Environment } from '../../common/io/environment';
import { FileSystem } from '../../common/io/file-system';
import { Logger } from '../../common/logger';
import { LocalVideoFile } from './local-video-file';
import { LocalVideoConverter } from './local-video-converter';
import { VideoConverter } from './video-converter';
import { YoutubeVideoConverter } from './youtube-video-converter';

@Injectable()
export class VideoConverterFactory {
    constructor(private environment: Environment, private fileSystem: FileSystem, private logger: Logger) {}

    public create(videoSource: string): VideoConverter {
        if (LocalVideoFile.isSupported(videoSource, this.fileSystem)) {
            return new LocalVideoConverter(this.logger);
        }

        return new YoutubeVideoConverter(this.environment, this.logger);
    }
}
