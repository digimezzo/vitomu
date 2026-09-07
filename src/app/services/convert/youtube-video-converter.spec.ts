import * as assert from 'assert';
import { Mock } from 'typemoq';
import { Environment } from '../../common/io/environment';
import { Logger } from '../../common/logger';
import { YoutubeVideoConverter } from './youtube-video-converter';

describe('YoutubeVideoConverter', () => {
    describe('processOutputLine', () => {
        it('Should report progress from Vitomu progress markers', () => {
            // Arrange
            const environmentMock = Mock.ofType<Environment>();
            const loggerMock = Mock.ofType<Logger>();
            const converter: any = new YoutubeVideoConverter(environmentMock.object, loggerMock.object);
            let reportedProgressPercent: number = 0;

            // Act
            converter.processOutputLine('__VITOMU_PROGRESS__ 10.0%', (progressPercent: number) => {
                reportedProgressPercent = progressPercent;
            });

            // Assert
            assert.equal(reportedProgressPercent, 10);
        });

        it('Should request an indeterminate ring during post-processing', () => {
            // Arrange
            const environmentMock = Mock.ofType<Environment>();
            const loggerMock = Mock.ofType<Logger>();
            const converter: any = new YoutubeVideoConverter(environmentMock.object, loggerMock.object);
            let reportedProgressPercent: number = 0;

            // Act
            converter.processOutputLine('__VITOMU_POSTPROCESS__', (progressPercent: number) => {
                reportedProgressPercent = progressPercent;
            });

            // Assert
            assert.equal(reportedProgressPercent, -1);
        });
    });

    describe('getProgressPercentFromYoutubeDownloaderProgress', () => {
        it('Should parse decimal Youtube downloader progress', () => {
            // Arrange
            const environmentMock = Mock.ofType<Environment>();
            const loggerMock = Mock.ofType<Logger>();
            const converter: any = new YoutubeVideoConverter(environmentMock.object, loggerMock.object);

            // Act
            const progressPercent: number = converter.getProgressPercentFromYoutubeDownloaderProgress(
                '[download]  10.0% of 4.00MiB at 2.00MiB/s ETA 00:02'
            );

            // Assert
            assert.equal(progressPercent, 10);
        });

        it('Should clamp Youtube downloader progress to 100 percent', () => {
            // Arrange
            const environmentMock = Mock.ofType<Environment>();
            const loggerMock = Mock.ofType<Logger>();
            const converter: any = new YoutubeVideoConverter(environmentMock.object, loggerMock.object);

            // Act
            const progressPercent: number = converter.getProgressPercentFromYoutubeDownloaderProgress(
                '[download]  1000.0% of 4.00MiB at 2.00MiB/s ETA 00:00'
            );

            // Assert
            assert.equal(progressPercent, 100);
        });
    });
});