import * as assert from 'assert';
import * as path from 'path';
import { It, Mock, Times } from 'typemoq';
import { FileSystem } from '../../app/core/file-system';
import { Logger } from '../../app/core/logger';
import { FFmpegChecker } from '../../app/services/convert/ffmpeg-checker';
import { FFmpegDownloader } from '../../app/services/convert/ffmpeg-downloader';

describe('FFmpegInstaller', () => {
    describe('ensureFFmpegIsAvailableAsync', () => {
        it('Should not download FFmpeg if FFmpeg is in path', async () => {
            // Arrange
            const fileSystemMock = Mock.ofType<FileSystem>();
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();

            fileSystemMock.setup(x => x.applicatioDataDirectory()).returns(() => '/home/user/.config/Vitomu');
            fileSystemMock.setup(x => x.commanExistsAsync('ffmpeg')).returns(async () => true);

            const ffmpegChecker: FFmpegChecker = new FFmpegChecker(
                loggerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object);

            // Act
            await ffmpegChecker.ensureFFmpegIsAvailableAsync();

            // Assert
            ffmpegDownloaderMock.verify(x => x.downloadAsync(It.isAny()), Times.never());
        });

        it('Should download FFmpeg if FFmpeg is not in path and FFmpeg folder does not exist', async () => {
            // Arrange
            const fileSystemMock = Mock.ofType<FileSystem>();
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();

            fileSystemMock.setup(x => x.applicatioDataDirectory()).returns(() => '/home/user/.config/Vitomu');
            fileSystemMock.setup(x => x.commanExistsAsync('ffmpeg')).returns(async () => false);

            const ffmpegFolder: string = path.join(fileSystemMock.object.applicatioDataDirectory(), 'FFmpeg');

            fileSystemMock.setup(x => x.pathExists(ffmpegFolder)).returns(() => false);

            const ffmpegChecker: FFmpegChecker = new FFmpegChecker(
                loggerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object);

            // Act
            await ffmpegChecker.ensureFFmpegIsAvailableAsync();

            // Assert
            ffmpegDownloaderMock.verify(x => x.downloadAsync(ffmpegFolder), Times.exactly(1));
        });

        it('Should download FFmpeg if FFmpeg is not in path and FFmpeg folder exists but it is empty', async () => {
            // Arrange
            const fileSystemMock = Mock.ofType<FileSystem>();
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();

            fileSystemMock.setup(x => x.applicatioDataDirectory()).returns(() => '/home/user/.config/Vitomu');
            fileSystemMock.setup(x => x.commanExistsAsync('ffmpeg')).returns(async () => false);

            const ffmpegFolder: string = path.join(fileSystemMock.object.applicatioDataDirectory(), 'FFmpeg');

            fileSystemMock.setup(x => x.pathExists(ffmpegFolder)).returns(() => true);
            fileSystemMock.setup(x => x.readDirectory(ffmpegFolder)).returns(() => []);

            const ffmpegChecker: FFmpegChecker = new FFmpegChecker(
                loggerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object);

            // Act
            await ffmpegChecker.ensureFFmpegIsAvailableAsync();

            // Assert
            ffmpegDownloaderMock.verify(x => x.downloadAsync(ffmpegFolder), Times.exactly(1));
        });

        it('Should download FFmpeg if FFmpeg is not in path but FFmpeg folder has a file that does not contain "ffmpeg"', async () => {
            // Arrange
            const fileSystemMock = Mock.ofType<FileSystem>();
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();

            fileSystemMock.setup(x => x.applicatioDataDirectory()).returns(() => '/home/user/.config/Vitomu');
            fileSystemMock.setup(x => x.commanExistsAsync('ffmpeg')).returns(async () => false);

            const ffmpegFolder: string = path.join(fileSystemMock.object.applicatioDataDirectory(), 'FFmpeg');

            fileSystemMock.setup(x => x.pathExists(ffmpegFolder)).returns(() => true);
            fileSystemMock.setup(x => x.readDirectory(ffmpegFolder)).returns(() => ['wrongfile']);

            const ffmpegChecker: FFmpegChecker = new FFmpegChecker(
                loggerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object);

            // Act
            await ffmpegChecker.ensureFFmpegIsAvailableAsync();

            // Assert
            ffmpegDownloaderMock.verify(x => x.downloadAsync(ffmpegFolder), Times.exactly(1));
        });

        it('Should not download FFmpeg if FFmpeg is not in path but FFmpeg folder has a file that is equal to "ffmpeg"', async () => {
            // Arrange
            const fileSystemMock = Mock.ofType<FileSystem>();
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();

            fileSystemMock.setup(x => x.applicatioDataDirectory()).returns(() => '/home/user/.config/Vitomu');
            fileSystemMock.setup(x => x.commanExistsAsync('ffmpeg')).returns(async () => false);

            const ffmpegFolder: string = path.join(fileSystemMock.object.applicatioDataDirectory(), 'FFmpeg');

            fileSystemMock.setup(x => x.pathExists(ffmpegFolder)).returns(() => true);
            fileSystemMock.setup(x => x.readDirectory(ffmpegFolder)).returns(() => ['ffmpeg']);

            const ffmpegChecker: FFmpegChecker = new FFmpegChecker(
                loggerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object);

            // Act
            await ffmpegChecker.ensureFFmpegIsAvailableAsync();

            // Assert
            ffmpegDownloaderMock.verify(x => x.downloadAsync(ffmpegFolder), Times.never());
        });

        it('Should not download FFmpeg if FFmpeg is not in path but FFmpeg has a file that contains "ffmpeg"', async () => {
            // Arrange
            const fileSystemMock = Mock.ofType<FileSystem>();
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();

            fileSystemMock.setup(x => x.applicatioDataDirectory()).returns(() => '/home/user/.config/Vitomu');
            fileSystemMock.setup(x => x.commanExistsAsync('ffmpeg')).returns(async () => false);

            const ffmpegFolder: string = path.join(fileSystemMock.object.applicatioDataDirectory(), 'FFmpeg');

            fileSystemMock.setup(x => x.pathExists(ffmpegFolder)).returns(() => true);
            fileSystemMock.setup(x => x.readDirectory(ffmpegFolder)).returns(() => ['ffmpeg.exe']);

            const ffmpegChecker: FFmpegChecker = new FFmpegChecker(
                loggerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object);

            // Act
            await ffmpegChecker.ensureFFmpegIsAvailableAsync();

            // Assert
            ffmpegDownloaderMock.verify(x => x.downloadAsync(ffmpegFolder), Times.never());
        });

        it('Should indicate if FFmpeg was found in the path', async () => {
            // Arrange
            const fileSystemMock = Mock.ofType<FileSystem>();
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();

            fileSystemMock.setup(x => x.commanExistsAsync('ffmpeg')).returns(async () => true);
            fileSystemMock.setup(x => x.applicatioDataDirectory()).returns(() => '/home/user/.config/Vitomu');

            const ffmpegChecker: FFmpegChecker = new FFmpegChecker(
                loggerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object);

            // Act
            await ffmpegChecker.ensureFFmpegIsAvailableAsync();

            // Assert
            assert.ok(ffmpegChecker.isFfmpegInPath === true);
        });

        it('Should indicate if FFmpeg was not found in the path', async () => {
            // Arrange
            const fileSystemMock = Mock.ofType<FileSystem>();
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();

            fileSystemMock.setup(x => x.commanExistsAsync('ffmpeg')).returns(async () => false);
            fileSystemMock.setup(x => x.applicatioDataDirectory()).returns(() => '/home/user/.config/Vitomu');

            const ffmpegChecker: FFmpegChecker = new FFmpegChecker(
                loggerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object);

            // Act
            await ffmpegChecker.ensureFFmpegIsAvailableAsync();

            // Assert
            assert.ok(ffmpegChecker.isFfmpegInPath === false);
        });

        it('Should set empty ffmpegPath if FFmpeg is found in the path', async () => {
            // Arrange
            const fileSystemMock = Mock.ofType<FileSystem>();
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();

            fileSystemMock.setup(x => x.commanExistsAsync('ffmpeg')).returns(async () => true);
            fileSystemMock.setup(x => x.applicatioDataDirectory()).returns(() => '/home/user/.config/Vitomu');

            const ffmpegChecker: FFmpegChecker = new FFmpegChecker(
                loggerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object);

            // Act
            await ffmpegChecker.ensureFFmpegIsAvailableAsync();

            // Assert
            assert.ok(ffmpegChecker.ffmpegPath.length === 0);
        });

        it('Should set empty ffmpegPath if FFmpeg is not found in path and also not found locally', async () => {
            // Arrange
            const fileSystemMock = Mock.ofType<FileSystem>();
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();

            fileSystemMock.setup(x => x.commanExistsAsync('ffmpeg')).returns(async () => false);
            fileSystemMock.setup(x => x.applicatioDataDirectory()).returns(() => '/home/user/.config/Vitomu');

            const ffmpegFolder: string = path.join(fileSystemMock.object.applicatioDataDirectory(), 'FFmpeg');

            fileSystemMock.setup(x => x.pathExists(ffmpegFolder)).returns(() => true);
            fileSystemMock.setup(x => x.readDirectory(ffmpegFolder)).returns(() => []);

            const ffmpegChecker: FFmpegChecker = new FFmpegChecker(
                loggerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object);

            // Act
            await ffmpegChecker.ensureFFmpegIsAvailableAsync();

            // Assert
            assert.ok(ffmpegChecker.ffmpegPath.length === 0);
        });

        it('Should set non-empty ffmpegPath if FFmpeg is not found in path but is found locally', async () => {
            // Arrange
            const fileSystemMock = Mock.ofType<FileSystem>();
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();

            fileSystemMock.setup(x => x.commanExistsAsync('ffmpeg')).returns(async () => false);
            fileSystemMock.setup(x => x.applicatioDataDirectory()).returns(() => '/home/user/.config/Vitomu');

            const ffmpegFolder: string = path.join(fileSystemMock.object.applicatioDataDirectory(), 'FFmpeg');

            fileSystemMock.setup(x => x.pathExists(ffmpegFolder)).returns(() => true);
            fileSystemMock.setup(x => x.readDirectory(ffmpegFolder)).returns(() => ['ffmpeg']);

            const ffmpegChecker: FFmpegChecker = new FFmpegChecker(
                loggerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object);

            // Act
            await ffmpegChecker.ensureFFmpegIsAvailableAsync();

            // Assert
            assert.ok(ffmpegChecker.ffmpegPath.length > 0);
        });

        describe('isFFmpegInPathAsync', () => {
            it('Should detect when FFmpeg is in the Operating System path', async () => {
                // Arrange
                const fileSystemMock = Mock.ofType<FileSystem>();
                const loggerMock = Mock.ofType<Logger>();
                const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();

                fileSystemMock.setup(x => x.commanExistsAsync('ffmpeg')).returns(async () => true);
                fileSystemMock.setup(x => x.applicatioDataDirectory()).returns(() => '/home/user/.config/Vitomu');

                const ffmpegChecker: FFmpegChecker = new FFmpegChecker(
                    loggerMock.object,
                    ffmpegDownloaderMock.object,
                    fileSystemMock.object);

                // Act
                const isFFmpegInPath: boolean = await ffmpegChecker.isFFmpegInPathAsync();

                // Assert
                assert.ok(isFFmpegInPath);
            });

            it('Should detect when FFmpeg is not in the Operating System path', async () => {
                // Arrange
                const fileSystemMock = Mock.ofType<FileSystem>();
                const loggerMock = Mock.ofType<Logger>();
                const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();

                fileSystemMock.setup(x => x.commanExistsAsync('ffmpeg')).returns(async () => false);
                fileSystemMock.setup(x => x.applicatioDataDirectory()).returns(() => '/home/user/.config/Vitomu');

                const ffmpegChecker: FFmpegChecker = new FFmpegChecker(
                    loggerMock.object,
                    ffmpegDownloaderMock.object,
                    fileSystemMock.object);

                // Act
                const isFFmpegInPath: boolean = await ffmpegChecker.isFFmpegInPathAsync();

                // Assert
                assert.ok(!isFFmpegInPath);
            });
        });
    });
});
