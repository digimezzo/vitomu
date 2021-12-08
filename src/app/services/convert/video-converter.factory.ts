import { Injectable } from '@angular/core';
import { Environment } from '../../common/io/environment';
import { Logger } from '../../common/logger';
import { VideoConverter } from './video-converter';
import { YoutubeVideoConverter } from './youtube-video-converter';

@Injectable()
export class VideoConverterFactory {
    constructor(private environment: Environment, private logger: Logger) {}

    public create(videoUrl: string): VideoConverter {
        return new YoutubeVideoConverter(this.environment, this.logger);
    }
}
