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
        it('Should download FFmpeg if FFmpeg folder does not exist', async () => {
            // Arrange
            var fileSystemMock = TypeMoq.Mock.ofType<FileSystem>();
            var loggerMock = TypeMoq.Mock.ofType<Logger>();
            var ffmpegDownloaderMock = TypeMoq.Mock.ofType<FFmpegDownloader>();

            fileSystemMock.setup(x => x.applicatioDataFolder()).returns(() => "/home/user/.config/Vitomu");

            let ffmpegFolder: string = path.join(fileSystemMock.object.applicatioDataFolder(), "FFmpeg");
            fileSystemMock.setup(x => x.existsSync(ffmpegFolder)).returns(() => false);

            let ffmpegInstaller: FFmpegInstaller = new FFmpegInstaller(loggerMock.object, ffmpegDownloaderMock.object, fileSystemMock.object);

            // Act
            await ffmpegInstaller.ensureFFmpegIsAvailableAsync();

            // Assert
            ffmpegDownloaderMock.verify(x => x.downloadAsync(ffmpegFolder), Times.exactly(1));
        });

        it('Should download FFmpeg if FFmpeg folder exists but the folder is empty', async () => {
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
            await ffmpegInstaller.ensureFFmpegIsAvailableAsync();

            // Assert
            ffmpegDownloaderMock.verify(x => x.downloadAsync(ffmpegFolder), Times.exactly(1));
        });

        it('Should download FFmpeg if FFmpeg folder exists and the folder contains a file that does not contain "ffmpeg"', async () => {
            // Arrange
            var fileSystemMock = TypeMoq.Mock.ofType<FileSystem>();
            var loggerMock = TypeMoq.Mock.ofType<Logger>();
            var ffmpegDownloaderMock = TypeMoq.Mock.ofType<FFmpegDownloader>();

            fileSystemMock.setup(x => x.applicatioDataFolder()).returns(() => "/home/user/.config/Vitomu");

            let ffmpegFolder: string = path.join(fileSystemMock.object.applicatioDataFolder(), "FFmpeg");
            fileSystemMock.setup(x => x.existsSync(ffmpegFolder)).returns(() => true);
            fileSystemMock.setup(x => x.readdirSync(ffmpegFolder)).returns(() => ["wrongfile"]);

            let ffmpegInstaller: FFmpegInstaller = new FFmpegInstaller(loggerMock.object, ffmpegDownloaderMock.object, fileSystemMock.object);

            // Act
            await ffmpegInstaller.ensureFFmpegIsAvailableAsync();

            // Assert
            ffmpegDownloaderMock.verify(x => x.downloadAsync(ffmpegFolder), Times.exactly(1));
        });

        it('Should not download FFmpeg if FFmpeg folder exists and the folder contains a file that is "ffmpeg"', async () => {
            // Arrange
            var fileSystemMock = TypeMoq.Mock.ofType<FileSystem>();
            var loggerMock = TypeMoq.Mock.ofType<Logger>();
            var ffmpegDownloaderMock = TypeMoq.Mock.ofType<FFmpegDownloader>();

            fileSystemMock.setup(x => x.applicatioDataFolder()).returns(() => "/home/user/.config/Vitomu");

            let ffmpegFolder: string = path.join(fileSystemMock.object.applicatioDataFolder(), "FFmpeg");
            fileSystemMock.setup(x => x.existsSync(ffmpegFolder)).returns(() => true);
            fileSystemMock.setup(x => x.readdirSync(ffmpegFolder)).returns(() => ["ffmpeg"]);

            let ffmpegInstaller: FFmpegInstaller = new FFmpegInstaller(loggerMock.object, ffmpegDownloaderMock.object, fileSystemMock.object);

            // Act
            await ffmpegInstaller.ensureFFmpegIsAvailableAsync();

            // Assert
            ffmpegDownloaderMock.verify(x => x.downloadAsync(ffmpegFolder), Times.never());
        });

        it('Should not download FFmpeg if FFmpeg folder exists and the folder contains a file that contains "ffmpeg"', async () => {
            // Arrange
            var fileSystemMock = TypeMoq.Mock.ofType<FileSystem>();
            var loggerMock = TypeMoq.Mock.ofType<Logger>();
            var ffmpegDownloaderMock = TypeMoq.Mock.ofType<FFmpegDownloader>();

            fileSystemMock.setup(x => x.applicatioDataFolder()).returns(() => "/home/user/.config/Vitomu");

            let ffmpegFolder: string = path.join(fileSystemMock.object.applicatioDataFolder(), "FFmpeg");
            fileSystemMock.setup(x => x.existsSync(ffmpegFolder)).returns(() => true);
            fileSystemMock.setup(x => x.readdirSync(ffmpegFolder)).returns(() => ["ffmpeg.exe"]);

            let ffmpegInstaller: FFmpegInstaller = new FFmpegInstaller(loggerMock.object, ffmpegDownloaderMock.object, fileSystemMock.object);

            // Act
            await ffmpegInstaller.ensureFFmpegIsAvailableAsync();

            // Assert
            ffmpegDownloaderMock.verify(x => x.downloadAsync(ffmpegFolder), Times.never());
        });

        it('Should not set ffmpegPath if ffmpeg is not found', async () => {
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
            await ffmpegInstaller.ensureFFmpegIsAvailableAsync();

            // Assert
            assert.ok(ffmpegInstaller.ffmpegPath.length === 0);
        });

        it('Should set ffmpegPath if ffmpeg is found', async () => {
            // Arrange
            var fileSystemMock = TypeMoq.Mock.ofType<FileSystem>();
            var loggerMock = TypeMoq.Mock.ofType<Logger>();
            var ffmpegDownloaderMock = TypeMoq.Mock.ofType<FFmpegDownloader>();

            fileSystemMock.setup(x => x.applicatioDataFolder()).returns(() => "/home/user/.config/Vitomu");

            let ffmpegFolder: string = path.join(fileSystemMock.object.applicatioDataFolder(), "FFmpeg");
            fileSystemMock.setup(x => x.existsSync(ffmpegFolder)).returns(() => true);
            fileSystemMock.setup(x => x.readdirSync(ffmpegFolder)).returns(() => ["ffmpeg"]);

            let ffmpegInstaller: FFmpegInstaller = new FFmpegInstaller(loggerMock.object, ffmpegDownloaderMock.object, fileSystemMock.object);

            // Act
            await ffmpegInstaller.ensureFFmpegIsAvailableAsync();

            // Assert
            assert.ok(ffmpegInstaller.ffmpegPath.length > 0);
        });
    });
});