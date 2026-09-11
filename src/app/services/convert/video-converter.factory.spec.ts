import * as assert from 'assert';
import { Mock } from 'typemoq';
import { Environment } from '../../common/io/environment';
import { FileSystem } from '../../common/io/file-system';
import { Logger } from '../../common/logger';
import { LocalVideoConverter } from './local-video-converter';
import { VideoConverterFactory } from './video-converter.factory';
import { YoutubeVideoConverter } from './youtube-video-converter';

describe('VideoConverterFactory', () => {
    describe('constructor', () => {
        it('Should Create a Youtube video converter when a Youtube video url is provided', () => {
            // Arrange
            const environmentMock = Mock.ofType<Environment>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const loggerMock = Mock.ofType<Logger>();
            const videoConverterFactory: VideoConverterFactory = new VideoConverterFactory(
                environmentMock.object,
                fileSystemMock.object,
                loggerMock.object
            );

            // Act
            const videoConverter = videoConverterFactory.create('https://www.youtube.com/watch?v=CcS2_V3kCLs');

            // Assert
            assert.ok(videoConverter instanceof YoutubeVideoConverter);
        });

        it('Should create a local video converter when an existing file path is provided', () => {
            // Arrange
            const environmentMock = Mock.ofType<Environment>();
            const fileSystemMock = Mock.ofType<FileSystem>();
            const loggerMock = Mock.ofType<Logger>();
            fileSystemMock.setup((x) => x.isFile('/home/user/Videos/video.mp4')).returns(() => true);
            const videoConverterFactory: VideoConverterFactory = new VideoConverterFactory(
                environmentMock.object,
                fileSystemMock.object,
                loggerMock.object
            );

            // Act
            const videoConverter = videoConverterFactory.create(' /home/user/Videos/video.mp4 ');

            // Assert
            assert.ok(videoConverter instanceof LocalVideoConverter);
        });
    });
});
