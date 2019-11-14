import * as assert from 'assert';
import * as TypeMoq from "typemoq";
import { Times } from 'typemoq';
import { Logger } from '../../app/core/logger';
import { FFmpegChecker } from '../../app/services/convert/ffmpeg-checker';
import { FFmpegDownloader } from '../../app/services/convert/ffmpeg-downloader';
import { FileSystem } from '../../app/core/file-system';
import * as path from 'path';

describe('FFmpegInstaller', () => {
    describe('ensureFFmpegIsAvailableAsync', () => {
        it('Should not download FFmpeg if FFmpeg is in path', async () => {
            // Arrange
            let fileSystemMock = TypeMoq.Mock.ofType<FileSystem>();
            let loggerMock = TypeMoq.Mock.ofType<Logger>();
            let ffmpegDownloaderMock = TypeMoq.Mock.ofType<FFmpegDownloader>();

            fileSystemMock.setup(x => x.applicatioDataDirectory()).returns(() => "/home/user/.config/Vitomu");
            fileSystemMock.setup(x => x.commanExistsAsync("ffmpeg")).returns(async() => true);

            let ffmpegChecker: FFmpegChecker = new FFmpegChecker(loggerMock.object, ffmpegDownloaderMock.object, fileSystemMock.object);

            // Act
            await ffmpegChecker.ensureFFmpegIsAvailableAsync();

            // Assert
            ffmpegDownloaderMock.verify(x => x.downloadAsync(TypeMoq.It.isAny()), Times.never());
        });
        
        it('Should download FFmpeg if FFmpeg is not in path and FFmpeg folder does not exist', async () => {
            // Arrange
            let fileSystemMock = TypeMoq.Mock.ofType<FileSystem>();
            let loggerMock = TypeMoq.Mock.ofType<Logger>();
            let ffmpegDownloaderMock = TypeMoq.Mock.ofType<FFmpegDownloader>();

            fileSystemMock.setup(x => x.applicatioDataDirectory()).returns(() => "/home/user/.config/Vitomu");
            fileSystemMock.setup(x => x.commanExistsAsync("ffmpeg")).returns(async() => false);

            let ffmpegFolder: string = path.join(fileSystemMock.object.applicatioDataDirectory(), "FFmpeg");

            fileSystemMock.setup(x => x.pathExists(ffmpegFolder)).returns(() => false);

            let ffmpegChecker: FFmpegChecker = new FFmpegChecker(loggerMock.object, ffmpegDownloaderMock.object, fileSystemMock.object);

            // Act
            await ffmpegChecker.ensureFFmpegIsAvailableAsync();

            // Assert
            ffmpegDownloaderMock.verify(x => x.downloadAsync(ffmpegFolder), Times.exactly(1));
        });

        it('Should download FFmpeg if FFmpeg is not in path and FFmpeg folder exists but it is empty', async () => {
            // Arrange
            let fileSystemMock = TypeMoq.Mock.ofType<FileSystem>();
            let loggerMock = TypeMoq.Mock.ofType<Logger>();
            let ffmpegDownloaderMock = TypeMoq.Mock.ofType<FFmpegDownloader>();

            fileSystemMock.setup(x => x.applicatioDataDirectory()).returns(() => "/home/user/.config/Vitomu");
            fileSystemMock.setup(x => x.commanExistsAsync("ffmpeg")).returns(async() => false);
            
            let ffmpegFolder: string = path.join(fileSystemMock.object.applicatioDataDirectory(), "FFmpeg");

            fileSystemMock.setup(x => x.pathExists(ffmpegFolder)).returns(() => true);
            fileSystemMock.setup(x => x.readDirectory(ffmpegFolder)).returns(() => []);

            let ffmpegChecker: FFmpegChecker = new FFmpegChecker(loggerMock.object, ffmpegDownloaderMock.object, fileSystemMock.object);

            // Act
            await ffmpegChecker.ensureFFmpegIsAvailableAsync();

            // Assert
            ffmpegDownloaderMock.verify(x => x.downloadAsync(ffmpegFolder), Times.exactly(1));
        });

        it('Should download FFmpeg if FFmpeg is not in path and FFmpeg folder exists but bas a file that does not contain "ffmpeg"', async () => {
            // Arrange
            let fileSystemMock = TypeMoq.Mock.ofType<FileSystem>();
            let loggerMock = TypeMoq.Mock.ofType<Logger>();
            let ffmpegDownloaderMock = TypeMoq.Mock.ofType<FFmpegDownloader>();

            fileSystemMock.setup(x => x.applicatioDataDirectory()).returns(() => "/home/user/.config/Vitomu");
            fileSystemMock.setup(x => x.commanExistsAsync("ffmpeg")).returns(async() => false);
         
            let ffmpegFolder: string = path.join(fileSystemMock.object.applicatioDataDirectory(), "FFmpeg");

            fileSystemMock.setup(x => x.pathExists(ffmpegFolder)).returns(() => true);
            fileSystemMock.setup(x => x.readDirectory(ffmpegFolder)).returns(() => ["wrongfile"]);

            let ffmpegChecker: FFmpegChecker = new FFmpegChecker(loggerMock.object, ffmpegDownloaderMock.object, fileSystemMock.object);

            // Act
            await ffmpegChecker.ensureFFmpegIsAvailableAsync();

            // Assert
            ffmpegDownloaderMock.verify(x => x.downloadAsync(ffmpegFolder), Times.exactly(1));
        });

        it('Should not download FFmpeg if FFmpeg is not in path and FFmpeg folder exists and has a file that is equal to "ffmpeg"', async () => {
            // Arrange
            let fileSystemMock = TypeMoq.Mock.ofType<FileSystem>();
            let loggerMock = TypeMoq.Mock.ofType<Logger>();
            let ffmpegDownloaderMock = TypeMoq.Mock.ofType<FFmpegDownloader>();

            fileSystemMock.setup(x => x.applicatioDataDirectory()).returns(() => "/home/user/.config/Vitomu");
            fileSystemMock.setup(x => x.commanExistsAsync("ffmpeg")).returns(async() => false);

            let ffmpegFolder: string = path.join(fileSystemMock.object.applicatioDataDirectory(), "FFmpeg");

            fileSystemMock.setup(x => x.pathExists(ffmpegFolder)).returns(() => true);
            fileSystemMock.setup(x => x.readDirectory(ffmpegFolder)).returns(() => ["ffmpeg"]);

            let ffmpegChecker: FFmpegChecker = new FFmpegChecker(loggerMock.object, ffmpegDownloaderMock.object, fileSystemMock.object);

            // Act
            await ffmpegChecker.ensureFFmpegIsAvailableAsync();

            // Assert
            ffmpegDownloaderMock.verify(x => x.downloadAsync(ffmpegFolder), Times.never());
        });

        it('Should not download FFmpeg if FFmpeg is not in path and FFmpeg folder exists and has a file that contains "ffmpeg"', async () => {
            // Arrange
            let fileSystemMock = TypeMoq.Mock.ofType<FileSystem>();
            let loggerMock = TypeMoq.Mock.ofType<Logger>();
            let ffmpegDownloaderMock = TypeMoq.Mock.ofType<FFmpegDownloader>();

            fileSystemMock.setup(x => x.applicatioDataDirectory()).returns(() => "/home/user/.config/Vitomu");
            fileSystemMock.setup(x => x.commanExistsAsync("ffmpeg")).returns(async() => false);
           
            let ffmpegFolder: string = path.join(fileSystemMock.object.applicatioDataDirectory(), "FFmpeg");

            fileSystemMock.setup(x => x.pathExists(ffmpegFolder)).returns(() => true);
            fileSystemMock.setup(x => x.readDirectory(ffmpegFolder)).returns(() => ["ffmpeg.exe"]);

            let ffmpegChecker: FFmpegChecker = new FFmpegChecker(loggerMock.object, ffmpegDownloaderMock.object, fileSystemMock.object);

            // Act
            await ffmpegChecker.ensureFFmpegIsAvailableAsync();

            // Assert
            ffmpegDownloaderMock.verify(x => x.downloadAsync(ffmpegFolder), Times.never());
        });

        it('Should indicate if FFmpeg was found in the path', async () => {
            // Arrange
            let fileSystemMock = TypeMoq.Mock.ofType<FileSystem>();
            let loggerMock = TypeMoq.Mock.ofType<Logger>();
            let ffmpegDownloaderMock = TypeMoq.Mock.ofType<FFmpegDownloader>();

            fileSystemMock.setup(x => x.commanExistsAsync("ffmpeg")).returns(async() => true);
            fileSystemMock.setup(x => x.applicatioDataDirectory()).returns(() => "/home/user/.config/Vitomu");

            let ffmpegChecker: FFmpegChecker = new FFmpegChecker(loggerMock.object, ffmpegDownloaderMock.object, fileSystemMock.object);

            // Act
            await ffmpegChecker.ensureFFmpegIsAvailableAsync();

            // Assert
            assert.ok(ffmpegChecker.isFfmpegInPath === true);
        });

        it('Should indicate if FFmpeg was not found in the path', async () => {
            // Arrange
            let fileSystemMock = TypeMoq.Mock.ofType<FileSystem>();
            let loggerMock = TypeMoq.Mock.ofType<Logger>();
            let ffmpegDownloaderMock = TypeMoq.Mock.ofType<FFmpegDownloader>();

            fileSystemMock.setup(x => x.commanExistsAsync("ffmpeg")).returns(async() => false);
            fileSystemMock.setup(x => x.applicatioDataDirectory()).returns(() => "/home/user/.config/Vitomu");

            let ffmpegChecker: FFmpegChecker = new FFmpegChecker(loggerMock.object, ffmpegDownloaderMock.object, fileSystemMock.object);

            // Act
            await ffmpegChecker.ensureFFmpegIsAvailableAsync();

            // Assert
            assert.ok(ffmpegChecker.isFfmpegInPath === false);
        });

        it('Should set empty ffmpegPath if FFmpeg is found in the path', async () => {
            // Arrange
            let fileSystemMock = TypeMoq.Mock.ofType<FileSystem>();
            let loggerMock = TypeMoq.Mock.ofType<Logger>();
            let ffmpegDownloaderMock = TypeMoq.Mock.ofType<FFmpegDownloader>();

            fileSystemMock.setup(x => x.commanExistsAsync("ffmpeg")).returns(async() => true);
            fileSystemMock.setup(x => x.applicatioDataDirectory()).returns(() => "/home/user/.config/Vitomu");

            let ffmpegChecker: FFmpegChecker = new FFmpegChecker(loggerMock.object, ffmpegDownloaderMock.object, fileSystemMock.object);

            // Act
            await ffmpegChecker.ensureFFmpegIsAvailableAsync();

            // Assert
            assert.ok(ffmpegChecker.ffmpegPath.length === 0);
        });

        it('Should set empty ffmpegPath if FFmpeg is not found in path and also not found locally', async () => {
            // Arrange
            let fileSystemMock = TypeMoq.Mock.ofType<FileSystem>();
            let loggerMock = TypeMoq.Mock.ofType<Logger>();
            let ffmpegDownloaderMock = TypeMoq.Mock.ofType<FFmpegDownloader>();

            fileSystemMock.setup(x => x.commanExistsAsync("ffmpeg")).returns(async() => false);
            fileSystemMock.setup(x => x.applicatioDataDirectory()).returns(() => "/home/user/.config/Vitomu");

            let ffmpegFolder: string = path.join(fileSystemMock.object.applicatioDataDirectory(), "FFmpeg");

            fileSystemMock.setup(x => x.pathExists(ffmpegFolder)).returns(() => true);
            fileSystemMock.setup(x => x.readDirectory(ffmpegFolder)).returns(() => []);

            let ffmpegChecker: FFmpegChecker = new FFmpegChecker(loggerMock.object, ffmpegDownloaderMock.object, fileSystemMock.object);

            // Act
            await ffmpegChecker.ensureFFmpegIsAvailableAsync();

            // Assert
            assert.ok(ffmpegChecker.ffmpegPath.length === 0);
        });

        it('Should set non-empty ffmpegPath if FFmpeg is not found in path but is found locally', async () => {
            // Arrange
            let fileSystemMock = TypeMoq.Mock.ofType<FileSystem>();
            let loggerMock = TypeMoq.Mock.ofType<Logger>();
            let ffmpegDownloaderMock = TypeMoq.Mock.ofType<FFmpegDownloader>();

            fileSystemMock.setup(x => x.commanExistsAsync("ffmpeg")).returns(async() => false);
            fileSystemMock.setup(x => x.applicatioDataDirectory()).returns(() => "/home/user/.config/Vitomu");

            let ffmpegFolder: string = path.join(fileSystemMock.object.applicatioDataDirectory(), "FFmpeg");

            fileSystemMock.setup(x => x.pathExists(ffmpegFolder)).returns(() => true);
            fileSystemMock.setup(x => x.readDirectory(ffmpegFolder)).returns(() => ["ffmpeg"]);

            let ffmpegChecker: FFmpegChecker = new FFmpegChecker(loggerMock.object, ffmpegDownloaderMock.object, fileSystemMock.object);

            // Act
            await ffmpegChecker.ensureFFmpegIsAvailableAsync();

            // Assert
            assert.ok(ffmpegChecker.ffmpegPath.length > 0);
        });
    });
});