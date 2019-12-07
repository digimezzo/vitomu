import * as assert from 'assert';
import { Mock, It, Times } from "typemoq";
import { Desktop } from '../../app/core/desktop';
import { ConvertService } from '../../app/services/convert/convert.service';
import { ChangeDetectorRef } from '@angular/core';
import { ClipboardWatcher } from '../../app/core/clipboard-watcher';
import { SnackBarService } from '../../app/services/snack-bar/snack-bar.service';
import { TranslatorService } from '../../app/services/translator/translator.service';
import { FileSystem } from '../../app/core/file-system';
import { ConvertComponent } from '../../app/components/convert/convert.component';
import { Observable, of, Subject } from 'rxjs';

describe('ConvertComponent', () => {
    describe('constructor', () => {
        it('Should start with progress mode determinate', () => {
            // Arrange
            let refMock = Mock.ofType<ChangeDetectorRef>();
            let convertMock = Mock.ofType<ConvertService>();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            // Act
            let convertComponent: ConvertComponent = new ConvertComponent(
                refMock.object,
                convertMock.object,
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
            let refMock = Mock.ofType<ChangeDetectorRef>();
            let convertMock = Mock.ofType<ConvertService>();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            // Act
            let convertComponent: ConvertComponent = new ConvertComponent(
                refMock.object,
                convertMock.object,
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
            let refMock = Mock.ofType<ChangeDetectorRef>();
            let convertMock = Mock.ofType<ConvertService>();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            // Act
            let convertComponent: ConvertComponent = new ConvertComponent(
                refMock.object,
                convertMock.object,
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
            let refMock = Mock.ofType<ChangeDetectorRef>();
            let convertMock = Mock.ofType<ConvertService>();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            // Act
            let convertComponent: ConvertComponent = new ConvertComponent(
                refMock.object,
                convertMock.object,
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
            let refMock = Mock.ofType<ChangeDetectorRef>();
            let convertMock = Mock.ofType<ConvertService>();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            // Act
            let convertComponent: ConvertComponent = new ConvertComponent(
                refMock.object,
                convertMock.object,
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
            let refMock = Mock.ofType<ChangeDetectorRef>();
            let convertMock = Mock.ofType<ConvertService>();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            // Act
            let convertComponent: ConvertComponent = new ConvertComponent(
                refMock.object,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object,
                fileSystemMock.object);

            // Assert
            assert.equal(convertComponent.downloadUrl, '');
        });

        it('Should not start with a last converted file path', () => {
            // Arrange
            let refMock = Mock.ofType<ChangeDetectorRef>();
            let convertMock = Mock.ofType<ConvertService>();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            // Act
            let convertComponent: ConvertComponent = new ConvertComponent(
                refMock.object,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object,
                fileSystemMock.object);

            // Assert
            assert.equal(convertComponent.lastConvertedFilePath, '');
        });

        it('Should not start with a last converted file name', () => {
            // Arrange
            let refMock = Mock.ofType<ChangeDetectorRef>();
            let convertMock = Mock.ofType<ConvertService>();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            // Act
            let convertComponent: ConvertComponent = new ConvertComponent(
                refMock.object,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object,
                fileSystemMock.object);

            // Assert
            assert.equal(convertComponent.lastConvertedFileName, "");
        });
    });

    describe('performConvert', () => {
        it('Should perform a conversion for the given download url', () => {
            // Arrange
            let refMock = Mock.ofType<ChangeDetectorRef>();
            let convertMock = Mock.ofType<ConvertService>();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            let convertComponent: ConvertComponent = new ConvertComponent(
                refMock.object,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object,
                fileSystemMock.object);

            // Act
            convertComponent.downloadUrl = 'https://my.url.is.glorious';
            convertComponent.performConvert();

            // Assert
            convertMock.verify(x => x.convertAsync('https://my.url.is.glorious'), Times.exactly(1));
        });
    });

    describe('showVideoLinkAsync', () => {
        it('Should show a snack bar containing the current video URL and a OK button', async () => {
            // Arrange
            let refMock = Mock.ofType<ChangeDetectorRef>();
            let convertMock = Mock.ofType<ConvertService>();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            let convertComponent: ConvertComponent = new ConvertComponent(
                refMock.object,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object,
                fileSystemMock.object);

            translatorMock.setup(x => x.getAsync('Buttons.Ok')).returns(() => Promise.resolve('OK'));

            // Act
            convertComponent.downloadUrl = 'https://my.url.is.glorious';
            await convertComponent.showVideoLinkAsync();

            // Assert
            snackBarMock.verify(x => x.showActionSnackBar('https://my.url.is.glorious', 'OK'), Times.exactly(1));
        });
    });

    describe('viewInFolder', () => {
        it('Should show the converted file in its containing folder', async () => {
            // Arrange
            let refMock = Mock.ofType<ChangeDetectorRef>();
            let convertMock = Mock.ofType<ConvertService>();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            let convertComponent: ConvertComponent = new ConvertComponent(
                refMock.object,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object,
                fileSystemMock.object);

            // Act
            convertComponent.lastConvertedFilePath = '/home/user/Music/Vitomu/Converted file.mp3';
            convertComponent.viewInFolder();

            // Assert
            desktopMock.verify(x => x.showInFolder('/home/user/Music/Vitomu/Converted file.mp3'), Times.exactly(1));
        });
    });

    describe('play', () => {
        it('Should play the converted file in the default application', async () => {
            // Arrange
            let refMock = Mock.ofType<ChangeDetectorRef>();
            let convertMock = Mock.ofType<ConvertService>();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            let convertComponent: ConvertComponent = new ConvertComponent(
                refMock.object,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object,
                fileSystemMock.object);

            // Act
            convertComponent.lastConvertedFilePath = '/home/user/Music/Vitomu/Converted file.mp3';
            convertComponent.play();

            // Assert
            desktopMock.verify(x => x.openInDefaultApplication('/home/user/Music/Vitomu/Converted file.mp3'), Times.exactly(1));
        });
    });

    describe('ngOnInit', () => {
        class ConvertServiceMock {
            private convertStatusChanged = new Subject<boolean>();
            public convertStatusChanged$: Observable<boolean> = this.convertStatusChanged.asObservable();

            private convertProgressChanged = new Subject<number>();
            public convertProgressChanged$: Observable<number> = this.convertProgressChanged.asObservable();
        
            private conversionSuccessful = new Subject<string>();
            public conversionSuccessful$: Observable<string> = this.conversionSuccessful.asObservable();

            onConvertStatusChanged(isConverting: boolean) {
                this.convertStatusChanged.next(isConverting);
            }

            public onConvertProgressChanged(progressPercent: number): void{
                this.convertProgressChanged.next(progressPercent);
            }
        
            public onConvertionSuccessful(fileName: string): void{
                this.conversionSuccessful.next(fileName);
            }
        }

        class ClipboardWatcherMock{
            private clipboardContentChanged = new Subject<string>();
            public clipboardContentChanged$: Observable<string> = this.clipboardContentChanged.asObservable();

            public onClipboardContentChanged(clipBoardText: string): void{
                this.clipboardContentChanged.next(clipBoardText);
            }
        }

        it('Should detect when the conversion starts', async () => {
            // Arrange
            let refMock = Mock.ofType<ChangeDetectorRef>();
            let convertMock = new ConvertServiceMock();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());

            let convertComponent: ConvertComponent = new ConvertComponent(
                refMock.object,
                convertMock as any,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object,
                fileSystemMock.object);

            // Act
            convertComponent.isConverting = false;
            convertComponent.ngOnInit();
            convertMock.onConvertStatusChanged(true);
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.isConverting, true);
        });

        it('Should detect when the conversion stops', async () => {
            // Arrange
            let refMock = Mock.ofType<ChangeDetectorRef>();
            let convertMock = new ConvertServiceMock();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());

            let convertComponent: ConvertComponent = new ConvertComponent(
                refMock.object,
                convertMock as any,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object,
                fileSystemMock.object);

            // Act
            convertComponent.isConverting = true;
            convertComponent.ngOnInit();
            convertMock.onConvertStatusChanged(false);
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.isConverting, false);
        });

        it('Should detect conversion progress changes', async () => {
            // Arrange
            let refMock = Mock.ofType<ChangeDetectorRef>();
            let convertMock = new ConvertServiceMock();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());

            let convertComponent: ConvertComponent = new ConvertComponent(
                refMock.object,
                convertMock as any,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object,
                fileSystemMock.object);

            // Act
            convertComponent.progressPercent = 0;
            convertComponent.ngOnInit();
            convertMock.onConvertProgressChanged(40);
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.progressPercent, 40);
        });

        it('Should detect clipboard content changes', async () => {
            // Arrange
            let refMock = Mock.ofType<ChangeDetectorRef>();
            let convertMock = Mock.ofType<ConvertService>();
            let clipboardWatcherMock = new ClipboardWatcherMock();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            let videoUrl: string = "https://music.video.url";

            convertMock.setup(x => x.convertStatusChanged$).returns(() => new Observable<boolean>());
            convertMock.setup(x => x.convertProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup(x => x.conversionSuccessful$).returns(() => new Observable<string>());
            convertMock.setup(x => x.isVideoUrlConvertible(videoUrl)).returns(() => true);

            let convertComponent: ConvertComponent = new ConvertComponent(
                refMock.object,
                convertMock.object,
                clipboardWatcherMock as any,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object,
                fileSystemMock.object);

            // Act
            convertComponent.ngOnInit();
            clipboardWatcherMock.onClipboardContentChanged(videoUrl);
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.canConvert, true);
            assert.equal(convertComponent.isConvertionSuccessful, false);
            assert.equal(convertComponent.downloadUrl, videoUrl);
        });
    });
});