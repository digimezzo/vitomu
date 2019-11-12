import * as assert from 'assert';
import * as TypeMoq from "typemoq";
import { Times } from 'typemoq';
import { Logger } from '../../app/core/logger';
import { FFmpegInstaller } from '../../app/services/convert/ffmpeg-installer';
import { FFmpegDownloader } from '../../app/services/convert/ffmpeg-downloader';
import { FileSystem } from '../../app/core/file-system';
import * as path from 'path';

describe('FFmpegInstaller', () => {
    describe('ensureFFmpegIsAvailableAsync', () => {
        it('Should download FFmpeg if FFmpeg folder does not exist', () => {
            // Arrange
            var fileSystemMock = TypeMoq.Mock.ofType<FileSystem>();
            var loggerMock = TypeMoq.Mock.ofType<Logger>();
            var ffmpegDownloaderMock = TypeMoq.Mock.ofType<FFmpegDownloader>();

            fileSystemMock.setup(x => x.applicatioDataFolder()).returns(() => "/home/user/.config/Vitomu");

            let ffmpegFolder: string = path.join(fileSystemMock.object.applicatioDataFolder(), "FFmpeg");
            fileSystemMock.setup(x => x.existsSync(ffmpegFolder)).returns(() => false);

            let ffmpegInstaller: FFmpegInstaller = new FFmpegInstaller(loggerMock.object, ffmpegDownloaderMock.object, fileSystemMock.object);

            // Act
            ffmpegInstaller.ensureFFmpegIsAvailableAsync();

            // Assert
            ffmpegDownloaderMock.verify(x => x.downloadAsync(ffmpegFolder), Times.exactly(1));
        });

        it('Should download FFmpeg if FFmpeg folder exists but the folder is empty', () => {
            // Arrange
            var fileSystemMock = TypeMoq.Mock.ofType<FileSystem>();
            var loggerMock = TypeMoq.Mock.ofType<Logger>();
            var ffmpegDownloaderMock = TypeMoq.Mock.ofType<FFmpegDownloader>();

            fileSystemMock.setup(x => x.applicatioDataFolder()).returns(() => "/home/user/.config/Vitomu");

            let ffmpegFolder: string = path.join(fileSystemMock.object.applicatioDataFolder(), "FFmpeg");
            fileSystemMock.setup(x => x.existsSync(ffmpegFolder)).returns(() => true);
            fileSystemMock.setup(x => x.readdirSync(ffmpegFolder)).returns(() => []);

            let ffmpegInstaller: FFmpegInstaller = new FFmpegInstaller(loggerMock.object, ffmpegDownloaderMock.object, fileSystemMock.object);

            // Act
            ffmpegInstaller.ensureFFmpegIsAvailableAsync();

            // Assert
            ffmpegDownloaderMock.verify(x => x.downloadAsync(ffmpegFolder), Times.exactly(1));
        });

        it('Should download FFmpeg if FFmpeg folder exists and the folder contains a file that is not ffmpeg', () => {
            // Arrange
            var fileSystemMock = TypeMoq.Mock.ofType<FileSystem>();
            var loggerMock = TypeMoq.Mock.ofType<Logger>();
            var ffmpegDownloaderMock = TypeMoq.Mock.ofType<FFmpegDownloader>();

            fileSystemMock.setup(x => x.applicatioDataFolder()).returns(() => "/home/user/.config/Vitomu");

            let ffmpegFolder: string = path.join(fileSystemMock.object.applicatioDataFolder(), "FFmpeg");
            fileSystemMock.setup(x => x.existsSync(ffmpegFolder)).returns(() => true);
            fileSystemMock.setup(x => x.readdirSync(ffmpegFolder)).returns(() => ["/home/user/.config/Vitomu/FFmpeg/notFFmpeg"]);

            let ffmpegInstaller: FFmpegInstaller = new FFmpegInstaller(loggerMock.object, ffmpegDownloaderMock.object, fileSystemMock.object);

            // Act
            ffmpegInstaller.ensureFFmpegIsAvailableAsync();

            // Assert
            ffmpegDownloaderMock.verify(x => x.downloadAsync(ffmpegFolder), Times.exactly(1));
        });
    });
});