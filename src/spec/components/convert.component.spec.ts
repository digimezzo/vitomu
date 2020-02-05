import * as assert from 'assert';
import { Observable } from 'rxjs';
import { Mock, Times } from 'typemoq';
import { ConvertComponent } from '../../app/components/convert/convert.component';
import { ClipboardWatcher } from '../../app/core/clipboard-watcher';
import { Delayer } from '../../app/core/delayer';
import { Desktop } from '../../app/core/desktop';
import { ConvertState } from '../../app/services/convert/convert-state';
import { ConvertService } from '../../app/services/convert/convert.service';
import { SnackBarService } from '../../app/services/snack-bar/snack-bar.service';
import { TranslatorService } from '../../app/services/translator/translator.service';
import { ClipboardWatcherMock } from '../mocks/clipboard-watcher.mock';
import { ConvertServiceMock } from '../mocks/convert.service.mock';
import { NgZoneMock } from '../mocks/ng-zone.mock';

describe('ConvertComponent', () => {
    describe('constructor', () => {
        it('Should start with progress mode determinate', () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            // Act
            const convertComponent: ConvertComponent = new ConvertComponent(
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
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            // Act
            const convertComponent: ConvertComponent = new ConvertComponent(
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
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            // Act
            const convertComponent: ConvertComponent = new ConvertComponent(
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
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            // Act
            const convertComponent: ConvertComponent = new ConvertComponent(
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

    describe('progressMode', () => {
        it('Should not have a previous progress mode when progress mode was set only once', () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            // Act
            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            // Assert
            assert.equal(convertComponent.previousProgressMode, null);
        });

        it('Should have a previous progress mode when progress mode was set twice', () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            // Act
            convertComponent.progressMode = 'indeterminate';

            // Assert
            assert.equal(convertComponent.previousProgressMode, 'determinate');
        });
    });

    describe('convertState', () => {
        it('Should not have a previous convert state when convert state was set only once', () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            // Act
            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            // Assert
            assert.equal(convertComponent.previousConvertState, null);
        });

        it('Should have a previous convert state when convert state was set twice', () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            // Act
            convertComponent.convertState = ConvertState.HasValidClipboardContent;

            // Assert
            assert.equal(convertComponent.previousConvertState, ConvertState.WaitingForClipboardContent);
        });
    });

    describe('performConvert', () => {
        it('Should perform a conversion for the given download url', () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            const convertComponent: ConvertComponent = new ConvertComponent(
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

        it('Should notify that a conversion is in progress', () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            const convertComponent: ConvertComponent = new ConvertComponent(
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
            assert.equal(convertComponent.convertState, ConvertState.ConversionInProgress);
        });
    });

    describe('showVideoLinkAsync', () => {
        it('Should show a snack bar containing the current video URL and a OK button', async () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            const convertComponent: ConvertComponent = new ConvertComponent(
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
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            convertMock.setup(x => x.lastConvertedFilePath).returns(() => '/home/user/Music/Vitomu/Converted file.mp3');

            const convertComponent: ConvertComponent = new ConvertComponent(
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
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            convertMock.setup(x => x.lastConvertedFilePath).returns(() => '/home/user/Music/Vitomu/Converted file.mp3');

            const convertComponent: ConvertComponent = new ConvertComponent(
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
        it('Should detect conversion progress changes', async () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = new ConvertServiceMock();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());

            const convertComponent: ConvertComponent = new ConvertComponent(
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
            convertMock.onConversionProgressChanged(40);
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.progressPercent, 40);
        });

        it('Should detect valid clipboard content', async () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = new ClipboardWatcherMock();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            const videoUrl: string = 'https://music.video.url';

            convertMock.setup(x => x.conversionSuccessful$).returns(() => new Observable<void>());
            convertMock.setup(x => x.conversionFailed$).returns(() => new Observable<void>());
            convertMock.setup(x => x.conversionProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup(x => x.isVideoUrlConvertible(videoUrl)).returns(() => true);

            const convertComponent: ConvertComponent = new ConvertComponent(
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
        });

        it('Should ignore invalid clipboard content', async () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = new ClipboardWatcherMock();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            const videoUrl: string = 'https://music.video.url';

            convertMock.setup(x => x.conversionSuccessful$).returns(() => new Observable<void>());
            convertMock.setup(x => x.conversionFailed$).returns(() => new Observable<void>());
            convertMock.setup(x => x.conversionProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup(x => x.isVideoUrlConvertible(videoUrl)).returns(() => false);

            const convertComponent: ConvertComponent = new ConvertComponent(
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
        });

        it('Should use video url if clipboard url is valid', async () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = new ClipboardWatcherMock();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            const videoUrl: string = 'https://music.video.url';

            convertMock.setup(x => x.conversionSuccessful$).returns(() => new Observable<void>());
            convertMock.setup(x => x.conversionFailed$).returns(() => new Observable<void>());
            convertMock.setup(x => x.conversionProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup(x => x.isVideoUrlConvertible(videoUrl)).returns(() => true);

            const convertComponent: ConvertComponent = new ConvertComponent(
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
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = new ClipboardWatcherMock();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            const videoUrl: string = 'https://music.video.url';

            convertMock.setup(x => x.conversionSuccessful$).returns(() => new Observable<void>());
            convertMock.setup(x => x.conversionFailed$).returns(() => new Observable<void>());
            convertMock.setup(x => x.conversionProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup(x => x.isVideoUrlConvertible(videoUrl)).returns(() => false);

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock as any,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            // Act
            await convertComponent.ngOnInit();
            clipboardWatcherMock.onClipboardContentChanged(videoUrl);
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.downloadUrl, '');
        });

        it('Should detect when a conversion is successful', async () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = new ConvertServiceMock();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            const convertComponent: ConvertComponent = new ConvertComponent(
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
            convertComponent.convertState = ConvertState.WaitingForClipboardContent;
            convertMock.onConversionSuccessful();
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.convertState, ConvertState.ConversionSuccessful);
        });

        it('Should reset state after successful conversion', () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = new ConvertServiceMock();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());

            const convertComponent: ConvertComponent = new ConvertComponent(
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
            convertComponent.convertState = ConvertState.ConversionInProgress;
            convertMock.onConversionSuccessful();
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.convertState, ConvertState.WaitingForClipboardContent);
        });

        it('Should reset progress after successful conversion', () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = new ConvertServiceMock();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());

            const convertComponent: ConvertComponent = new ConvertComponent(
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
            convertComponent.progressPercent = 100;
            convertMock.onConversionSuccessful();
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.progressPercent, 0);
        });

        it('Should reset download url after successful conversion', () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = new ConvertServiceMock();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());

            const convertComponent: ConvertComponent = new ConvertComponent(
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
            convertComponent.downloadUrl = 'https://dummy.url';
            convertMock.onConversionSuccessful();
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.downloadUrl, '');
        });

        it('Should detect when a conversion was failed', () => {
             // Arrange
             const delayer = new Delayer();
             delayer.canDelay = false;
             const ngZoneMock = new NgZoneMock();
             const convertMock = new ConvertServiceMock();
             const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
             const snackBarMock = Mock.ofType<SnackBarService>();
             const translatorMock = Mock.ofType<TranslatorService>();
             const desktopMock = Mock.ofType<Desktop>();

             const convertComponent: ConvertComponent = new ConvertComponent(
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
             convertComponent.convertState = ConvertState.WaitingForClipboardContent;
             convertMock.onConversionFailed();
             convertComponent.ngOnDestroy();

             // Assert
             assert.equal(convertComponent.convertState, ConvertState.ConversionFailed);
        });

        it('Should reset state after failed conversion', () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = new ConvertServiceMock();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());

            const convertComponent: ConvertComponent = new ConvertComponent(
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
            convertComponent.convertState = ConvertState.ConversionInProgress;
            convertMock.onConversionFailed();
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.convertState, ConvertState.WaitingForClipboardContent);
        });

        it('Should reset progress after failed conversion', () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = new ConvertServiceMock();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());

            const convertComponent: ConvertComponent = new ConvertComponent(
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
            convertComponent.progressPercent = 100;
            convertMock.onConversionFailed();
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.progressPercent, 0);
        });

        it('Should reset download url after failed conversion', () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = new ConvertServiceMock();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());

            const convertComponent: ConvertComponent = new ConvertComponent(
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
            convertComponent.downloadUrl = 'https://dummy.url';
            convertMock.onConversionFailed();
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.downloadUrl, '');
        });

        it('Should handle clipboard content only when waiting for or having valid clipboard content', () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = new ClipboardWatcherMock();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            const videoUrl: string = 'https://music.video.url';

            convertMock.setup(x => x.conversionSuccessful$).returns(() => new Observable<void>());
            convertMock.setup(x => x.conversionFailed$).returns(() => new Observable<void>());
            convertMock.setup(x => x.conversionProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup(x => x.isVideoUrlConvertible(videoUrl)).returns(() => true);

            const convertComponent: ConvertComponent = new ConvertComponent(
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
            convertComponent.convertState = ConvertState.ConversionInProgress;
            clipboardWatcherMock.onClipboardContentChanged(videoUrl);
            const convertingDownloadUrl: string = convertComponent.downloadUrl;

            convertComponent.downloadUrl = '';
            convertComponent.convertState = ConvertState.ConversionFailed;
            clipboardWatcherMock.onClipboardContentChanged(videoUrl);
            const failedDownloadUrl: string = convertComponent.downloadUrl;

            convertComponent.downloadUrl = 'https://previous.music.video.url';
            convertComponent.convertState = ConvertState.HasValidClipboardContent;
            clipboardWatcherMock.onClipboardContentChanged(videoUrl);
            const hasValidClipboardContentDownloadUrl: string = convertComponent.downloadUrl;

            convertComponent.downloadUrl = '';
            convertComponent.convertState = ConvertState.ConversionSuccessful;
            clipboardWatcherMock.onClipboardContentChanged(videoUrl);
            const successfulDownloadUrl: string = convertComponent.downloadUrl;

            convertComponent.downloadUrl = '';
            convertComponent.convertState = ConvertState.WaitingForClipboardContent;
            clipboardWatcherMock.onClipboardContentChanged(videoUrl);
            const waitingForClipboardContentDownloadUrl: string = convertComponent.downloadUrl;

            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertingDownloadUrl, '');
            assert.equal(failedDownloadUrl, '');
            assert.equal(hasValidClipboardContentDownloadUrl, videoUrl);
            assert.equal(successfulDownloadUrl, '');
            assert.equal(waitingForClipboardContentDownloadUrl, videoUrl);
        });

        it('Should check if prerequisites are OK', async () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = new ClipboardWatcherMock();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            convertMock.setup(x => x.conversionSuccessful$).returns(() => new Observable<void>());
            convertMock.setup(x => x.conversionFailed$).returns(() => new Observable<void>());
            convertMock.setup(x => x.conversionProgressChanged$).returns(() => new Observable<number>());

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock as any,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            // Act
            await convertComponent.ngOnInit();
            convertComponent.ngOnDestroy();

            // Assert
            convertMock.verify(x => x.arePrerequisitesOKAsync(), Times.atLeastOnce());
        });

        it('Should use progress mode determinate if prerequisites are OK', async () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());
            convertMock.setup(x => x.conversionSuccessful$).returns(() => new Observable<void>());
            convertMock.setup(x => x.conversionFailed$).returns(() => new Observable<void>());
            convertMock.setup(x => x.conversionProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup(x => x.arePrerequisitesOKAsync()).returns(() => Promise.resolve(true));

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            // Act
            await convertComponent.ngOnInit();
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.progressMode, 'determinate');
        });

        it('Should be waiting for clipboard content if prerequisites are OK', async () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());
            convertMock.setup(x => x.conversionSuccessful$).returns(() => new Observable<void>());
            convertMock.setup(x => x.conversionFailed$).returns(() => new Observable<void>());
            convertMock.setup(x => x.conversionProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup(x => x.arePrerequisitesOKAsync()).returns(() => Promise.resolve(true));

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            // Act
            await convertComponent.ngOnInit();
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.convertState, ConvertState.WaitingForClipboardContent);
        });

        it('Should have no progress if prerequisites are OK', async () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());
            convertMock.setup(x => x.conversionSuccessful$).returns(() => new Observable<void>());
            convertMock.setup(x => x.conversionFailed$).returns(() => new Observable<void>());
            convertMock.setup(x => x.conversionProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup(x => x.arePrerequisitesOKAsync()).returns(() => Promise.resolve(true));

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            // Act
            await convertComponent.ngOnInit();
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.progressPercent, 0);
        });

        it('Should have no download url if prerequisites are OK', async () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());
            convertMock.setup(x => x.conversionSuccessful$).returns(() => new Observable<void>());
            convertMock.setup(x => x.conversionFailed$).returns(() => new Observable<void>());
            convertMock.setup(x => x.conversionProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup(x => x.arePrerequisitesOKAsync()).returns(() => Promise.resolve(true));

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            // Act
            await convertComponent.ngOnInit();
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.downloadUrl, '');
        });

        it('Should fix prerequisites if prerequisites are not OK', async () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());
            convertMock.setup(x => x.conversionSuccessful$).returns(() => new Observable<void>());
            convertMock.setup(x => x.conversionFailed$).returns(() => new Observable<void>());
            convertMock.setup(x => x.conversionProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup(x => x.arePrerequisitesOKAsync()).returns(() => Promise.resolve(false));

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            // Act
            await convertComponent.ngOnInit();
            convertComponent.ngOnDestroy();

            // Assert
            convertMock.verify(x => x.fixPrerequisites(), Times.exactly(1));
        });

        it('Should not fix prerequisites if prerequisites are OK', async () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());
            convertMock.setup(x => x.conversionSuccessful$).returns(() => new Observable<void>());
            convertMock.setup(x => x.conversionFailed$).returns(() => new Observable<void>());
            convertMock.setup(x => x.conversionProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup(x => x.arePrerequisitesOKAsync()).returns(() => Promise.resolve(true));

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            // Act
            await convertComponent.ngOnInit();
            convertComponent.ngOnDestroy();

            // Assert
            convertMock.verify(x => x.fixPrerequisites(), Times.never());
        });

        it('Should notify that prerequisites are being fixed if prerequisites are not OK', async () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());
            convertMock.setup(x => x.conversionSuccessful$).returns(() => new Observable<void>());
            convertMock.setup(x => x.conversionFailed$).returns(() => new Observable<void>());
            convertMock.setup(x => x.conversionProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup(x => x.arePrerequisitesOKAsync()).returns(() => Promise.resolve(false));

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            // Act
            await convertComponent.ngOnInit();
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.previousConvertState, ConvertState.FixingPrerequisites);
        });

        it('Should set progress mode to indeterminate when fixing prerequisites', async () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());
            convertMock.setup(x => x.conversionSuccessful$).returns(() => new Observable<void>());
            convertMock.setup(x => x.conversionFailed$).returns(() => new Observable<void>());
            convertMock.setup(x => x.conversionProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup(x => x.arePrerequisitesOKAsync()).returns(() => Promise.resolve(false));

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            // Act
            await convertComponent.ngOnInit();
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.previousProgressMode, 'indeterminate');
        });

        it('Should reset progress mode after fixing prerequisites', async () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());
            convertMock.setup(x => x.conversionSuccessful$).returns(() => new Observable<void>());
            convertMock.setup(x => x.conversionFailed$).returns(() => new Observable<void>());
            convertMock.setup(x => x.conversionProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup(x => x.arePrerequisitesOKAsync()).returns(() => Promise.resolve(false));

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            // Act
            await convertComponent.ngOnInit();
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.progressMode, 'determinate');
        });

        it('Should check for prerequisites only once if prerequisites are OK', async () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = new ClipboardWatcherMock();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            convertMock.setup(x => x.conversionSuccessful$).returns(() => new Observable<void>());
            convertMock.setup(x => x.conversionFailed$).returns(() => new Observable<void>());
            convertMock.setup(x => x.conversionProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup(x => x.arePrerequisitesOKAsync()).returns(() => Promise.resolve(true));

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock as any,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            // Act
            await convertComponent.ngOnInit();
            convertComponent.ngOnDestroy();

            // Assert
            convertMock.verify(x => x.arePrerequisitesOKAsync(), Times.exactly(1));
        });

        it('Should check for prerequisites 2 times if prerequisites are not OK', async () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = new ClipboardWatcherMock();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            convertMock.setup(x => x.conversionSuccessful$).returns(() => new Observable<void>());
            convertMock.setup(x => x.conversionFailed$).returns(() => new Observable<void>());
            convertMock.setup(x => x.conversionProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup(x => x.arePrerequisitesOKAsync()).returns(() => Promise.resolve(false));

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock as any,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            // Act
            await convertComponent.ngOnInit();
            convertComponent.ngOnDestroy();

            // Assert
            convertMock.verify(x => x.arePrerequisitesOKAsync(), Times.exactly(2));
        });

        it('Should notify that prerequisites are not OK if prerequisites are not OK twice', async () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());
            convertMock.setup(x => x.conversionSuccessful$).returns(() => new Observable<void>());
            convertMock.setup(x => x.conversionFailed$).returns(() => new Observable<void>());
            convertMock.setup(x => x.conversionProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup(x => x.arePrerequisitesOKAsync()).returns(() => Promise.resolve(false));
            convertMock.setup(x => x.arePrerequisitesOKAsync()).returns(() => Promise.resolve(false));

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            // Act
            await convertComponent.ngOnInit();
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.convertState, ConvertState.PrerequisitesNotOK);
        });

        it('Should be waiting for clipboard content if prerequisites are not OK on first check but OK on second check', async () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            clipboardWatcherMock.setup(x => x.clipboardContentChanged$).returns(() => new Observable<string>());
            convertMock.setup(x => x.conversionSuccessful$).returns(() => new Observable<void>());
            convertMock.setup(x => x.conversionFailed$).returns(() => new Observable<void>());
            convertMock.setup(x => x.conversionProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup(x => x.arePrerequisitesOKAsync()).returns(() => Promise.resolve(false));
            convertMock.setup(x => x.arePrerequisitesOKAsync()).returns(() => Promise.resolve(true));

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object);

            // Act
            await convertComponent.ngOnInit();
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.convertState, ConvertState.WaitingForClipboardContent);
        });
    });
});
