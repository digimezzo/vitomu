import * as assert from 'assert';
import * as path from 'path';
import { Subscription } from 'rxjs';
import { Mock, Times } from 'typemoq';
import { FileSystem } from '../../app/core/file-system';
import { Logger } from '../../app/core/logger';
import { Settings } from '../../app/core/settings';
import { ConvertService } from '../../app/services/convert/convert.service';
import { FFmpegChecker } from '../../app/services/convert/ffmpeg-checker';
import { FFmpegDownloader } from '../../app/services/convert/ffmpeg-downloader';
import { VideoConverterFactory } from '../../app/services/convert/video-converter.factory';
import { ReturnStatement } from '@angular/compiler';
import { YoutubeVideoConverter } from '../../app/services/convert/youtube-video-converter';

describe('ConvertService', () => {
    describe('constructor', () => {
        it('Should provide a list of audio formats', () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();
            const videoConverterFactoryMock = Mock.ofType<VideoConverterFactory>();

            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');

            // Act
            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object);

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
            const videoConverterFactoryMock = Mock.ofType<VideoConverterFactory>();

            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');

            // Act
            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object);

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
            const videoConverterFactoryMock = Mock.ofType<VideoConverterFactory>();

            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');

            // Act
            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object);

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
            const videoConverterFactoryMock = Mock.ofType<VideoConverterFactory>();

            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');

            // Act
            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object);

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
            const videoConverterFactoryMock = Mock.ofType<VideoConverterFactory>();

            settingsMock.setup(x => x.audioBitrate).returns(() => 320);
            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');

            // Act
            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object);

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
            const videoConverterFactoryMock = Mock.ofType<VideoConverterFactory>();

            settingsMock.setup(x => x.audioFormat).returns(() => 'mp3');
            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');

            // Act
            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object);

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
            const videoConverterFactoryMock = Mock.ofType<VideoConverterFactory>();

            settingsMock.setup(x => x.audioFormat).returns(() => 'mp3');
            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object);

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
            const videoConverterFactoryMock = Mock.ofType<VideoConverterFactory>();

            settingsMock.setup(x => x.audioFormat).returns(() => 'mp3');
            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object);

            // Act
            const isVideoUrlConvertible: boolean = convert.isVideoUrlConvertible('https://www.google.com');

            // Assert
            assert.ok(!isVideoUrlConvertible);
        });
    });

    describe('onConversionSuccessful', () => {
        it('Should notify when conversion is successful', async () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();
            const videoConverterFactoryMock = Mock.ofType<VideoConverterFactory>();

            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object);

            const subscription: Subscription = new Subscription();

            let eventReceived: boolean = false;

            subscription.add(convert.conversionSuccessful$.subscribe(() => {
                eventReceived = true;
            }));

            // Act
            await convert.onConversionSuccessful();
            subscription.unsubscribe();

            // Assert
            assert.ok(eventReceived);
        });
    });

    describe('onConversionFailed', () => {
        it('Should notify when conversion failed', async () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();
            const videoConverterFactoryMock = Mock.ofType<VideoConverterFactory>();

            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object);

            const subscription: Subscription = new Subscription();

            let eventReceived: boolean = false;

            subscription.add(convert.conversionFailed$.subscribe(() => {
                eventReceived = true;
            }));

            // Act
            await convert.onConversionFailed();
            subscription.unsubscribe();

            // Assert
            assert.ok(eventReceived);
        });
    });

    describe('onConversionProgressChanged', () => {
        it('Should notify when convert progress changes', async () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();
            const videoConverterFactoryMock = Mock.ofType<VideoConverterFactory>();

            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object);

            const subscription: Subscription = new Subscription();

            let lastProgressPercent: number = 0;

            subscription.add(convert.conversionProgressChanged$.subscribe((progressPercent) => {
                lastProgressPercent = progressPercent;
            }));

            // Act
            await convert.onConversionProgressChanged(50);
            subscription.unsubscribe();

            // Assert
            assert.equal(lastProgressPercent, 50);
        });
    });

    describe('arePrerequisitesOKAsync', () => {
        it('Should return true if FFmpeg is available', async () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();
            const videoConverterFactoryMock = Mock.ofType<VideoConverterFactory>();

            fileSystemMock.setup(x => x.applicatioDataDirectory()).returns(() => '/directory/mock');
            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');
            ffmpegCheckerMock.setup(x => x.isFFmpegAvailableAsync()).returns(() => Promise.resolve(true));
            ffmpegCheckerMock.setup(x => x.downloadedFFmpegFolder).returns(() => '/home/directory/mock');

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object);

            // Act
            const prerequisitesAreOK: boolean = await convert.arePrerequisitesOKAsync();

            // Assert
            assert.ok(prerequisitesAreOK);
        });

        it('Should return false if FFmpeg is not available', async () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();
            const videoConverterFactoryMock = Mock.ofType<VideoConverterFactory>();

            fileSystemMock.setup(x => x.applicatioDataDirectory()).returns(() => '/directory/mock');
            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');
            ffmpegCheckerMock.setup(x => x.isFFmpegAvailableAsync()).returns(() => Promise.resolve(false));
            ffmpegCheckerMock.setup(x => x.downloadedFFmpegFolder).returns(() => '/home/directory/mock');

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object);

            // Act
            const prerequisitesAreOK: boolean = await convert.arePrerequisitesOKAsync();

            // Assert
            assert.ok(!prerequisitesAreOK);
        });
    });

    describe('fixPrerequisites', () => {
        it('Should check if FFmpeg is available', async () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();
            const videoConverterFactoryMock = Mock.ofType<VideoConverterFactory>();

            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object);

            // Act
            await convert.fixPrerequisites();

            // Assert
            ffmpegCheckerMock.verify(x => x.isFFmpegAvailableAsync(), Times.exactly(1));
        });

        it('Should download FFmpeg if it is not available', async () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();
            const videoConverterFactoryMock = Mock.ofType<VideoConverterFactory>();

            fileSystemMock.setup(x => x.applicatioDataDirectory()).returns(() => '/directory/mock');
            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');
            ffmpegCheckerMock.setup(x => x.isFFmpegAvailableAsync()).returns(() => Promise.resolve(false));
            ffmpegCheckerMock.setup(x => x.downloadedFFmpegFolder).returns(() => '/home/directory/mock');

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object);

            // Act
            await convert.fixPrerequisites();

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
            const videoConverterFactoryMock = Mock.ofType<VideoConverterFactory>();

            fileSystemMock.setup(x => x.applicatioDataDirectory()).returns(() => '/directory/mock');
            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');
            ffmpegCheckerMock.setup(x => x.isFFmpegAvailableAsync()).returns(() => Promise.resolve(true));
            ffmpegCheckerMock.setup(x => x.downloadedFFmpegFolder).returns(() => '/home/directory/mock');

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object);

            // Act
            await convert.fixPrerequisites();

            // Assert
            ffmpegDownloaderMock.verify(x => x.downloadAsync('/home/directory/mock'), Times.never());
        });
    });

    describe('convertAsync', () => {
        it('Should ensure that the output directory exists', async () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();
            const videoConverterFactoryMock = Mock.ofType<VideoConverterFactory>();

            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');
            videoConverterFactoryMock.setup(x => x.create('dummyUrl')).returns(() => new YoutubeVideoConverter(loggerMock.object));

            const outputPath: string = path.join(fileSystemMock.object.musicDirectory(), 'Vitomu');

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object);

            // Act
            await convert.convertAsync('dummyUrl');

            // Assert
            fileSystemMock.verify(x => x.ensureDirectoryAsync(outputPath), Times.exactly(1));
        });

        it('Should not get path of local ffmpeg if ffmpeg is found in system path', async () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();
            const videoConverterFactoryMock = Mock.ofType<VideoConverterFactory>();

            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');
            videoConverterFactoryMock.setup(x => x.create('dummyUrl')).returns(() => new YoutubeVideoConverter(loggerMock.object));
            ffmpegCheckerMock.setup(x => x.isFFmpegInSystemPathAsync()).returns(() => Promise.resolve(true));

            const outputPath: string = path.join(fileSystemMock.object.musicDirectory(), 'Vitomu');

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object);

            // Act
            await convert.convertAsync('dummyUrl');

            // Assert
            ffmpegCheckerMock.verify(x => x.getPathOfDownloadedFFmpeg(), Times.never());
        });

        it('Should get path of local ffmpeg if ffmpeg is not found in system path', async () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();
            const videoConverterFactoryMock = Mock.ofType<VideoConverterFactory>();

            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');
            videoConverterFactoryMock.setup(x => x.create('dummyUrl')).returns(() => new YoutubeVideoConverter(loggerMock.object));
            ffmpegCheckerMock.setup(x => x.isFFmpegInSystemPathAsync()).returns(() => Promise.resolve(false));

            const outputPath: string = path.join(fileSystemMock.object.musicDirectory(), 'Vitomu');

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object);

            // Act
            await convert.convertAsync('dummyUrl');

            // Assert
            ffmpegCheckerMock.verify(x => x.getPathOfDownloadedFFmpeg(), Times.exactly(1));
        });
    });
});
