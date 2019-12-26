import * as assert from 'assert';
import { Mock, It, Times } from "typemoq";
import { Desktop } from '../../app/core/desktop';
import { ConvertService } from '../../app/services/convert/convert.service';
import { ClipboardWatcher } from '../../app/core/clipboard-watcher';
import { SnackBarService } from '../../app/services/snack-bar/snack-bar.service';
import { TranslatorService } from '../../app/services/translator/translator.service';
import { FileSystem } from '../../app/core/file-system';
import { ConvertComponent } from '../../app/components/convert/convert.component';
import { Observable, Subject } from 'rxjs';
import { NgZoneMock } from '../mocks/ng-zone.mock';
import { ConvertServiceMock } from '../mocks/convert.service.mock';
import { ClipboardWatcherMock } from '../mocks/clipboard-watcher.mock';
import { Delayer } from '../../app/core/delayer';

describe('ConvertComponent', () => {
    describe('constructor', () => {
        it('Should start with progress mode determinate', () => {
            // Arrange
            let delayer = new Delayer();
            delayer.canDelay = false;
            let ngZoneMock = new NgZoneMock();
            let convertMock = Mock.ofType<ConvertService>();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            // Act
            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
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
            let delayer = new Delayer();
            delayer.canDelay = false;
            let ngZoneMock = new NgZoneMock();
            let convertMock = Mock.ofType<ConvertService>();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            // Act
            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
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
            let delayer = new Delayer();
            delayer.canDelay = false;
            let ngZoneMock = new NgZoneMock();
            let convertMock = Mock.ofType<ConvertService>();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            // Act
            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
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
            let delayer = new Delayer();
            delayer.canDelay = false;
            let ngZoneMock = new NgZoneMock();
            let convertMock = Mock.ofType<ConvertService>();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            // Act
            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
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
            let delayer = new Delayer();
            delayer.canDelay = false;
            let ngZoneMock = new NgZoneMock();
            let convertMock = Mock.ofType<ConvertService>();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            // Act
            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object,
                fileSystemMock.object);

            // Assert
            assert.equal(convertComponent.isConversionSuccessful, false);
        });

        it('Should not start with a download url', () => {
            // Arrange
            let delayer = new Delayer();
            delayer.canDelay = false;
            let ngZoneMock = new NgZoneMock();
            let convertMock = Mock.ofType<ConvertService>();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            // Act
            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
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
            let delayer = new Delayer();
            delayer.canDelay = false;
            let ngZoneMock = new NgZoneMock();
            let convertMock = Mock.ofType<ConvertService>();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            // Act
            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
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
            let delayer = new Delayer();
            delayer.canDelay = false;
            let ngZoneMock = new NgZoneMock();
            let convertMock = Mock.ofType<ConvertService>();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            // Act
            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
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
            let delayer = new Delayer();
            delayer.canDelay = false;
            let ngZoneMock = new NgZoneMock();
            let convertMock = Mock.ofType<ConvertService>();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
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
            let delayer = new Delayer();
            delayer.canDelay = false;
            let ngZoneMock = new NgZoneMock();
            let convertMock = Mock.ofType<ConvertService>();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
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
            let delayer = new Delayer();
            delayer.canDelay = false;
            let ngZoneMock = new NgZoneMock();
            let convertMock = Mock.ofType<ConvertService>();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
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
            let delayer = new Delayer();
            delayer.canDelay = false;
            let ngZoneMock = new NgZoneMock();
            let convertMock = Mock.ofType<ConvertService>();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
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
        it('Should detect when the conversion starts', async () => {
            // Arrange
            let delayer = new Delayer();
            delayer.canDelay = false;
            let ngZoneMock = new NgZoneMock();
            let convertMock = new ConvertServiceMock();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());

            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
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
            let delayer = new Delayer();
            delayer.canDelay = false;
            let ngZoneMock = new NgZoneMock();
            let convertMock = new ConvertServiceMock();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());

            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
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
            let delayer = new Delayer();
            delayer.canDelay = false;
            let ngZoneMock = new NgZoneMock();
            let convertMock = new ConvertServiceMock();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());

            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
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
            let delayer = new Delayer();
            delayer.canDelay = false;
            let ngZoneMock = new NgZoneMock();
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
            convertMock.setup(x => x.conversionFailed$).returns(() => new Observable<void>());
            convertMock.setup(x => x.ffmpegNotFound$).returns(() => new Observable<void>());
            convertMock.setup(x => x.isVideoUrlConvertible(videoUrl)).returns(() => true);

            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
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
            assert.equal(convertComponent.isConversionSuccessful, false);
            assert.equal(convertComponent.downloadUrl, videoUrl);
        });

        it('Should indicate when a conversion was successful', () => {
            // Arrange
            let delayer = new Delayer();
            delayer.canDelay = false;
            let ngZoneMock = new NgZoneMock();
            let convertMock = new ConvertServiceMock();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());

            let filePath: string = "/home/user/Music/Vitomu/My converted file.mp3";
            let fileName: string = "My converted file.mp3";

            fileSystemMock.setup(x => x.getFileName(filePath)).returns(() => fileName);

            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock as any,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object,
                fileSystemMock.object);

            // Act
            delayer.canExecute = false;
            convertComponent.ngOnInit();
            convertMock.onConversionSuccessful(filePath);
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.canConvert, false);
            assert.equal(convertComponent.isConversionSuccessful, true);
            assert.equal(convertComponent.lastConvertedFilePath, filePath);
            assert.equal(convertComponent.lastConvertedFileName, fileName);
        });

        it('Should restore initial state after a successful conversion', () => {
            // Arrange
            let delayer = new Delayer();
            delayer.canDelay = false;
            let ngZoneMock = new NgZoneMock();
            let convertMock = new ConvertServiceMock();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());

            let filePath: string = "/home/user/Music/Vitomu/My converted file.mp3";
            let fileName: string = "My converted file.mp3";

            fileSystemMock.setup(x => x.getFileName(filePath)).returns(() => fileName);

            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock as any,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object,
                fileSystemMock.object);

            // Act
            delayer.canExecute = true;
            convertComponent.ngOnInit();
            convertMock.onConversionSuccessful(filePath);
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.canConvert, false);
            assert.equal(convertComponent.isConversionSuccessful, false);
            assert.equal(convertComponent.lastConvertedFilePath, filePath);
            assert.equal(convertComponent.lastConvertedFileName, fileName);
        });

        it('Should indicate when a conversion was failed', () => {
            // Arrange
            let delayer = new Delayer();
            delayer.canDelay = false;
            let ngZoneMock = new NgZoneMock();
            let convertMock = new ConvertServiceMock();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());

            let filePath: string = "/home/user/Music/Vitomu/My converted file.mp3";
            let fileName: string = "My converted file.mp3";

            fileSystemMock.setup(x => x.getFileName(filePath)).returns(() => fileName);

            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock as any,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object,
                fileSystemMock.object);

            // Act
            delayer.canExecute = false;
            convertComponent.ngOnInit();
            convertMock.onConversionFailed();
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.canConvert, false);
            assert.equal(convertComponent.isConversionFailed, true);
        });

        it('Should restore initial state after a failed conversion', () => {
            // Arrange
            let delayer = new Delayer();
            delayer.canDelay = false;
            let ngZoneMock = new NgZoneMock();
            let convertMock = new ConvertServiceMock();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());

            let filePath: string = "/home/user/Music/Vitomu/My converted file.mp3";
            let fileName: string = "My converted file.mp3";

            fileSystemMock.setup(x => x.getFileName(filePath)).returns(() => fileName);

            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock as any,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object,
                fileSystemMock.object);

            // Act
            delayer.canExecute = true;
            convertComponent.ngOnInit();
            convertMock.onConversionFailed();
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.canConvert, false);
            assert.equal(convertComponent.isConversionFailed, false);
        });

        it('Should indicate when FFmpeg is not found', () => {
            // Arrange
            let delayer = new Delayer();
            delayer.canDelay = false;
            let ngZoneMock = new NgZoneMock();
            let convertMock = new ConvertServiceMock();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());

            let filePath: string = "/home/user/Music/Vitomu/My converted file.mp3";
            let fileName: string = "My converted file.mp3";

            fileSystemMock.setup(x => x.getFileName(filePath)).returns(() => fileName);

            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock as any,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object,
                fileSystemMock.object);

            // Act
            delayer.canExecute = false;
            convertComponent.ngOnInit();
            convertMock.onFFmpegNotFound();
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.canConvert, false);
            assert.equal(convertComponent.isFFmpegNotFound, true);
        });

        it('Should not recover when FFmpeg is not found', () => {
            // Arrange
            let delayer = new Delayer();
            delayer.canDelay = false;
            let ngZoneMock = new NgZoneMock();
            let convertMock = new ConvertServiceMock();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();
            let fileSystemMock = Mock.ofType<FileSystem>();

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());

            let filePath: string = "/home/user/Music/Vitomu/My converted file.mp3";
            let fileName: string = "My converted file.mp3";

            fileSystemMock.setup(x => x.getFileName(filePath)).returns(() => fileName);

            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock as any,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object,
                fileSystemMock.object);

            // Act
            delayer.canExecute = true;
            convertComponent.ngOnInit();
            convertMock.onFFmpegNotFound();
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.canConvert, false);
            assert.equal(convertComponent.isFFmpegNotFound, true);
        });
    });
});