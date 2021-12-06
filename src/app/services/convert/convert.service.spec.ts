import * as assert from 'assert';
import * as path from 'path';
import { Subscription } from 'rxjs';
import { IMock, It, Mock, Times } from 'typemoq';
import { AudioFormat } from '../../common/audio-format';
import { Environment } from '../../common/environment';
import { FileSystem } from '../../common/file-system';
import { Logger } from '../../common/logger';
import { BaseSettings } from '../../common/settings/base-settings';
import { ConversionResult } from './conversion-result';
import { ConvertService } from './convert.service';
import { DependencyChecker } from './dependency-checker';
import { DependencyCheckerFactory } from './dependency-checker-factory';
import { FFmpegDownloader } from './ffmpeg-downloader';
import { VideoConverter } from './video-converter';
import { VideoConverterFactory } from './video-converter.factory';
import { YoutubeDownloaderDownloader } from './youtube-downloader-downloader';
import { YoutubeDownloaderUpdater } from './youtube-downloader-updater';

describe('ConvertService', () => {
    let environmentMock: IMock<Environment>;
    let loggerMock: IMock<Logger>;
    let dependencyCheckerFactoryMock: IMock<DependencyCheckerFactory>;
    let ffmpegDownloaderMock: IMock<FFmpegDownloader>;
    let youtubeDownloaderDownloaderMock: IMock<YoutubeDownloaderDownloader>;
    let youtubeDownloaderUpdaterMock: IMock<YoutubeDownloaderUpdater>;
    let fileSystemMock: IMock<FileSystem>;
    let settingsMock: IMock<BaseSettings>;
    let videoConverterFactoryMock: IMock<VideoConverterFactory>;
    let ffmpegCheckerMock: IMock<DependencyChecker>;
    let youtubeDownloaderCheckerMock: IMock<DependencyChecker>;

    beforeEach(() => {
        environmentMock = Mock.ofType<Environment>();
        loggerMock = Mock.ofType<Logger>();
        dependencyCheckerFactoryMock = Mock.ofType<DependencyCheckerFactory>();
        ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
        youtubeDownloaderDownloaderMock = Mock.ofType<YoutubeDownloaderDownloader>();
        youtubeDownloaderUpdaterMock = Mock.ofType<YoutubeDownloaderUpdater>();
        fileSystemMock = Mock.ofType<FileSystem>();
        settingsMock = Mock.ofType<BaseSettings>();
        videoConverterFactoryMock = Mock.ofType<VideoConverterFactory>();
        ffmpegCheckerMock = Mock.ofType<DependencyChecker>();
        youtubeDownloaderCheckerMock = Mock.ofType<DependencyChecker>();
        fileSystemMock.setup((x) => x.musicDirectory()).returns(() => '/home/user/Music');
        dependencyCheckerFactoryMock.setup((x) => x.createFfmpegChecker()).returns(() => ffmpegCheckerMock.object);
        dependencyCheckerFactoryMock.setup((x) => x.createYoutubeDownloaderChecker()).returns(() => youtubeDownloaderCheckerMock.object);
        settingsMock.setup((x) => x.audioFormat).returns(() => 'mp3');
        settingsMock.setup((x) => x.audioBitrate).returns(() => 320);
    });

    function createService(): ConvertService {
        return new ConvertService(
            loggerMock.object,
            dependencyCheckerFactoryMock.object,
            ffmpegDownloaderMock.object,
            youtubeDownloaderDownloaderMock.object,
            youtubeDownloaderUpdaterMock.object,
            fileSystemMock.object,
            settingsMock.object,
            videoConverterFactoryMock.object
        );
    }

    describe('constructor', () => {
        it('Should provide a list of audio formats', () => {
            // Arrange

            // Act
            const convertService: ConvertService = createService();

            // Assert
            assert.ok(convertService.audioFormats.length > 0);
        });

        it('Should provide a list of audio bitrates', () => {
            // Arrange

            // Act
            const convertService: ConvertService = createService();

            // Assert
            assert.ok(convertService.audioBitrates.length > 0);
        });

        it('Should have empty last converted file path', () => {
            // Arrange

            // Act
            const convertService: ConvertService = createService();

            // Assert
            assert.equal(convertService.lastConvertedFilePath, '');
        });

        it('Should have empty last converted file name', () => {
            // Arrange

            // Act
            const convertService: ConvertService = createService();

            // Assert
            assert.equal(convertService.lastConvertedFileName, '');
        });

        it('Should use audio bitrate from the settings', () => {
            // Arrange

            // Act
            const convertService: ConvertService = createService();

            // Assert
            assert.equal(convertService.selectedAudioBitrate, 320);
        });

        it('Should use audio format from the settings', () => {
            // Arrange

            // Act
            const convertService: ConvertService = createService();

            // Assert
            assert.equal(convertService.selectedAudioFormat.id, 'mp3');
        });
    });
    describe('isVideoUrlConvertible', () => {
        it('Should consider long youtube URLs to be convertible', () => {
            // Arrange
            settingsMock.setup((x) => x.audioFormat).returns(() => 'mp3');

            const convertService: ConvertService = createService();

            // Act
            const isVideoUrlConvertible: boolean = convertService.isVideoUrlConvertible('https://www.youtube.com/watch?v=9WQxorFEnG8');

            // Assert
            assert.ok(isVideoUrlConvertible);
        });

        it('Should consider short youtube URLs to be convertible', () => {
            // Arrange
            settingsMock.setup((x) => x.audioFormat).returns(() => 'mp3');

            const convertService: ConvertService = createService();

            // Act
            const isVideoUrlConvertible: boolean = convertService.isVideoUrlConvertible('http://youtu.be/7DQPgw7gxtc');

            // Assert
            assert.ok(isVideoUrlConvertible);
        });

        it('Should consider non-youtube URLs to be not convertible', () => {
            // Arrange
            settingsMock.setup((x) => x.audioFormat).returns(() => 'mp3');

            const convertService: ConvertService = createService();

            // Act
            const isVideoUrlConvertible: boolean = convertService.isVideoUrlConvertible('https://www.google.com');

            // Assert
            assert.ok(!isVideoUrlConvertible);
        });
    });

    describe('onConversionProgressChanged', () => {
        it('Should notify when convert progress changes', async () => {
            // Arrange
            fileSystemMock.setup((x) => x.musicDirectory()).returns(() => '/home/user/Music');

            const convertService: ConvertService = createService();

            const subscription: Subscription = new Subscription();

            let lastProgressPercent: number = 0;

            subscription.add(
                convertService.conversionProgressChanged$.subscribe((progressPercent) => {
                    lastProgressPercent = progressPercent;
                })
            );

            // Act
            await convertService.onConversionProgressChanged(50);
            subscription.unsubscribe();

            // Assert
            assert.equal(lastProgressPercent, 50);
        });
    });

    // describe('arePrerequisitesOKAsync', () => {
    //     it('Should return true if FFmpeg is available', async () => {
    //         // Arrange
    //         const loggerMock = Mock.ofType<Logger>();
    //         const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
    //         const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
    //         const fileSystemMock = Mock.ofType<FileSystem>();
    //         const settingsMock = Mock.ofType<Settings>();
    //         const videoConverterFactoryMock = Mock.ofType<VideoConverterFactory>();

    //         fileSystemMock.setup((x) => x.applicationDataDirectory()).returns(() => '/directory/mock');
    //         fileSystemMock.setup((x) => x.musicDirectory()).returns(() => '/home/user/Music');
    //         ffmpegCheckerMock.setup((x) => x.isFFmpegAvailableAsync()).returns(() => Promise.resolve(true));
    //         ffmpegCheckerMock.setup((x) => x.downloadedFFmpegFolder).returns(() => '/home/directory/mock');

    //         const convert = new ConvertService(
    //             loggerMock.object,
    //             ffmpegCheckerMock.object,
    //             ffmpegDownloaderMock.object,
    //             fileSystemMock.object,
    //             settingsMock.object,
    //             videoConverterFactoryMock.object
    //         );

    //         // Act
    //         const prerequisitesAreOK: boolean = await convert.areDependenciesAvailableAsync();

    //         // Assert
    //         assert.ok(prerequisitesAreOK);
    //     });

    //     it('Should return false if FFmpeg is not available', async () => {
    //         // Arrange
    //         const loggerMock = Mock.ofType<Logger>();
    //         const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
    //         const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
    //         const fileSystemMock = Mock.ofType<FileSystem>();
    //         const settingsMock = Mock.ofType<Settings>();
    //         const videoConverterFactoryMock = Mock.ofType<VideoConverterFactory>();

    //         fileSystemMock.setup((x) => x.applicationDataDirectory()).returns(() => '/directory/mock');
    //         fileSystemMock.setup((x) => x.musicDirectory()).returns(() => '/home/user/Music');
    //         ffmpegCheckerMock.setup((x) => x.isFFmpegAvailableAsync()).returns(() => Promise.resolve(false));
    //         ffmpegCheckerMock.setup((x) => x.downloadedFFmpegFolder).returns(() => '/home/directory/mock');

    //         const convert = new ConvertService(
    //             loggerMock.object,
    //             ffmpegCheckerMock.object,
    //             ffmpegDownloaderMock.object,
    //             fileSystemMock.object,
    //             settingsMock.object,
    //             videoConverterFactoryMock.object
    //         );

    //         // Act
    //         const prerequisitesAreOK: boolean = await convert.areDependenciesAvailableAsync();

    //         // Assert
    //         assert.ok(!prerequisitesAreOK);
    //     });
    // });

    // describe('fixPrerequisites', () => {
    //     it('Should check if FFmpeg is available', async () => {
    //         // Arrange
    //         const loggerMock = Mock.ofType<Logger>();
    //         const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
    //         const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
    //         const fileSystemMock = Mock.ofType<FileSystem>();
    //         const settingsMock = Mock.ofType<Settings>();
    //         const videoConverterFactoryMock = Mock.ofType<VideoConverterFactory>();

    //         fileSystemMock.setup((x) => x.musicDirectory()).returns(() => '/home/user/Music');

    //         const convert = new ConvertService(
    //             loggerMock.object,
    //             ffmpegCheckerMock.object,
    //             ffmpegDownloaderMock.object,
    //             fileSystemMock.object,
    //             settingsMock.object,
    //             videoConverterFactoryMock.object
    //         );

    //         // Act
    //         await convert.fixDependencies();

    //         // Assert
    //         ffmpegCheckerMock.verify((x) => x.isFFmpegAvailableAsync(), Times.exactly(1));
    //     });

    //     it('Should download FFmpeg if it is not available', async () => {
    //         // Arrange
    //         const loggerMock = Mock.ofType<Logger>();
    //         const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
    //         const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
    //         const fileSystemMock = Mock.ofType<FileSystem>();
    //         const settingsMock = Mock.ofType<Settings>();
    //         const videoConverterFactoryMock = Mock.ofType<VideoConverterFactory>();

    //         fileSystemMock.setup((x) => x.applicationDataDirectory()).returns(() => '/directory/mock');
    //         fileSystemMock.setup((x) => x.musicDirectory()).returns(() => '/home/user/Music');
    //         ffmpegCheckerMock.setup((x) => x.isFFmpegAvailableAsync()).returns(() => Promise.resolve(false));
    //         ffmpegCheckerMock.setup((x) => x.downloadedFFmpegFolder).returns(() => '/home/directory/mock');

    //         const convert = new ConvertService(
    //             loggerMock.object,
    //             ffmpegCheckerMock.object,
    //             ffmpegDownloaderMock.object,
    //             fileSystemMock.object,
    //             settingsMock.object,
    //             videoConverterFactoryMock.object
    //         );

    //         // Act
    //         await convert.fixDependencies();

    //         // Assert
    //         ffmpegDownloaderMock.verify((x) => x.downloadAsync('/home/directory/mock'), Times.exactly(1));
    //     });

    //     it('Should not download FFmpeg if it is available', async () => {
    //         // Arrange
    //         const loggerMock = Mock.ofType<Logger>();
    //         const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
    //         const ffmpegDownloaderMock = Mock.ofType<FFmpegDownloader>();
    //         const fileSystemMock = Mock.ofType<FileSystem>();
    //         const settingsMock = Mock.ofType<Settings>();
    //         const videoConverterFactoryMock = Mock.ofType<VideoConverterFactory>();

    //         fileSystemMock.setup((x) => x.applicationDataDirectory()).returns(() => '/directory/mock');
    //         fileSystemMock.setup((x) => x.musicDirectory()).returns(() => '/home/user/Music');
    //         ffmpegCheckerMock.setup((x) => x.isFFmpegAvailableAsync()).returns(() => Promise.resolve(true));
    //         ffmpegCheckerMock.setup((x) => x.downloadedFFmpegFolder).returns(() => '/home/directory/mock');

    //         const convert = new ConvertService(
    //             loggerMock.object,
    //             ffmpegCheckerMock.object,
    //             ffmpegDownloaderMock.object,
    //             fileSystemMock.object,
    //             settingsMock.object,
    //             videoConverterFactoryMock.object
    //         );

    //         // Act
    //         await convert.fixDependencies();

    //         // Assert
    //         ffmpegDownloaderMock.verify((x) => x.downloadAsync('/home/directory/mock'), Times.never());
    //     });
    // });

    describe('convertAsync', () => {
        it('Should ensure that the output directory exists', async () => {
            // Arrange
            const videoConverterMock: IMock<VideoConverter> = Mock.ofType<VideoConverter>();

            videoConverterMock
                .setup((x) =>
                    x.convertAsync(
                        'dummyUrl',
                        '/home/user/Music/Vitomu',
                        It.is<AudioFormat>((y) => y.ffmpegFormat === 'mp3'),
                        320,
                        It.isAny(),
                        It.isAny(),
                        It.isAny()
                    )
                )
                .returns(async () => new ConversionResult(true, 'Path 1'));

            videoConverterFactoryMock.setup((x) => x.create('dummyUrl')).returns(() => videoConverterMock.object);

            ffmpegCheckerMock.setup((x) => x.isDependencyInSystemPathAsync()).returns(async () => true);
            youtubeDownloaderCheckerMock.setup((x) => x.isDependencyInSystemPathAsync()).returns(async () => true);

            const outputDirectory: string = path.join(fileSystemMock.object.musicDirectory(), 'Vitomu');

            const convertService: ConvertService = createService();

            // Act
            await convertService.convertAsync('dummyUrl');

            // Assert
            fileSystemMock.verify((x) => x.ensureDirectoryAsync(outputDirectory), Times.once());
        });

        it('Should convert using system Ffmpeg and Youtube converter if both are found in system path', async () => {
            // Arrange
            const videoConverterMock: IMock<VideoConverter> = Mock.ofType<VideoConverter>();

            videoConverterMock
                .setup((x) =>
                    x.convertAsync(
                        'dummyUrl',
                        '/home/user/Music/Vitomu',
                        It.is<AudioFormat>((y) => y.ffmpegFormat === 'mp3'),
                        320,
                        It.isAny(),
                        It.isAny(),
                        It.isAny()
                    )
                )
                .returns(async () => new ConversionResult(true, 'Path 1'));

            videoConverterFactoryMock.setup((x) => x.create('dummyUrl')).returns(() => videoConverterMock.object);

            ffmpegCheckerMock.setup((x) => x.getPathOfDownloadedDependency()).returns(() => 'ffmpeg path');
            ffmpegCheckerMock.setup((x) => x.isDependencyInSystemPathAsync()).returns(async () => true);
            youtubeDownloaderCheckerMock.setup((x) => x.getPathOfDownloadedDependency()).returns(() => 'yt-dlp path');
            youtubeDownloaderCheckerMock.setup((x) => x.isDependencyInSystemPathAsync()).returns(async () => true);

            const convertService: ConvertService = createService();

            // Act
            await convertService.convertAsync('dummyUrl');

            // Assert
            videoConverterMock.verify(
                (x) =>
                    x.convertAsync(
                        'dummyUrl',
                        '/home/user/Music/Vitomu',
                        It.is<AudioFormat>((y) => y.ffmpegFormat === 'mp3'),
                        320,
                        It.isAny(),
                        It.isAny(),
                        It.isAny()
                    ),
                Times.once()
            );
        });

        it('Should convert using local Ffmpeg if not found in path', async () => {
            // Arrange
            const videoConverterMock: IMock<VideoConverter> = Mock.ofType<VideoConverter>();

            videoConverterMock
                .setup((x) =>
                    x.convertAsync(
                        'dummyUrl',
                        '/home/user/Music/Vitomu',
                        It.is<AudioFormat>((y) => y.ffmpegFormat === 'mp3'),
                        320,
                        It.isAny(),
                        It.isAny(),
                        It.isAny()
                    )
                )
                .returns(async () => new ConversionResult(true, 'Path 1'));

            videoConverterFactoryMock.setup((x) => x.create('dummyUrl')).returns(() => videoConverterMock.object);

            ffmpegCheckerMock.setup((x) => x.getPathOfDownloadedDependency()).returns(() => 'ffmpeg path');
            ffmpegCheckerMock.setup((x) => x.isDependencyInSystemPathAsync()).returns(async () => false);
            youtubeDownloaderCheckerMock.setup((x) => x.getPathOfDownloadedDependency()).returns(() => 'yt-dlp path');
            youtubeDownloaderCheckerMock.setup((x) => x.isDependencyInSystemPathAsync()).returns(async () => true);

            const convertService: ConvertService = createService();

            // Act
            await convertService.convertAsync('dummyUrl');

            // Assert
            videoConverterMock.verify(
                (x) =>
                    x.convertAsync(
                        'dummyUrl',
                        '/home/user/Music/Vitomu',
                        It.is<AudioFormat>((y) => y.ffmpegFormat === 'mp3'),
                        320,
                        'ffmpeg path',
                        '',
                        It.isAny()
                    ),
                Times.once()
            );
        });

        it('Should convert using local Youtube downloader if not found in path', async () => {
            // Arrange
            const videoConverterMock: IMock<VideoConverter> = Mock.ofType<VideoConverter>();

            videoConverterMock
                .setup((x) =>
                    x.convertAsync(
                        'dummyUrl',
                        '/home/user/Music/Vitomu',
                        It.is<AudioFormat>((y) => y.ffmpegFormat === 'mp3'),
                        320,
                        It.isAny(),
                        It.isAny(),
                        It.isAny()
                    )
                )
                .returns(async () => new ConversionResult(true, 'Path 1'));

            videoConverterFactoryMock.setup((x) => x.create('dummyUrl')).returns(() => videoConverterMock.object);

            ffmpegCheckerMock.setup((x) => x.getPathOfDownloadedDependency()).returns(() => 'ffmpeg path');
            ffmpegCheckerMock.setup((x) => x.isDependencyInSystemPathAsync()).returns(async () => true);
            youtubeDownloaderCheckerMock.setup((x) => x.getPathOfDownloadedDependency()).returns(() => 'yt-dlp path');
            youtubeDownloaderCheckerMock.setup((x) => x.isDependencyInSystemPathAsync()).returns(async () => false);

            const convertService: ConvertService = createService();

            // Act
            await convertService.convertAsync('dummyUrl');

            // Assert
            videoConverterMock.verify(
                (x) =>
                    x.convertAsync(
                        'dummyUrl',
                        '/home/user/Music/Vitomu',
                        It.is<AudioFormat>((y) => y.ffmpegFormat === 'mp3'),
                        320,
                        '',
                        'yt-dlp path',
                        It.isAny()
                    ),
                Times.once()
            );
        });

        it('Should convert using local Ffmpeg and Youtube downloader if both not found in path', async () => {
            // Arrange
            const videoConverterMock: IMock<VideoConverter> = Mock.ofType<VideoConverter>();

            videoConverterMock
                .setup((x) =>
                    x.convertAsync(
                        'dummyUrl',
                        '/home/user/Music/Vitomu',
                        It.is<AudioFormat>((y) => y.ffmpegFormat === 'mp3'),
                        320,
                        It.isAny(),
                        It.isAny(),
                        It.isAny()
                    )
                )
                .returns(async () => new ConversionResult(true, 'Path 1'));

            videoConverterFactoryMock.setup((x) => x.create('dummyUrl')).returns(() => videoConverterMock.object);

            ffmpegCheckerMock.setup((x) => x.getPathOfDownloadedDependency()).returns(() => 'ffmpeg path');
            ffmpegCheckerMock.setup((x) => x.isDependencyInSystemPathAsync()).returns(async () => false);
            youtubeDownloaderCheckerMock.setup((x) => x.getPathOfDownloadedDependency()).returns(() => 'yt-dlp path');
            youtubeDownloaderCheckerMock.setup((x) => x.isDependencyInSystemPathAsync()).returns(async () => false);

            const convertService: ConvertService = createService();

            // Act
            await convertService.convertAsync('dummyUrl');

            // Assert
            videoConverterMock.verify(
                (x) =>
                    x.convertAsync(
                        'dummyUrl',
                        '/home/user/Music/Vitomu',
                        It.is<AudioFormat>((y) => y.ffmpegFormat === 'mp3'),
                        320,
                        'ffmpeg path',
                        'yt-dlp path',
                        It.isAny()
                    ),
                Times.once()
            );
        });
    });
});
