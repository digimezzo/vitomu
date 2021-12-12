import * as assert from 'assert';
import { Mock } from 'typemoq';
import { Environment } from '../../common/io/environment';
import { Logger } from '../../common/logger';
import { VideoConverterFactory } from './video-converter.factory';
import { YoutubeVideoConverter } from './youtube-video-converter';

describe('VideoConverterFactory', () => {
    describe('constructor', () => {
        it('Should Create a Youtube video converter when a Youtube video url is provided', () => {
            // Arrange
            const environmentMock = Mock.ofType<Environment>();
            const loggerMock = Mock.ofType<Logger>();
            const videoConverterFactory: VideoConverterFactory = new VideoConverterFactory(environmentMock.object, loggerMock.object);

            // Act
            const videoConverter = videoConverterFactory.create('https://www.youtube.com/watch?v=CcS2_V3kCLs');

            // Assert
            assert.ok(videoConverter instanceof YoutubeVideoConverter);
        });
    });
});
