import * as assert from 'assert';
import { VideoConverterFactory } from '../../app/services/convert/video-converter.factory';
import { Logger } from '../../app/core/logger';
import { Mock } from 'typemoq';
import { YoutubeVideoConverter } from '../../app/services/convert/youtube-video-converter';

describe('VideoConverterFactory', () => {
    describe('constructor', () => {
        it('Should Create a Youtube video converter when a Youtube video url is provided', () => {
            // Arrange
            const loggerMock = Mock.ofType<Logger>();
            const videoConverterFactory: VideoConverterFactory = new VideoConverterFactory(loggerMock.object);

            // Act
            const videoConverter = videoConverterFactory.create('https://www.youtube.com/watch?v=CcS2_V3kCLs');

            // Assert
            assert.ok(videoConverter instanceof YoutubeVideoConverter);
        });
    });
});
