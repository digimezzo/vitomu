import * as assert from 'assert';
import { Mock, It, Times } from "typemoq";
import { Desktop } from '../../app/core/desktop';
import { ConvertService } from '../../app/services/convert/convert.service';
import { NgZone } from '@angular/core';
import { ClipboardWatcher } from '../../app/core/clipboard-watcher';
import { SnackBarService } from '../../app/services/snack-bar/snack-bar.service';
import { TranslatorService } from '../../app/services/translator/translator.service';
import { FileSystem } from '../../app/core/file-system';
import { ConvertComponent } from '../../app/components/convert/convert.component';

describe('ConvertComponent', () => {
    describe('constructor', () => {
        it('Should start with progress mode determinate', () => {
            // Arrange
            let convertMock = Mock.ofType<ConvertService>();
            let zoneMock = Mock.ofType<NgZone>();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            // Act
            let convertComponent: ConvertComponent = new ConvertComponent(
                convertMock.object,
                zoneMock.object,
                clipboardWatcherMock.object, 
                snackBarMock.object,
                translatorMock.object, 
                desktopMock.object, 
                fileSystemMock.object);

            // Assert
            assert.equal(convertComponent.progressMode, 'determinate');
        });

        it('Should not start with ability to convert', () => {
            // Arrange
            let convertMock = Mock.ofType<ConvertService>();
            let zoneMock = Mock.ofType<NgZone>();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            // Act
            let convertComponent: ConvertComponent = new ConvertComponent(
                convertMock.object,
                zoneMock.object,
                clipboardWatcherMock.object, 
                snackBarMock.object,
                translatorMock.object, 
                desktopMock.object, 
                fileSystemMock.object);

            // Assert
            assert.equal(convertComponent.canConvert, false);
        });

        it('Should not start converting', () => {
            // Arrange
            let convertMock = Mock.ofType<ConvertService>();
            let zoneMock = Mock.ofType<NgZone>();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            // Act
            let convertComponent: ConvertComponent = new ConvertComponent(
                convertMock.object,
                zoneMock.object,
                clipboardWatcherMock.object, 
                snackBarMock.object,
                translatorMock.object, 
                desktopMock.object, 
                fileSystemMock.object);

            // Assert
            assert.equal(convertComponent.isConverting, false);
        });

        it('Should start with no progress', () => {
            // Arrange
            let convertMock = Mock.ofType<ConvertService>();
            let zoneMock = Mock.ofType<NgZone>();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            // Act
            let convertComponent: ConvertComponent = new ConvertComponent(
                convertMock.object,
                zoneMock.object,
                clipboardWatcherMock.object, 
                snackBarMock.object,
                translatorMock.object, 
                desktopMock.object, 
                fileSystemMock.object);

            // Assert
            assert.equal(convertComponent.progressPercent, 0);
        });

        it('Should not start with a successful conversion', () => {
            // Arrange
            let convertMock = Mock.ofType<ConvertService>();
            let zoneMock = Mock.ofType<NgZone>();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            // Act
            let convertComponent: ConvertComponent = new ConvertComponent(
                convertMock.object,
                zoneMock.object,
                clipboardWatcherMock.object, 
                snackBarMock.object,
                translatorMock.object, 
                desktopMock.object, 
                fileSystemMock.object);

            // Assert
            assert.equal(convertComponent.isConvertionSuccessful, false);
        });

        it('Should not start with a download url', () => {
            // Arrange
            let convertMock = Mock.ofType<ConvertService>();
            let zoneMock = Mock.ofType<NgZone>();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            // Act
            let convertComponent: ConvertComponent = new ConvertComponent(
                convertMock.object,
                zoneMock.object,
                clipboardWatcherMock.object, 
                snackBarMock.object,
                translatorMock.object, 
                desktopMock.object, 
                fileSystemMock.object);

            // Assert
            assert.equal(convertComponent.downloadUrl, "");
        });

        it('Should not start with a last converted file path', () => {
            // Arrange
            let convertMock = Mock.ofType<ConvertService>();
            let zoneMock = Mock.ofType<NgZone>();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            // Act
            let convertComponent: ConvertComponent = new ConvertComponent(
                convertMock.object,
                zoneMock.object,
                clipboardWatcherMock.object, 
                snackBarMock.object,
                translatorMock.object, 
                desktopMock.object, 
                fileSystemMock.object);

            // Assert
            assert.equal(convertComponent.lastConvertedFilePath, "");
        });

        it('Should not start with a last converted file name', () => {
            // Arrange
            let convertMock = Mock.ofType<ConvertService>();
            let zoneMock = Mock.ofType<NgZone>();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            // Act
            let convertComponent: ConvertComponent = new ConvertComponent(
                convertMock.object,
                zoneMock.object,
                clipboardWatcherMock.object, 
                snackBarMock.object,
                translatorMock.object, 
                desktopMock.object, 
                fileSystemMock.object);

            // Assert
            assert.equal(convertComponent.lastConvertedFileName, "");
        });
    });
});