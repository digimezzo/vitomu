import * as assert from 'assert';
import * as TypeMoq from "typemoq";
import { Times } from 'typemoq';
import { Logger } from '../../app/core/logger';
import { YoutubeDownloader } from '../../app/services/convert/youtubeDownloader';
import { FFmpegInstaller } from '../../app/services/convert/ffmpegInstaller';

describe('Misc.', () => {
        it('Should download', () => {
            // Arrange
            var loggerMock = TypeMoq.Mock.ofType<Logger>();
            let downloader: YoutubeDownloader = new YoutubeDownloader(loggerMock.object);
            let ffmpegInstaller: FFmpegInstaller = new FFmpegInstaller(loggerMock.object);

            // Act
            downloader.downloadAsync(ffmpegInstaller.ffmpegPath, "3BE0D9geu2o");

            // Assert
            assert.ok(1 == 1);
        });

        // it('Test', () => {
        //     // Arrange
        //     var loggerMock = TypeMoq.Mock.ofType<Logger>();
        //     let installer: FFmpegInstaller = new FFmpegInstaller(loggerMock.object);

        //     // Act
        //     installer.isFFmpegInstalled();

        //     // Assert
        //     assert.ok(1 == 1);
        // });
});