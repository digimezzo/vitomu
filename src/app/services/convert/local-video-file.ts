import * as path from 'path';
import { FileSystem } from '../../common/io/file-system';
import { Strings } from '../../common/strings';

export class LocalVideoFile {
    public static readonly extensions: string[] = [
        '.3g2',
        '.3gp',
        '.asf',
        '.avi',
        '.flv',
        '.m2ts',
        '.m4v',
        '.mkv',
        '.mov',
        '.mp4',
        '.mpeg',
        '.mpg',
        '.mts',
        '.ogv',
        '.ts',
        '.vob',
        '.webm',
        '.wmv',
    ];

    public static isSupported(videoPath: string, fileSystem: FileSystem): boolean {
        if (Strings.isNullOrWhiteSpace(videoPath) || /[\r\n]/.test(videoPath)) {
            return false;
        }

        const trimmedVideoPath: string = videoPath.trim();
        return fileSystem.isFile(trimmedVideoPath) && this.extensions.includes(path.extname(trimmedVideoPath).toLowerCase());
    }
}