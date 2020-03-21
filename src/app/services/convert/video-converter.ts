import { Observable } from 'rxjs';
import { AudioFormat } from '../../core/audio-format';
import { ConversionResult } from './conversion-result';

export interface VideoConverter {
    convertAsync(
        videoUrl: string,
        outputDirectory: string,
        audioFormat: AudioFormat,
        bitrate: number,
        ffmpegPathOverride: string,
        progressCallback: any): Promise<ConversionResult>;
}
