import { AudioFormat } from '../../common/audio-format';
import { ConversionResult } from './conversion-result';

export interface VideoConverter {
    convertAsync(
        videoUrl: string,
        outputDirectory: string,
        audioFormat: AudioFormat,
        bitrate: number,
        ffmpegPathOverride: string,
        youtubeDownloaderPathOverride: string,
        progressCallback: any
    ): Promise<ConversionResult>;
}
