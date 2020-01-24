import * as assert from 'assert';
import { Mock } from 'typemoq';
import { FileSystem } from '../../app/core/file-system';
import { Logger } from '../../app/core/logger';
import { Settings } from '../../app/core/settings';
import { ConvertService } from '../../app/services/convert/convert.service';
import { FFmpegChecker } from '../../app/services/convert/ffmpeg-checker';

describe('ConvertService', () => {
    describe('constructor', () => {
        it('Should provide a list of audio formats', () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();

            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');

            // Act
            const convert = new ConvertService(loggerMock.object, ffmpegCheckerMock.object, fileSystemMock.object, settingsMock.object);

            // Assert
            assert.ok(convert.audioFormats.length > 0);
        });

        it('Should provide a list of audio bitrates', () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();

            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');

            // Act
            const convert = new ConvertService(loggerMock.object, ffmpegCheckerMock.object, fileSystemMock.object, settingsMock.object);

            // Assert
            assert.ok(convert.audioBitrates.length > 0);
        });

        it('Should have empty last converted file path', () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();

            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');

            // Act
            const convert = new ConvertService(loggerMock.object, ffmpegCheckerMock.object, fileSystemMock.object, settingsMock.object);

            // Assert
            assert.equal(convert.lastConvertedFilePath, '');
        });

        it('Should have empty last converted file name', () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();

            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');

            // Act
            const convert = new ConvertService(loggerMock.object, ffmpegCheckerMock.object, fileSystemMock.object, settingsMock.object);

            // Assert
            assert.equal(convert.lastConvertedFileName, '');
        });

        it('Should use audio bitrate from the settings', () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();

            settingsMock.setup(x => x.audioBitrate).returns(() => 320);
            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');

            // Act
            const convert = new ConvertService(loggerMock.object, ffmpegCheckerMock.object, fileSystemMock.object, settingsMock.object);

            // Assert
            assert.equal(convert.selectedAudioBitrate, 320);
        });

        it('Should use audio format from the settings', () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();

            settingsMock.setup(x => x.audioFormat).returns(() => 'mp3');
            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');

            // Act
            const convert = new ConvertService(loggerMock.object, ffmpegCheckerMock.object, fileSystemMock.object, settingsMock.object);

            // Assert
            assert.equal(convert.selectedAudioFormat.id, 'mp3');
        });
    });
    describe('isVideoUrlConvertible', () => {
        it('Should consider youtube URLs to be convertible', () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();

            settingsMock.setup(x => x.audioFormat).returns(() => 'mp3');
            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');

            const convert = new ConvertService(loggerMock.object, ffmpegCheckerMock.object, fileSystemMock.object, settingsMock.object);

            // Act
            const isVideoUrlConvertible: boolean = convert.isVideoUrlConvertible('https://www.youtube.com/watch?v=9WQxorFEnG8');

            // Assert
            assert.ok(isVideoUrlConvertible);
        });

        it('Should consider non-youtube URLs to be not convertible', () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const ffmpegCheckerMock = Mock.ofType<FFmpegChecker>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const settingsMock = Mock.ofType<Settings>();

            settingsMock.setup(x => x.audioFormat).returns(() => 'mp3');
            fileSystemMock.setup(x => x.musicDirectory()).returns(() => '/home/user/Music');

            const convert = new ConvertService(loggerMock.object, ffmpegCheckerMock.object, fileSystemMock.object, settingsMock.object);

            // Act
            const isVideoUrlConvertible: boolean = convert.isVideoUrlConvertible('https://www.google.com');

            // Assert
            assert.ok(!isVideoUrlConvertible);
        });
    });
});
