import * as assert from 'assert';
import * as TypeMoq from "typemoq";
import { Times } from 'typemoq';
import { Logger } from '../../app/core/logger';
import { FFmpegInstaller } from '../../app/services/convert/ffmpeg-installer';
import { FFmpegDownloader } from '../../app/services/convert/ffmpeg-downloader';
import { FileSystem } from '../../app/core/file-system';

describe('FFmpegInstaller', () => {
    describe('ensureFFmpegIsAvailableAsync', () => {
        it('Should ...', () => {
            // Arrange
            var fileSystemMock = TypeMoq.Mock.ofType<FileSystem>();
            var loggerMock = TypeMoq.Mock.ofType<Logger>();
            var ffmpegDownloaderMock = TypeMoq.Mock.ofType<FFmpegDownloader>();

            // Act
            let ffmpegInstaller: FFmpegInstaller = new FFmpegInstaller(loggerMock.object, ffmpegDownloaderMock.object, fileSystemMock.object);

            // Assert
            //assert.ok(appearance.colorThemes.length > 0);
        });
    });

    describe('ffmpegPath', () => {
        it('Should ...', () => {
            // Arrange
            var fileSystemMock = TypeMoq.Mock.ofType<FileSystem>();
            var loggerMock = TypeMoq.Mock.ofType<Logger>();
            var ffmpegDownloaderMock = TypeMoq.Mock.ofType<FFmpegDownloader>();

            // Act
            let ffmpegInstaller: FFmpegInstaller = new FFmpegInstaller(loggerMock.object, ffmpegDownloaderMock.object, fileSystemMock.object);

            // Assert
            //assert.ok(appearance.colorThemes.length > 0);
        });
    });
});