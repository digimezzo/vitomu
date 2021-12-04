import * as assert from 'assert';
import * as path from 'path';
import { Subscription } from 'rxjs';
import { It, Mock, Times } from 'typemoq';
import { AudioFormat } from '../../app/core/audio-format';
import { FileSystem } from '../../app/core/file-system';
import { Logger } from '../../app/core/logger';
import { Settings } from '../../app/core/settings';
import { ConversionResult } from '../../app/services/convert/conversion-result';
import { ConvertService } from '../../app/services/convert/convert.service';
import { FFmpegChecker } from '../../app/services/convert/ffmpeg-checker';
import { FFmpegDownloader } from '../../app/services/convert/ffmpeg-downloader';
import { VideoConverter } from '../../app/services/convert/video-converter';
import { VideoConverterFactory } from '../../app/services/convert/video-converter.factory';
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

            fileSystemMock.setup((x) => x.musicDirectory()).returns(() => '/home/user/Music');

            // Act
            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object
            );

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

            fileSystemMock.setup((x) => x.musicDirectory()).returns(() => '/home/user/Music');

            // Act
            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object
            );

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

            fileSystemMock.setup((x) => x.musicDirectory()).returns(() => '/home/user/Music');

            // Act
            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object
            );

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

            fileSystemMock.setup((x) => x.musicDirectory()).returns(() => '/home/user/Music');

            // Act
            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object
            );

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

            settingsMock.setup((x) => x.audioBitrate).returns(() => 320);
            fileSystemMock.setup((x) => x.musicDirectory()).returns(() => '/home/user/Music');

            // Act
            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object
            );

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

            settingsMock.setup((x) => x.audioFormat).returns(() => 'mp3');
            fileSystemMock.setup((x) => x.musicDirectory()).returns(() => '/home/user/Music');

            // Act
            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object
            );

            // Assert
            assert.equal(convert.selectedAudioFormat.id, 'mp3');
        });
    });
    describe('isVideoUrlConvertible', () => {
        it('Should consider long youtube URLs to be convertible', () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();
            const videoConverterFactoryMock = Mock.ofType<VideoConverterFactory>();

            settingsMock.setup((x) => x.audioFormat).returns(() => 'mp3');
            fileSystemMock.setup((x) => x.musicDirectory()).returns(() => '/home/user/Music');

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object
            );

            // Act
            const isVideoUrlConvertible: boolean = convert.isVideoUrlConvertible('https://www.youtube.com/watch?v=9WQxorFEnG8');

            // Assert
            assert.ok(isVideoUrlConvertible);
        });

        it('Should consider short youtube URLs to be convertible', () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();
            const videoConverterFactoryMock = Mock.ofType<VideoConverterFactory>();

            settingsMock.setup((x) => x.audioFormat).returns(() => 'mp3');
            fileSystemMock.setup((x) => x.musicDirectory()).returns(() => '/home/user/Music');

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object
            );

            // Act
            const isVideoUrlConvertible: boolean = convert.isVideoUrlConvertible('http://youtu.be/7DQPgw7gxtc');

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

            settingsMock.setup((x) => x.audioFormat).returns(() => 'mp3');
            fileSystemMock.setup((x) => x.musicDirectory()).returns(() => '/home/user/Music');

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object
            );

            // Act
            const isVideoUrlConvertible: boolean = convert.isVideoUrlConvertible('https://www.google.com');

            // Assert
            assert.ok(!isVideoUrlConvertible);
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

            fileSystemMock.setup((x) => x.musicDirectory()).returns(() => '/home/user/Music');

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object
            );

            const subscription: Subscription = new Subscription();

            let lastProgressPercent: number = 0;

            subscription.add(
                convert.conversionProgressChanged$.subscribe((progressPercent) => {
                    lastProgressPercent = progressPercent;
                })
            );

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

            fileSystemMock.setup((x) => x.applicationDataDirectory()).returns(() => '/directory/mock');
            fileSystemMock.setup((x) => x.musicDirectory()).returns(() => '/home/user/Music');
            ffmpegCheckerMock.setup((x) => x.isFFmpegAvailableAsync()).returns(() => Promise.resolve(true));
            ffmpegCheckerMock.setup((x) => x.downloadedFFmpegFolder).returns(() => '/home/directory/mock');

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object
            );

            // Act
            const prerequisitesAreOK: boolean = await convert.areDependenciesAvailableAsync();

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

            fileSystemMock.setup((x) => x.applicationDataDirectory()).returns(() => '/directory/mock');
            fileSystemMock.setup((x) => x.musicDirectory()).returns(() => '/home/user/Music');
            ffmpegCheckerMock.setup((x) => x.isFFmpegAvailableAsync()).returns(() => Promise.resolve(false));
            ffmpegCheckerMock.setup((x) => x.downloadedFFmpegFolder).returns(() => '/home/directory/mock');

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object
            );

            // Act
            const prerequisitesAreOK: boolean = await convert.areDependenciesAvailableAsync();

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

            fileSystemMock.setup((x) => x.musicDirectory()).returns(() => '/home/user/Music');

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object
            );

            // Act
            await convert.fixDependencies();

            // Assert
            ffmpegCheckerMock.verify((x) => x.isFFmpegAvailableAsync(), Times.exactly(1));
        });

        it('Should download FFmpeg if it is not available', async () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();
            const videoConverterFactoryMock = Mock.ofType<VideoConverterFactory>();

            fileSystemMock.setup((x) => x.applicationDataDirectory()).returns(() => '/directory/mock');
            fileSystemMock.setup((x) => x.musicDirectory()).returns(() => '/home/user/Music');
            ffmpegCheckerMock.setup((x) => x.isFFmpegAvailableAsync()).returns(() => Promise.resolve(false));
            ffmpegCheckerMock.setup((x) => x.downloadedFFmpegFolder).returns(() => '/home/directory/mock');

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object
            );

            // Act
            await convert.fixDependencies();

            // Assert
            ffmpegDownloaderMock.verify((x) => x.downloadAsync('/home/directory/mock'), Times.exactly(1));
        });

        it('Should not download FFmpeg if it is available', async () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();
            const videoConverterFactoryMock = Mock.ofType<VideoConverterFactory>();

            fileSystemMock.setup((x) => x.applicationDataDirectory()).returns(() => '/directory/mock');
            fileSystemMock.setup((x) => x.musicDirectory()).returns(() => '/home/user/Music');
            ffmpegCheckerMock.setup((x) => x.isFFmpegAvailableAsync()).returns(() => Promise.resolve(true));
            ffmpegCheckerMock.setup((x) => x.downloadedFFmpegFolder).returns(() => '/home/directory/mock');

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object
            );

            // Act
            await convert.fixDependencies();

            // Assert
            ffmpegDownloaderMock.verify((x) => x.downloadAsync('/home/directory/mock'), Times.never());
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

            fileSystemMock.setup((x) => x.musicDirectory()).returns(() => '/home/user/Music');
            videoConverterFactoryMock.setup((x) => x.create('dummyUrl')).returns(() => new YoutubeVideoConverter(loggerMock.object));

            const outputDirectory: string = path.join(fileSystemMock.object.musicDirectory(), 'Vitomu');

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object
            );

            // Act
            await convert.convertAsync('dummyUrl');

            // Assert
            fileSystemMock.verify((x) => x.ensureDirectoryAsync(outputDirectory), Times.exactly(1));
        });

        it('Should not get path of local ffmpeg if ffmpeg is found in system path', async () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();
            const videoConverterFactoryMock = Mock.ofType<VideoConverterFactory>();

            fileSystemMock.setup((x) => x.musicDirectory()).returns(() => '/home/user/Music');
            videoConverterFactoryMock.setup((x) => x.create('dummyUrl')).returns(() => new YoutubeVideoConverter(loggerMock.object));
            ffmpegCheckerMock.setup((x) => x.isFFmpegInSystemPathAsync()).returns(() => Promise.resolve(true));

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object
            );

            // Act
            await convert.convertAsync('dummyUrl');

            // Assert
            ffmpegCheckerMock.verify((x) => x.getPathOfDownloadedFFmpeg(), Times.never());
        });

        it('Should get path of local ffmpeg if ffmpeg is not found in system path', async () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();
            const videoConverterFactoryMock = Mock.ofType<VideoConverterFactory>();

            fileSystemMock.setup((x) => x.musicDirectory()).returns(() => '/home/user/Music');
            videoConverterFactoryMock.setup((x) => x.create('dummyUrl')).returns(() => new YoutubeVideoConverter(loggerMock.object));
            ffmpegCheckerMock.setup((x) => x.isFFmpegInSystemPathAsync()).returns(() => Promise.resolve(false));

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object
            );

            // Act
            await convert.convertAsync('dummyUrl');

            // Assert
            ffmpegCheckerMock.verify((x) => x.getPathOfDownloadedFFmpeg(), Times.exactly(1));
        });

        it('Should create a video converter', async () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();
            const videoConverterFactoryMock = Mock.ofType<VideoConverterFactory>();

            fileSystemMock.setup((x) => x.musicDirectory()).returns(() => '/home/user/Music');
            videoConverterFactoryMock.setup((x) => x.create('dummyUrl')).returns(() => new YoutubeVideoConverter(loggerMock.object));
            ffmpegCheckerMock.setup((x) => x.isFFmpegInSystemPathAsync()).returns(() => Promise.resolve(true));

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object
            );

            // Act
            await convert.convertAsync('dummyUrl');

            // Assert
            videoConverterFactoryMock.verify((x) => x.create('dummyUrl'), Times.exactly(1));
        });

        it('Should perform Youtube video conversion with empty ffmpeg path override if ffmpeg is found in path', async () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();
            const videoConverterFactoryMock = Mock.ofType<VideoConverterFactory>();
            const videoConverterMock = Mock.ofType<VideoConverter>();

            const audioFormat: AudioFormat = new AudioFormat('mp3', 'MP3', 'mp3', '.mp3');

            fileSystemMock.setup((x) => x.musicDirectory()).returns(() => path.join('home', 'user', 'Music'));
            ffmpegCheckerMock.setup((x) => x.isFFmpegInSystemPathAsync()).returns(() => Promise.resolve(true));
            videoConverterFactoryMock.setup((x) => x.create('dummyUrl')).returns(() => videoConverterMock.object);

            const conversionResultFromVideoConverter: ConversionResult = new ConversionResult(
                true,
                path.join('home', 'user', 'Music', 'Vitomu', 'Dummy.mp3')
            );

            videoConverterMock
                .setup((x) => x.convertAsync('dummyUrl', path.join('home', 'user', 'Music', 'Vitomu'), audioFormat, 320, '', It.isAny()))

                .returns(() => Promise.resolve(conversionResultFromVideoConverter));

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object
            );

            convert.selectedAudioFormat = audioFormat;
            convert.selectedAudioBitrate = 320;

            // Act
            await convert.convertAsync('dummyUrl');

            // Assert
            videoConverterMock.verify(
                (x) => x.convertAsync('dummyUrl', path.join('home', 'user', 'Music', 'Vitomu'), audioFormat, 320, '', It.isAny()),
                Times.exactly(1)
            );
        });

        it('Should perform Youtube video conversion with downloaded ffmpeg path override if ffmpeg is not found in path', async () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();
            const videoConverterFactoryMock = Mock.ofType<VideoConverterFactory>();
            const videoConverterMock = Mock.ofType<VideoConverter>();

            const audioFormat: AudioFormat = new AudioFormat('mp3', 'MP3', 'mp3', '.mp3');
            fileSystemMock.setup((x) => x.musicDirectory()).returns(() => path.join('home', 'user', 'Music'));
            ffmpegCheckerMock.setup((x) => x.isFFmpegInSystemPathAsync()).returns(() => Promise.resolve(false));
            ffmpegCheckerMock
                .setup((x) => x.getPathOfDownloadedFFmpeg())
                .returns(() => path.join('home', 'user', '.config', 'Vitomu', 'FFmpeg'));
            videoConverterFactoryMock.setup((x) => x.create('dummyUrl')).returns(() => videoConverterMock.object);
            const conversionResultFromVideoConverter: ConversionResult = new ConversionResult(
                true,
                path.join('home', 'user', 'Music', 'Vitomu', 'Dummy.mp3')
            );
            videoConverterMock
                .setup((x) =>
                    x.convertAsync(
                        'dummyUrl',
                        path.join('home', 'user', 'Music', 'Vitomu'),
                        audioFormat,
                        320,
                        path.join('home', 'user', '.config', 'Vitomu', 'FFmpeg'),
                        It.isAny()
                    )
                )
                .returns(() => Promise.resolve(conversionResultFromVideoConverter));

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object
            );

            convert.selectedAudioFormat = audioFormat;
            convert.selectedAudioBitrate = 320;

            // Act
            await convert.convertAsync('dummyUrl');

            // Assert
            videoConverterMock.verify(
                (x) =>
                    x.convertAsync(
                        'dummyUrl',
                        path.join('home', 'user', 'Music', 'Vitomu'),
                        audioFormat,
                        320,
                        path.join('home', 'user', '.config', 'Vitomu', 'FFmpeg'),
                        It.isAny()
                    ),
                Times.exactly(1)
            );
        });

        it('Should set last converted file path after a successful conversion', async () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();
            const videoConverterFactoryMock = Mock.ofType<VideoConverterFactory>();
            const videoConverterMock = Mock.ofType<VideoConverter>();

            const audioFormat: AudioFormat = new AudioFormat('mp3', 'MP3', 'mp3', '.mp3');
            fileSystemMock.setup((x) => x.musicDirectory()).returns(() => path.join('home', 'user', 'Music'));
            ffmpegCheckerMock.setup((x) => x.isFFmpegInSystemPathAsync()).returns(() => Promise.resolve(false));
            ffmpegCheckerMock
                .setup((x) => x.getPathOfDownloadedFFmpeg())
                .returns(() => path.join('home', 'user', '.config', 'Vitomu', 'FFmpeg'));
            videoConverterFactoryMock.setup((x) => x.create('dummyUrl')).returns(() => videoConverterMock.object);
            const conversionResultFromVideoConverter: ConversionResult = new ConversionResult(
                true,
                path.join('home', 'user', 'Music', 'Vitomu', 'Dummy.mp3')
            );

            videoConverterMock
                .setup((x) =>
                    x.convertAsync(
                        'dummyUrl',
                        path.join('home', 'user', 'Music', 'Vitomu'),
                        audioFormat,
                        320,
                        path.join('home', 'user', '.config', 'Vitomu', 'FFmpeg'),
                        It.isAny()
                    )
                )
                .returns(() => Promise.resolve(conversionResultFromVideoConverter));

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object
            );

            convert.lastConvertedFilePath = '';
            convert.selectedAudioFormat = audioFormat;
            convert.selectedAudioBitrate = 320;

            // Act
            await convert.convertAsync('dummyUrl');

            // Assert
            assert.ok(convert.lastConvertedFilePath === path.join('home', 'user', 'Music', 'Vitomu', 'Dummy.mp3'));
        });

        it('Should set last converted file name after a successful conversion', async () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();
            const videoConverterFactoryMock = Mock.ofType<VideoConverterFactory>();
            const videoConverterMock = Mock.ofType<VideoConverter>();

            const audioFormat: AudioFormat = new AudioFormat('mp3', 'MP3', 'mp3', '.mp3');
            fileSystemMock.setup((x) => x.musicDirectory()).returns(() => path.join('home', 'user', 'Music'));
            fileSystemMock
                .setup((x) => x.getFileName(path.join('home', 'user', 'Music', 'Vitomu', 'Dummy.mp3')))
                .returns(() => 'Dummy.mp3');
            ffmpegCheckerMock.setup((x) => x.isFFmpegInSystemPathAsync()).returns(() => Promise.resolve(false));
            ffmpegCheckerMock
                .setup((x) => x.getPathOfDownloadedFFmpeg())
                .returns(() => path.join('home', 'user', '.config', 'Vitomu', 'FFmpeg'));
            videoConverterFactoryMock.setup((x) => x.create('dummyUrl')).returns(() => videoConverterMock.object);
            const conversionResultFromVideoConverter: ConversionResult = new ConversionResult(
                true,
                path.join('home', 'user', 'Music', 'Vitomu', 'Dummy.mp3')
            );

            videoConverterMock
                .setup((x) =>
                    x.convertAsync(
                        'dummyUrl',
                        path.join('home', 'user', 'Music', 'Vitomu'),
                        audioFormat,
                        320,
                        path.join('home', 'user', '.config', 'Vitomu', 'FFmpeg'),
                        It.isAny()
                    )
                )
                .returns(() => Promise.resolve(conversionResultFromVideoConverter));

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object
            );

            convert.lastConvertedFileName = '';
            convert.selectedAudioFormat = audioFormat;
            convert.selectedAudioBitrate = 320;

            // Act
            await convert.convertAsync('dummyUrl');

            console.log(convert.lastConvertedFileName);

            // Assert
            assert.ok(convert.lastConvertedFileName === 'Dummy.mp3');
        });

        it('Should not clear last converted file path after a failed conversion', async () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();
            const videoConverterFactoryMock = Mock.ofType<VideoConverterFactory>();
            const videoConverterMock = Mock.ofType<VideoConverter>();

            fileSystemMock.setup((x) => x.musicDirectory()).returns(() => path.join('home', 'user', 'Music'));
            ffmpegCheckerMock.setup((x) => x.isFFmpegInSystemPathAsync()).returns(() => Promise.resolve(false));
            ffmpegCheckerMock
                .setup((x) => x.getPathOfDownloadedFFmpeg())
                .returns(() => path.join('home', 'user', '.config', 'Vitomu', 'FFmpeg'));
            videoConverterFactoryMock.setup((x) => x.create('dummyUrl')).returns(() => videoConverterMock.object);

            const audioFormat: AudioFormat = new AudioFormat('mp3', 'MP3', 'mp3', '.mp3');

            videoConverterMock
                .setup((x) =>
                    x.convertAsync(
                        'dummyUrl',
                        path.join('home', 'user', 'Music', 'Vitomu'),
                        audioFormat,
                        320,
                        path.join('home', 'user', '.config', 'Vitomu', 'FFmpeg'),
                        It.isAny()
                    )
                )
                .returns(() => Promise.resolve(new ConversionResult(false, '')));

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object
            );

            convert.lastConvertedFilePath = path.join('home', 'user', 'Music', 'Vitomu', 'Dummy.mp3');
            convert.selectedAudioFormat = audioFormat;
            convert.selectedAudioBitrate = 320;

            // Act
            await convert.convertAsync('dummyUrl');

            // Assert
            assert.ok(convert.lastConvertedFilePath === path.join('home', 'user', 'Music', 'Vitomu', 'Dummy.mp3'));
        });

        it('Should not clear last converted file name after a failed conversion', async () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();
            const videoConverterFactoryMock = Mock.ofType<VideoConverterFactory>();
            const videoConverterMock = Mock.ofType<VideoConverter>();

            fileSystemMock.setup((x) => x.musicDirectory()).returns(() => path.join('home', 'user', 'Music'));
            ffmpegCheckerMock.setup((x) => x.isFFmpegInSystemPathAsync()).returns(() => Promise.resolve(false));
            ffmpegCheckerMock
                .setup((x) => x.getPathOfDownloadedFFmpeg())
                .returns(() => path.join('home', 'user', '.config', 'Vitomu', 'FFmpeg'));
            videoConverterFactoryMock.setup((x) => x.create('dummyUrl')).returns(() => videoConverterMock.object);

            const audioFormat: AudioFormat = new AudioFormat('mp3', 'MP3', 'mp3', '.mp3');

            videoConverterMock
                .setup((x) =>
                    x.convertAsync(
                        'dummyUrl',
                        path.join('home', 'user', 'Music', 'Vitomu'),
                        audioFormat,
                        320,
                        path.join('home', 'user', '.config', 'Vitomu', 'FFmpeg'),
                        It.isAny()
                    )
                )
                .returns(() => Promise.resolve(new ConversionResult(false, '')));

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object
            );

            convert.lastConvertedFileName = 'Dummy.mp3';
            convert.selectedAudioFormat = audioFormat;
            convert.selectedAudioBitrate = 320;

            // Act
            await convert.convertAsync('dummyUrl');

            // Assert
            assert.ok(convert.lastConvertedFileName === 'Dummy.mp3');
        });

        it('Should return the conversion result of the video converter', async () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();
            const videoConverterFactoryMock = Mock.ofType<VideoConverterFactory>();
            const videoConverterMock = Mock.ofType<VideoConverter>();

            fileSystemMock.setup((x) => x.musicDirectory()).returns(() => path.join('home', 'user', 'Music'));
            ffmpegCheckerMock.setup((x) => x.isFFmpegInSystemPathAsync()).returns(() => Promise.resolve(false));
            ffmpegCheckerMock
                .setup((x) => x.getPathOfDownloadedFFmpeg())
                .returns(() => path.join('home', 'user', '.config', 'Vitomu', 'FFmpeg'));
            videoConverterFactoryMock.setup((x) => x.create('dummyUrl')).returns(() => videoConverterMock.object);

            const audioFormat: AudioFormat = new AudioFormat('mp3', 'MP3', 'mp3', '.mp3');

            const conversionResultFromVideoConverter: ConversionResult = new ConversionResult(
                true,
                path.join('home', 'user', 'Music', 'Vitomu', 'Dummy.mp3')
            );

            videoConverterMock
                .setup((x) =>
                    x.convertAsync(
                        'dummyUrl',
                        path.join('home', 'user', 'Music', 'Vitomu'),
                        audioFormat,
                        320,
                        path.join('home', 'user', '.config', 'Vitomu', 'FFmpeg'),
                        It.isAny()
                    )
                )
                .returns(() => Promise.resolve(conversionResultFromVideoConverter));

            const convert = new ConvertService(
                loggerMock.object,
                ffmpegCheckerMock.object,
                ffmpegDownloaderMock.object,
                fileSystemMock.object,
                settingsMock.object,
                videoConverterFactoryMock.object
            );

            convert.selectedAudioFormat = audioFormat;
            convert.selectedAudioBitrate = 320;

            // Act
            const conversionResult: ConversionResult = await convert.convertAsync('dummyUrl');

            // Assert
            assert.ok(conversionResult === conversionResultFromVideoConverter);
        });
    });
});
