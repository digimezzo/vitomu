import { Injectable } from '@angular/core';
import { Logger } from '../../core/logger';
import { VideoConverter } from './video-converter';
import { YoutubeVideoConverter } from './youtube-video-converter';

@Injectable()
export class VideoConverterFactory {
    constructor(private logger: Logger) {
    }

    public create(videoUrl: string): VideoConverter {
        return new YoutubeVideoConverter(this.logger);
    }
}
