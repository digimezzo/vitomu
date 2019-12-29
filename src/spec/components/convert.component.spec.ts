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
import { ConvertState } from '../../app/services/convert/convert-state';

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

            // Act
            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            // Assert
            assert.equal(convertComponent.progressMode, 'determinate');
        });

        it('Should start waiting for clipboard content', () => {
            // Arrange
            let delayer = new Delayer();
            delayer.canDelay = false;
            let ngZoneMock = new NgZoneMock();
            let convertMock = Mock.ofType<ConvertService>();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();

            // Act
            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            // Assert
            assert.equal(convertComponent.convertState, ConvertState.WaitingForClipboardContent);
        });

        it('Should start without progress', () => {
            // Arrange
            let delayer = new Delayer();
            delayer.canDelay = false;
            let ngZoneMock = new NgZoneMock();
            let convertMock = Mock.ofType<ConvertService>();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();

            // Act
            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            // Assert
            assert.equal(convertComponent.progressPercent, 0);
        });

        it('Should start without download url', () => {
            // Arrange
            let delayer = new Delayer();
            delayer.canDelay = false;
            let ngZoneMock = new NgZoneMock();
            let convertMock = Mock.ofType<ConvertService>();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();

            // Act
            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            // Assert
            assert.equal(convertComponent.downloadUrl, '');
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

            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

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

            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

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

            convertMock.setup(x => x.lastConvertedFilePath).returns(() => '/home/user/Music/Vitomu/Converted file.mp3');

            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            // Act
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

            convertMock.setup(x => x.lastConvertedFilePath).returns(() => '/home/user/Music/Vitomu/Converted file.mp3');

            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            // Act
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

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());

            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock as any,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            // Act
            convertComponent.convertState = ConvertState.WaitingForClipboardContent;
            convertComponent.ngOnInit();
            convertMock.onConvertStateChanged(ConvertState.Converting);
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.convertState, ConvertState.Converting);
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

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());

            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock as any,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            // Act
            convertComponent.progressPercent = 0;
            convertComponent.ngOnInit();
            convertMock.onConvertProgressChanged(40);
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.progressPercent, 40);
        });

        it('Should detect valid clipboard content', async () => {
            // Arrange
            let delayer = new Delayer();
            delayer.canDelay = false;
            let ngZoneMock = new NgZoneMock();
            let convertMock = Mock.ofType<ConvertService>();
            let clipboardWatcherMock = new ClipboardWatcherMock();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();

            let videoUrl: string = "https://music.video.url";

            convertMock.setup(x => x.convertStateChanged$).returns(() => new Observable<ConvertState>());
            convertMock.setup(x => x.convertProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup(x => x.isVideoUrlConvertible(videoUrl)).returns(() => true);

            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock as any,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            // Act
            convertComponent.ngOnInit();
            clipboardWatcherMock.onClipboardContentChanged(videoUrl);
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.convertState, ConvertState.HasValidClipboardContent);
            assert.equal(convertComponent.downloadUrl, "https://music.video.url");
        });

        it('Should ignore invalid clipboard content', async () => {
            // Arrange
            let delayer = new Delayer();
            delayer.canDelay = false;
            let ngZoneMock = new NgZoneMock();
            let convertMock = Mock.ofType<ConvertService>();
            let clipboardWatcherMock = new ClipboardWatcherMock();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();

            let videoUrl: string = "https://music.video.url";

            convertMock.setup(x => x.convertStateChanged$).returns(() => new Observable<ConvertState>());
            convertMock.setup(x => x.convertProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup(x => x.isVideoUrlConvertible(videoUrl)).returns(() => false);

            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock as any,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            // Act
            convertComponent.ngOnInit();
            clipboardWatcherMock.onClipboardContentChanged(videoUrl);
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.convertState, ConvertState.WaitingForClipboardContent);
            assert.equal(convertComponent.downloadUrl, "");
        });

        it('Should use video url if clipboard url is valid', async () => {
            // Arrange
            let delayer = new Delayer();
            delayer.canDelay = false;
            let ngZoneMock = new NgZoneMock();
            let convertMock = Mock.ofType<ConvertService>();
            let clipboardWatcherMock = new ClipboardWatcherMock();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();

            let videoUrl: string = "https://music.video.url";

            convertMock.setup(x => x.convertStateChanged$).returns(() => new Observable<ConvertState>());
            convertMock.setup(x => x.convertProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup(x => x.isVideoUrlConvertible(videoUrl)).returns(() => true);

            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock as any,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            convertComponent.downloadUrl = '';

            // Act
            convertComponent.ngOnInit();
            clipboardWatcherMock.onClipboardContentChanged(videoUrl);
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.downloadUrl, videoUrl);
        });

        it('Should not use video url if clipboard url is invalid', async () => {
            // Arrange
            let delayer = new Delayer();
            delayer.canDelay = false;
            let ngZoneMock = new NgZoneMock();
            let convertMock = Mock.ofType<ConvertService>();
            let clipboardWatcherMock = new ClipboardWatcherMock();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();

            let videoUrl: string = "https://music.video.url";

            convertMock.setup(x => x.convertStateChanged$).returns(() => new Observable<ConvertState>());
            convertMock.setup(x => x.convertProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup(x => x.isVideoUrlConvertible(videoUrl)).returns(() => false);

            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock as any,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            convertComponent.downloadUrl = '';

            // Act
            convertComponent.ngOnInit();
            clipboardWatcherMock.onClipboardContentChanged(videoUrl);
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.downloadUrl, '');
        });

        it('Should detect when a conversion was successful', () => {
            // Arrange
            let delayer = new Delayer();
            delayer.canDelay = false;
            let ngZoneMock = new NgZoneMock();
            let convertMock = new ConvertServiceMock();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());

            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock as any,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            // Act
            delayer.canExecute = false;
            convertComponent.ngOnInit();
            convertMock.onConvertStateChanged(ConvertState.Successful);
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.convertState, ConvertState.Successful);
        });

        it('Should reset state after successful conversion', () => {
            // Arrange
            let delayer = new Delayer();
            delayer.canDelay = false;
            let ngZoneMock = new NgZoneMock();
            let convertMock = new ConvertServiceMock();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());

            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock as any,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            // Act
            delayer.canExecute = true;
            convertComponent.ngOnInit();
            convertMock.onConvertStateChanged(ConvertState.Successful);
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.convertState, ConvertState.WaitingForClipboardContent);
        });

        it('Should reset progress after successful conversion', () => {
            // Arrange
            let delayer = new Delayer();
            delayer.canDelay = false;
            let ngZoneMock = new NgZoneMock();
            let convertMock = new ConvertServiceMock();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());

            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock as any,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            // Act
            delayer.canExecute = true;
            convertComponent.ngOnInit();
            convertMock.onConvertProgressChanged(100);
            convertMock.onConvertStateChanged(ConvertState.Successful);
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.progressPercent, 0);
        });

        it('Should reset download url after successful conversion', () => {
            // Arrange
            let delayer = new Delayer();
            delayer.canDelay = false;
            let ngZoneMock = new NgZoneMock();
            let convertMock = new ConvertServiceMock();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());

            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock as any,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            // Act
            delayer.canExecute = true;
            convertComponent.ngOnInit();
            convertComponent.downloadUrl = "https://music.video.url";
            convertMock.onConvertStateChanged(ConvertState.Successful);
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.downloadUrl, "");
        });

        it('Should detect when a conversion was failed', () => {
             // Arrange
             let delayer = new Delayer();
             delayer.canDelay = false;
             let ngZoneMock = new NgZoneMock();
             let convertMock = new ConvertServiceMock();
             let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
             let snackBarMock = Mock.ofType<SnackBarService>();
             let translatorMock = Mock.ofType<TranslatorService>();
             let desktopMock = Mock.ofType<Desktop>();
 
             clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());
 
             let convertComponent: ConvertComponent = new ConvertComponent(
                 delayer,
                 ngZoneMock as any,
                 convertMock as any,
                 clipboardWatcherMock.object,
                 snackBarMock.object,
                 translatorMock.object,
                 desktopMock.object);
 
             // Act
             delayer.canExecute = false;
             convertComponent.ngOnInit();
             convertMock.onConvertStateChanged(ConvertState.Failed);
             convertComponent.ngOnDestroy();
 
             // Assert
             assert.equal(convertComponent.convertState, ConvertState.Failed);
        });

        it('Should reset state after failed conversion', () => {
            // Arrange
            let delayer = new Delayer();
            delayer.canDelay = false;
            let ngZoneMock = new NgZoneMock();
            let convertMock = new ConvertServiceMock();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());

            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock as any,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            // Act
            delayer.canExecute = true;
            convertComponent.ngOnInit();
            convertMock.onConvertStateChanged(ConvertState.Failed);
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.convertState, ConvertState.WaitingForClipboardContent);
        });

        it('Should reset progress after failed conversion', () => {
            // Arrange
            let delayer = new Delayer();
            delayer.canDelay = false;
            let ngZoneMock = new NgZoneMock();
            let convertMock = new ConvertServiceMock();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());

            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock as any,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            // Act
            delayer.canExecute = true;
            convertComponent.ngOnInit();
            convertMock.onConvertProgressChanged(20);
            convertMock.onConvertStateChanged(ConvertState.Failed);
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.progressPercent, 0);
        });

        it('Should reset download url after failed conversion', () => {
            // Arrange
            let delayer = new Delayer();
            delayer.canDelay = false;
            let ngZoneMock = new NgZoneMock();
            let convertMock = new ConvertServiceMock();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());

            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock as any,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            // Act
            delayer.canExecute = true;
            convertComponent.ngOnInit();
            convertComponent.downloadUrl = "https://music.video.url";
            convertMock.onConvertStateChanged(ConvertState.Failed);
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.downloadUrl, "");
        });

        it('Should detect if FFmpeg is not found', () => {
            // Arrange
            let delayer = new Delayer();
            delayer.canDelay = false;
            let ngZoneMock = new NgZoneMock();
            let convertMock = new ConvertServiceMock();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());

            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock as any,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            // Act
            delayer.canExecute = false;
            convertComponent.ngOnInit();
            convertMock.onConvertStateChanged(ConvertState.FFmpegNotFound);
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.convertState, ConvertState.FFmpegNotFound);
        });

        it('Should not revert to idle state when FFmpeg is not found', () => {
            // Arrange
            let delayer = new Delayer();
            delayer.canDelay = false;
            let ngZoneMock = new NgZoneMock();
            let convertMock = new ConvertServiceMock();
            let clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());

            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock as any,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            // Act
            delayer.canExecute = true;
            convertComponent.ngOnInit();
            convertMock.onConvertStateChanged(ConvertState.FFmpegNotFound);
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.convertState, ConvertState.FFmpegNotFound);
        });

        it('Should handle clipboard content only when waiting for or having valid clipboard content', () => {
            // Arrange
            let delayer = new Delayer();
            delayer.canDelay = false;
            let ngZoneMock = new NgZoneMock();
            let convertMock = Mock.ofType<ConvertService>();
            let clipboardWatcherMock = new ClipboardWatcherMock();
            let snackBarMock = Mock.ofType<SnackBarService>();
            let translatorMock = Mock.ofType<TranslatorService>();
            let desktopMock = Mock.ofType<Desktop>();

            let videoUrl: string = "https://music.video.url";

            convertMock.setup(x => x.convertStateChanged$).returns(() => new Observable<ConvertState>());
            convertMock.setup(x => x.convertProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup(x => x.isVideoUrlConvertible(videoUrl)).returns(() => true);

            let convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock as any,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            // Act
            convertComponent.ngOnInit();

            convertComponent.downloadUrl = '';
            convertComponent.convertState = ConvertState.Converting;
            clipboardWatcherMock.onClipboardContentChanged(videoUrl);
            let convertingDownloadUrl: string = convertComponent.downloadUrl;

            convertComponent.downloadUrl = '';
            convertComponent.convertState = ConvertState.FFmpegNotFound;
            clipboardWatcherMock.onClipboardContentChanged(videoUrl);
            let ffmpegNotFoundDownloadUrl: string = convertComponent.downloadUrl;

            convertComponent.downloadUrl = '';
            convertComponent.convertState = ConvertState.Failed;
            clipboardWatcherMock.onClipboardContentChanged(videoUrl);
            let failedDownloadUrl: string = convertComponent.downloadUrl;

            convertComponent.downloadUrl = 'https://previous.music.video.url';
            convertComponent.convertState = ConvertState.HasValidClipboardContent;
            clipboardWatcherMock.onClipboardContentChanged(videoUrl);
            let hasValidClipboardContentDownloadUrl: string = convertComponent.downloadUrl;

            convertComponent.downloadUrl = '';
            convertComponent.convertState = ConvertState.Successful;
            clipboardWatcherMock.onClipboardContentChanged(videoUrl);
            let successfulDownloadUrl: string = convertComponent.downloadUrl;

            convertComponent.downloadUrl = '';
            convertComponent.convertState = ConvertState.WaitingForClipboardContent;
            clipboardWatcherMock.onClipboardContentChanged(videoUrl);
            let waitingForClipboardContentDownloadUrl: string = convertComponent.downloadUrl;

            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(ffmpegNotFoundDownloadUrl, '');
            assert.equal(convertingDownloadUrl, '');
            assert.equal(failedDownloadUrl, '');
            assert.equal(hasValidClipboardContentDownloadUrl, videoUrl);
            assert.equal(successfulDownloadUrl, '');
            assert.equal(waitingForClipboardContentDownloadUrl, videoUrl);
        });
    });
});