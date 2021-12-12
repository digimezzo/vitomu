import { Observable } from 'rxjs';
import { AudioFormat } from '../../common/audio-format';
import { ConversionResult } from './conversion-result';

export abstract class BaseConvertService {
    public abstract audioFormats: AudioFormat[];
    public abstract audioBitrates: number[];
    public abstract conversionProgressChanged$: Observable<number>;
    public abstract lastConvertedFilePath: string;
    public abstract lastConvertedFileName: string;
    public abstract selectedAudioFormat: AudioFormat;
    public abstract selectedAudioBitrate: number;
    public abstract onConversionProgressChanged(progressPercent: number): void;
    public abstract isVideoUrlConvertible(videoUrl: string): boolean;
    public abstract isFfmpegAvailableAsync(): Promise<boolean>;
    public abstract isYoutubeDownloaderAvailableAsync(): Promise<boolean>;
    public abstract downloadFfmpegAsync(): Promise<void>;
    public abstract downloadYoutubeDownloaderAsync(): Promise<void>;
    public abstract updateYoutubeDownloaderAsync(): Promise<void>;
    public abstract convertAsync(videoUrl: string): Promise<ConversionResult>;
}
