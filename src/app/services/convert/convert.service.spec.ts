import * as assert from 'assert';
import { Subscription } from 'rxjs';
import { IMock, It, Mock, Times } from 'typemoq';
import { AudioFormat } from '../../common/audio-format';
import { Environment } from '../../common/io/environment';
import { FileSystem } from '../../common/io/file-system';
import { Logger } from '../../common/logger';
import { BaseSettings } from '../../common/settings/base-settings';
import { BaseConvertService } from './base-convert.service';
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
        fileSystemMock.setup((x) => x.combinePath(['/home/user/Music', 'Vitomu'])).returns(() => '/home/user/Music/Vitomu');
        dependencyCheckerFactoryMock.setup((x) => x.createFfmpegChecker()).returns(() => ffmpegCheckerMock.object);
        dependencyCheckerFactoryMock.setup((x) => x.createYoutubeDownloaderChecker()).returns(() => youtubeDownloaderCheckerMock.object);
        settingsMock.setup((x) => x.audioFormat).returns(() => 'mp3');
        settingsMock.setup((x) => x.audioBitrate).returns(() => 320);
    });

    function createService(): BaseConvertService {
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
            const convertService: BaseConvertService = createService();

            // Assert
            assert.ok(convertService.audioFormats.length > 0);
        });

        it('Should provide a list of audio bitrates', () => {
            // Arrange

            // Act
            const convertService: BaseConvertService = createService();

            // Assert
            assert.ok(convertService.audioBitrates.length > 0);
        });

        it('Should have empty last converted file path', () => {
            // Arrange

            // Act
            const convertService: BaseConvertService = createService();

            // Assert
            assert.equal(convertService.lastConvertedFilePath, '');
        });

        it('Should have empty last converted file name', () => {
            // Arrange

            // Act
            const convertService: BaseConvertService = createService();

            // Assert
            assert.equal(convertService.lastConvertedFileName, '');
        });

        it('Should use audio bitrate from the settings', () => {
            // Arrange

            // Act
            const convertService: BaseConvertService = createService();

            // Assert
            assert.equal(convertService.selectedAudioBitrate, 320);
        });

        it('Should use audio format from the settings', () => {
            // Arrange

            // Act
            const convertService: BaseConvertService = createService();

            // Assert
            assert.equal(convertService.selectedAudioFormat.id, 'mp3');
        });
    });
    describe('isVideoUrlConvertible', () => {
        it('Should consider long youtube URLs to be convertible', () => {
            // Arrange
            settingsMock.setup((x) => x.audioFormat).returns(() => 'mp3');

            const convertService: BaseConvertService = createService();

            // Act
            const isVideoUrlConvertible: boolean = convertService.isVideoUrlConvertible('https://www.youtube.com/watch?v=9WQxorFEnG8');

            // Assert
            assert.ok(isVideoUrlConvertible);
        });

        it('Should consider short youtube URLs to be convertible', () => {
            // Arrange
            settingsMock.setup((x) => x.audioFormat).returns(() => 'mp3');

            const convertService: BaseConvertService = createService();

            // Act
            const isVideoUrlConvertible: boolean = convertService.isVideoUrlConvertible('http://youtu.be/7DQPgw7gxtc');

            // Assert
            assert.ok(isVideoUrlConvertible);
        });

        it('Should consider non-youtube URLs to be not convertible', () => {
            // Arrange
            settingsMock.setup((x) => x.audioFormat).returns(() => 'mp3');

            const convertService: BaseConvertService = createService();

            // Act
            const isVideoUrlConvertible: boolean = convertService.isVideoUrlConvertible('https://www.google.com');

            // Assert
            assert.ok(!isVideoUrlConvertible);
        });
    });

    describe('onConversionProgressChanged', () => {
        it('Should notify when convert progress changes', async () => {
            // Arrange
            const convertService: BaseConvertService = createService();

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

    describe('isFfmpegAvailableAsync', () => {
        it('Should return true if FFmpeg is available', async () => {
            // Arrange
            ffmpegCheckerMock.setup((x) => x.isDependencyAvailableAsync()).returns(async () => true);
            const convertService: BaseConvertService = createService();

            // Act
            const ffmpegIsAvailable: boolean = await convertService.isFfmpegAvailableAsync();

            // Assert
            expect(ffmpegIsAvailable).toBeTruthy();
        });

        it('Should return false if FFmpeg is not available', async () => {
            // Arrange
            ffmpegCheckerMock.setup((x) => x.isDependencyAvailableAsync()).returns(async () => false);
            const convertService: BaseConvertService = createService();

            // Act
            const ffmpegIsAvailable: boolean = await convertService.isFfmpegAvailableAsync();

            // Assert
            expect(ffmpegIsAvailable).toBeFalsy();
        });
    });

    describe('isYoutubeDownloaderAvailableAsync', () => {
        it('Should return true if Youtube downloader is available', async () => {
            // Arrange
            youtubeDownloaderCheckerMock.setup((x) => x.isDependencyAvailableAsync()).returns(async () => true);
            const convertService: BaseConvertService = createService();

            // Act
            const youtubeDownloaderIsAvailable: boolean = await convertService.isYoutubeDownloaderAvailableAsync();

            // Assert
            expect(youtubeDownloaderIsAvailable).toBeTruthy();
        });

        it('Should return false if FFYoutube downloadermpeg is not available', async () => {
            // Arrange
            youtubeDownloaderCheckerMock.setup((x) => x.isDependencyAvailableAsync()).returns(async () => false);
            const convertService: BaseConvertService = createService();

            // Act
            const youtubeDownloaderIsAvailable: boolean = await convertService.isYoutubeDownloaderAvailableAsync();

            // Assert
            expect(youtubeDownloaderIsAvailable).toBeFalsy();
        });
    });

    describe('downloadFfmpegAsync', () => {
        it('Should not download FFmpeg if it is available', async () => {
            // Arrange
            ffmpegCheckerMock.setup((x) => x.isDependencyAvailableAsync()).returns(async () => true);
            ffmpegCheckerMock.setup((x) => x.downloadedDependencyFolder).returns(() => 'FFmpeg folder');
            const convertService: BaseConvertService = createService();

            // Act
            await convertService.downloadFfmpegAsync();

            // Assert
            ffmpegDownloaderMock.verify((x) => x.downloadAsync('FFmpeg folder'), Times.never());
        });

        it('Should download FFmpeg if it is not available', async () => {
            // Arrange
            ffmpegCheckerMock.setup((x) => x.isDependencyAvailableAsync()).returns(async () => false);
            ffmpegCheckerMock.setup((x) => x.downloadedDependencyFolder).returns(() => 'FFmpeg folder');
            const convertService: BaseConvertService = createService();

            // Act
            await convertService.downloadFfmpegAsync();

            // Assert
            ffmpegDownloaderMock.verify((x) => x.downloadAsync('FFmpeg folder'), Times.once());
        });
    });

    describe('downloadYoutubeDownloaderAsync', () => {
        it('Should not download Youtube downloader if it is available', async () => {
            // Arrange
            youtubeDownloaderCheckerMock.setup((x) => x.isDependencyAvailableAsync()).returns(async () => true);
            youtubeDownloaderCheckerMock.setup((x) => x.downloadedDependencyFolder).returns(() => 'Youtube downloader folder');
            const convertService: BaseConvertService = createService();

            // Act
            await convertService.downloadYoutubeDownloaderAsync();

            // Assert
            youtubeDownloaderDownloaderMock.verify((x) => x.downloadAsync('Youtube downloader folder'), Times.never());
        });

        it('Should download Youtube downloader if it is not available', async () => {
            // Arrange
            youtubeDownloaderCheckerMock.setup((x) => x.isDependencyAvailableAsync()).returns(async () => false);
            youtubeDownloaderCheckerMock.setup((x) => x.downloadedDependencyFolder).returns(() => 'Youtube downloader folder');
            const convertService: BaseConvertService = createService();

            // Act
            await convertService.downloadYoutubeDownloaderAsync();

            // Assert
            youtubeDownloaderDownloaderMock.verify((x) => x.downloadAsync('Youtube downloader folder'), Times.once());
        });
    });

    describe('updateYoutubeDownloaderAsync', () => {
        it('Should not update Youtube downloader if no downloaded version is found', async () => {
            // Arrange
            youtubeDownloaderCheckerMock.setup((x) => x.getPathOfDownloadedDependency()).returns(() => '');
            const convertService: BaseConvertService = createService();

            // Act
            await convertService.updateYoutubeDownloaderAsync();

            // Assert
            youtubeDownloaderUpdaterMock.verify((x) => x.updateYoutubeDownloaderAsync(It.isAny()), Times.never());
        });

        it('Should update Youtube downloader if a downloaded version is found', async () => {
            // Arrange
            youtubeDownloaderCheckerMock.setup((x) => x.getPathOfDownloadedDependency()).returns(() => 'Youtube downloader folder');
            const convertService: BaseConvertService = createService();

            // Act
            await convertService.updateYoutubeDownloaderAsync();

            // Assert
            youtubeDownloaderUpdaterMock.verify((x) => x.updateYoutubeDownloaderAsync('Youtube downloader folder'), Times.once());
        });
    });

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

            const convertService: BaseConvertService = createService();

            // Act
            await convertService.convertAsync('dummyUrl');

            // Assert
            fileSystemMock.verify((x) => x.ensureDirectoryAsync('/home/user/Music/Vitomu'), Times.once());
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

            const convertService: BaseConvertService = createService();

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

            const convertService: BaseConvertService = createService();

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

            const convertService: BaseConvertService = createService();

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

            const convertService: BaseConvertService = createService();

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

        it('Should not change lastConvertedFilePath and lastConvertedFileName after a failed conversion', async () => {
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
                .returns(async () => new ConversionResult(false, ''));

            videoConverterFactoryMock.setup((x) => x.create('dummyUrl')).returns(() => videoConverterMock.object);

            ffmpegCheckerMock.setup((x) => x.getPathOfDownloadedDependency()).returns(() => 'ffmpeg path');
            ffmpegCheckerMock.setup((x) => x.isDependencyInSystemPathAsync()).returns(async () => false);
            youtubeDownloaderCheckerMock.setup((x) => x.getPathOfDownloadedDependency()).returns(() => 'yt-dlp path');
            youtubeDownloaderCheckerMock.setup((x) => x.isDependencyInSystemPathAsync()).returns(async () => false);

            const convertService: BaseConvertService = createService();
            convertService.lastConvertedFilePath = 'previous file path';
            convertService.lastConvertedFileName = 'previous file name';

            // Act
            await convertService.convertAsync('dummyUrl');

            // Assert
            expect(convertService.lastConvertedFilePath).toEqual('previous file path');
            expect(convertService.lastConvertedFileName).toEqual('previous file name');
        });

        it('Should change lastConvertedFilePath and lastConvertedFileName after a successful conversion', async () => {
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
                .returns(async () => new ConversionResult(true, '/home/user/Music/Vitomu/file2.mp3'));

            videoConverterFactoryMock.setup((x) => x.create('dummyUrl')).returns(() => videoConverterMock.object);

            ffmpegCheckerMock.setup((x) => x.getPathOfDownloadedDependency()).returns(() => 'ffmpeg path');
            ffmpegCheckerMock.setup((x) => x.isDependencyInSystemPathAsync()).returns(async () => false);
            youtubeDownloaderCheckerMock.setup((x) => x.getPathOfDownloadedDependency()).returns(() => 'yt-dlp path');
            youtubeDownloaderCheckerMock.setup((x) => x.isDependencyInSystemPathAsync()).returns(async () => false);

            fileSystemMock.setup((x) => x.getFileName('/home/user/Music/Vitomu/file2.mp3')).returns(() => 'file2.mp3');

            const convertService: BaseConvertService = createService();
            convertService.lastConvertedFilePath = '/home/user/Music/Vitomu/file1.mp3';
            convertService.lastConvertedFileName = 'file1.mp3';

            // Act
            await convertService.convertAsync('dummyUrl');

            // Assert
            expect(convertService.lastConvertedFilePath).toEqual('/home/user/Music/Vitomu/file2.mp3');
            expect(convertService.lastConvertedFileName).toEqual('file2.mp3');
        });

        it('Should return the conversion result from the video converter', async () => {
            // Arrange
            const videoConverterMock: IMock<VideoConverter> = Mock.ofType<VideoConverter>();
            const conversionResult: ConversionResult = new ConversionResult(true, '/home/user/Music/Vitomu/file2.mp3');

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
                .returns(async () => conversionResult);

            videoConverterFactoryMock.setup((x) => x.create('dummyUrl')).returns(() => videoConverterMock.object);

            ffmpegCheckerMock.setup((x) => x.getPathOfDownloadedDependency()).returns(() => 'ffmpeg path');
            ffmpegCheckerMock.setup((x) => x.isDependencyInSystemPathAsync()).returns(async () => false);
            youtubeDownloaderCheckerMock.setup((x) => x.getPathOfDownloadedDependency()).returns(() => 'yt-dlp path');
            youtubeDownloaderCheckerMock.setup((x) => x.isDependencyInSystemPathAsync()).returns(async () => false);

            fileSystemMock.setup((x) => x.getFileName('/home/user/Music/Vitomu/file2.mp3')).returns(() => 'file2.mp3');

            const convertService: BaseConvertService = createService();
            convertService.lastConvertedFilePath = '/home/user/Music/Vitomu/file1.mp3';
            convertService.lastConvertedFileName = 'file1.mp3';

            // Act
            const returnedConversionResult: ConversionResult = await convertService.convertAsync('dummyUrl');

            // Assert
            expect(returnedConversionResult).toBe(conversionResult);
        });
    });
});
