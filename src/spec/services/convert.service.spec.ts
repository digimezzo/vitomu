import * as assert from 'assert';
import * as path from 'path';
import { Subscription } from 'rxjs';
import { Mock, Times } from 'typemoq';
import { FileSystem } from '../../app/core/file-system';
import { Logger } from '../../app/core/logger';
import { Settings } from '../../app/core/settings';
import { ConvertState } from '../../app/services/convert/convert-state';
import { ConvertService } from '../../app/services/convert/convert.service';
import { FFmpegChecker } from '../../app/services/convert/ffmpeg-checker';
import { FFmpegDownloader } from '../../app/services/convert/ffmpeg-downloader';

describe('ConvertService', () => {
    describe('constructor', () => {
        it('Should provide a list of audio formats', () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();

            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');

            // Act
            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object);

            // Assert
            assert.ok(convert.audioFormats.length > 0);
        });

        it('Should provide a list of audio bitrates', () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();

            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');

            // Act
            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object);

            // Assert
            assert.ok(convert.audioBitrates.length > 0);
        });

        it('Should have empty last converted file path', () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();

            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');

            // Act
            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object);

            // Assert
            assert.equal(convert.lastConvertedFilePath, '');
        });

        it('Should have empty last converted file name', () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();

            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');

            // Act
            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object);

            // Assert
            assert.equal(convert.lastConvertedFileName, '');
        });

        it('Should use audio bitrate from the settings', () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();

            settingsMock.setup(x => x.audioBitrate).returns(() => 320);
            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');

            // Act
            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object);
            // Assert
            assert.equal(convert.selectedAudioBitrate, 320);
        });

        it('Should use audio format from the settings', () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();

            settingsMock.setup(x => x.audioFormat).returns(() => 'mp3');
            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');

            // Act
            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object);

            // Assert
            assert.equal(convert.selectedAudioFormat.id, 'mp3');
        });
    });
    describe('isVideoUrlConvertible', () => {
        it('Should consider youtube URLs to be convertible', () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();

            settingsMock.setup(x => x.audioFormat).returns(() => 'mp3');
            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object);

            // Act
            const isVideoUrlConvertible: boolean = convert.isVideoUrlConvertible('https://www.youtube.com/watch?v=9WQxorFEnG8');

            // Assert
            assert.ok(isVideoUrlConvertible);
        });

        it('Should consider non-youtube URLs to be not convertible', () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();

            settingsMock.setup(x => x.audioFormat).returns(() => 'mp3');
            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object);

            // Act
            const isVideoUrlConvertible: boolean = convert.isVideoUrlConvertible('https://www.google.com');

            // Assert
            assert.ok(!isVideoUrlConvertible);
        });
    });

    describe('onConvertStateChanged', () => {
        it('Should notify when convert state changes', async () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();

            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object);

            const subscription: Subscription = new Subscription();

            let lastConvertState: ConvertState = ConvertState.Unknown;

            subscription.add(convert.convertStateChanged$.subscribe((convertState) => {
                lastConvertState = convertState;
            }));

            // Act
            await convert.onConvertStateChanged(ConvertState.Successful);
            subscription.unsubscribe();

            // Assert
            assert.equal(lastConvertState, ConvertState.Successful);
        });
    });

    describe('onConvertProgressChanged', () => {
        it('Should notify when convert progress changes', async () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();

            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object);

            const subscription: Subscription = new Subscription();

            let lastConvertProgress: number = 0;

            subscription.add(convert.convertProgressChanged$.subscribe((convertProgress) => {
                lastConvertProgress = convertProgress;
            }));

            // Act
            await convert.onConvertProgressChanged(50);
            subscription.unsubscribe();

            // Assert
            assert.equal(lastConvertProgress, 50);
        });
    });

    describe('checkPrerequisitesAsync', () => {
        it('Should ensure that the output directory exists', async () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();

            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');

            const outputPath: string = path.join(fileSystemMock.object.musicDirectory(), 'Vitomu');

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object);

            // Act
            await convert.checkPrerequisitesAsync();

            // Assert
            fileSystemMock.verify(x => x.ensureDirectoryAsync(outputPath), Times.exactly(1));
        });

        it('Should check if FFmpeg is available', async () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();

            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object);

            // Act
            await convert.checkPrerequisitesAsync();

            // Assert
            ffmpegCheckerMock.verify(x => x.isFFmpegAvailableAsync(), Times.exactly(2));
        });

        it('Should download FFmpeg if it is not available', async () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();

            fileSystemMock.setup(x => x.applicatioDataDirectory()).returns(() => '/directory/mock');
            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');
            ffmpegCheckerMock.setup(x => x.isFFmpegAvailableAsync()).returns(() => Promise.resolve(false));
            ffmpegCheckerMock.setup(x => x.downloadedFFmpegFolder).returns(() => '/home/directory/mock');

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object);

            // Act
            await convert.checkPrerequisitesAsync();

            // Assert
            ffmpegDownloaderMock.verify(x => x.downloadAsync('/home/directory/mock'), Times.exactly(1));
        });

        it('Should not download FFmpeg if it is available', async () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();

            fileSystemMock.setup(x => x.applicatioDataDirectory()).returns(() => '/directory/mock');
            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');
            ffmpegCheckerMock.setup(x => x.isFFmpegAvailableAsync()).returns(() => Promise.resolve(true));
            ffmpegCheckerMock.setup(x => x.downloadedFFmpegFolder).returns(() => '/home/directory/mock');

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object);

            // Act
            await convert.checkPrerequisitesAsync();

            // Assert
            ffmpegDownloaderMock.verify(x => x.downloadAsync('/home/directory/mock'), Times.never());
        });

        it('Should notify if FFmpeg is being downloaded', async () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();

            fileSystemMock.setup(x => x.applicatioDataDirectory()).returns(() => '/directory/mock');
            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');
            ffmpegCheckerMock.setup(x => x.isFFmpegAvailableAsync()).returns(() => Promise.resolve(false));
            ffmpegCheckerMock.setup(x => x.downloadedFFmpegFolder).returns(() => '/home/directory/mock');

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object);

            const subscription: Subscription = new Subscription();
            const convertStates: ConvertState[] = [];

            subscription.add(convert.convertStateChanged$.subscribe((convertState) => {
                convertStates.push(convertState);
            }));

            // Act
            await convert.checkPrerequisitesAsync();
            subscription.unsubscribe();

            // Assert
            assert.equal(convertStates[0], ConvertState.DownloadingFFmpeg);
        });

        it('Should return true if FFmpeg is available', async () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();

            fileSystemMock.setup(x => x.applicatioDataDirectory()).returns(() => '/directory/mock');
            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');
            ffmpegCheckerMock.setup(x => x.isFFmpegAvailableAsync()).returns(() => Promise.resolve(true));
            ffmpegCheckerMock.setup(x => x.downloadedFFmpegFolder).returns(() => '/home/directory/mock');

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object);

            const subscription: Subscription = new Subscription();
            const convertStates: ConvertState[] = [];

            subscription.add(convert.convertStateChanged$.subscribe((convertState) => {
                convertStates.push(convertState);
            }));

            // Act
            const isFFmpegAvailable: boolean = await convert.checkPrerequisitesAsync();
            subscription.unsubscribe();

            // Assert
            assert.ok(isFFmpegAvailable);
        });

        it('Should return false if FFmpeg is not available', async () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();

            fileSystemMock.setup(x => x.applicatioDataDirectory()).returns(() => '/directory/mock');
            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');
            ffmpegCheckerMock.setup(x => x.isFFmpegAvailableAsync()).returns(() => Promise.resolve(false));
            ffmpegCheckerMock.setup(x => x.downloadedFFmpegFolder).returns(() => '/home/directory/mock');

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object);

            const subscription: Subscription = new Subscription();
            const convertStates: ConvertState[] = [];

            subscription.add(convert.convertStateChanged$.subscribe((convertState) => {
                convertStates.push(convertState);
            }));

            // Act
            const isFFmpegAvailable: boolean = await convert.checkPrerequisitesAsync();
            subscription.unsubscribe();

            // Assert
            assert.ok(!isFFmpegAvailable);
        });
    });
});
