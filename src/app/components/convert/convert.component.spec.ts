import * as assert from 'assert';
import { Observable } from 'rxjs';
import { Mock, Times } from 'typemoq';
import { ConvertState } from '../../app/services/convert/convert-state';
import { ClipboardWatcher } from '../../core/clipboard-watcher';
import { ClipboardWatcherMock } from '../../core/clipboard-watcher.mock';
import { Delayer } from '../../core/delayer';
import { Desktop } from '../../core/desktop';
import { ConversionResult } from '../../services/convert/conversion-result';
import { ConvertService } from '../../services/convert/convert.service';
import { ConvertServiceMock } from '../../services/convert/convert.service.mock';
import { SnackBarService } from '../../services/snack-bar/snack-bar.service';
import { TranslatorService } from '../../services/translator/translator.service';
import { ConvertComponent } from './convert.component';
import { NgZoneMock } from './ng-zone.mock';

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
                desktopMock.object
            );

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
                desktopMock.object
            );

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
                desktopMock.object
            );

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
                desktopMock.object
            );

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
                desktopMock.object
            );

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
                desktopMock.object
            );

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
                desktopMock.object
            );

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
                desktopMock.object
            );

            // Act
            convertComponent.convertState = ConvertState.HasValidClipboardContent;

            // Assert
            assert.equal(convertComponent.previousConvertState, ConvertState.WaitingForClipboardContent);
        });
    });

    describe('performConvertAsync', () => {
        it('Should notify that a conversion is in progress', async () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            delayer.canExecute = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            convertMock
                .setup((x) => x.convertAsync('https://my.url.is.glorious'))
                .returns(() => Promise.resolve(new ConversionResult(true, 'dummy')));

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object
            );

            // Act
            convertComponent.downloadUrl = 'https://my.url.is.glorious';
            await convertComponent.performConvertAsync();

            // Assert
            assert.equal(convertComponent.previousConvertState, ConvertState.ConversionInProgress);
        });

        it('Should perform a conversion for the given download url', async () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            convertMock
                .setup((x) => x.convertAsync('https://my.url.is.glorious'))
                .returns(() => Promise.resolve(new ConversionResult(true, 'dummy')));

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object
            );

            // Act
            convertComponent.downloadUrl = 'https://my.url.is.glorious';
            await convertComponent.performConvertAsync();

            // Assert
            convertMock.verify((x) => x.convertAsync('https://my.url.is.glorious'), Times.exactly(1));
        });

        it('Should detect when a conversion was successful', async () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            delayer.canExecute = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            convertMock
                .setup((x) => x.convertAsync('https://my.url.is.glorious'))
                .returns(() => Promise.resolve(new ConversionResult(true, 'dummy')));

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object
            );

            // Act
            convertComponent.downloadUrl = 'https://my.url.is.glorious';
            await convertComponent.performConvertAsync();

            // Assert
            assert.equal(convertComponent.convertState, ConvertState.ConversionSuccessful);
        });

        it('Should reset state after successful conversion', async () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            clipboardWatcherMock.setup((x) => x.clipboardContentChanged$).returns(() => new Observable<string>());
            convertMock
                .setup((x) => x.convertAsync('https://my.url.is.glorious'))
                .returns(() => Promise.resolve(new ConversionResult(true, 'dummy')));

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object
            );

            // Act
            delayer.canExecute = true;
            convertComponent.ngOnInit();
            convertComponent.downloadUrl = 'https://my.url.is.glorious';
            await convertComponent.performConvertAsync();
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.convertState, ConvertState.WaitingForClipboardContent);
        });

        it('Should reset progress after successful conversion', async () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            clipboardWatcherMock.setup((x) => x.clipboardContentChanged$).returns(() => new Observable<string>());
            convertMock
                .setup((x) => x.convertAsync('https://my.url.is.glorious'))
                .returns(() => Promise.resolve(new ConversionResult(true, 'dummy')));

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object
            );

            // Act
            delayer.canExecute = true;
            convertComponent.ngOnInit();
            convertComponent.downloadUrl = 'https://my.url.is.glorious';
            await convertComponent.performConvertAsync();
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.progressPercent, 0);
        });

        it('Should reset download url after successful conversion', async () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            clipboardWatcherMock.setup((x) => x.clipboardContentChanged$).returns(() => new Observable<string>());
            convertMock
                .setup((x) => x.convertAsync('https://my.url.is.glorious'))
                .returns(() => Promise.resolve(new ConversionResult(true, 'dummy')));

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object
            );

            // Act
            delayer.canExecute = true;
            convertComponent.ngOnInit();
            convertComponent.downloadUrl = 'https://my.url.is.glorious';
            await convertComponent.performConvertAsync();
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.downloadUrl, '');
        });

        it('Should detect when a conversion has failed', async () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            delayer.canExecute = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            convertMock
                .setup((x) => x.convertAsync('https://my.url.is.glorious'))
                .returns(() => Promise.resolve(new ConversionResult(false, '')));

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object
            );

            // Act
            convertComponent.downloadUrl = 'https://my.url.is.glorious';
            await convertComponent.performConvertAsync();

            // Assert
            assert.equal(convertComponent.convertState, ConvertState.ConversionFailed);
        });

        it('Should reset state after failed conversion', async () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            clipboardWatcherMock.setup((x) => x.clipboardContentChanged$).returns(() => new Observable<string>());
            convertMock
                .setup((x) => x.convertAsync('https://my.url.is.glorious'))
                .returns(() => Promise.resolve(new ConversionResult(false, '')));

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object
            );

            // Act
            delayer.canExecute = true;
            convertComponent.ngOnInit();
            convertComponent.downloadUrl = 'https://my.url.is.glorious';
            await convertComponent.performConvertAsync();
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.convertState, ConvertState.WaitingForClipboardContent);
        });

        it('Should reset progress after failed conversion', async () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            clipboardWatcherMock.setup((x) => x.clipboardContentChanged$).returns(() => new Observable<string>());
            convertMock
                .setup((x) => x.convertAsync('https://my.url.is.glorious'))
                .returns(() => Promise.resolve(new ConversionResult(false, '')));

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object
            );

            // Act
            delayer.canExecute = true;
            convertComponent.ngOnInit();
            convertComponent.downloadUrl = 'https://my.url.is.glorious';
            await convertComponent.performConvertAsync();
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.progressPercent, 0);
        });

        it('Should reset download url after failed conversion', async () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = Mock.ofType<ConvertService>();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            clipboardWatcherMock.setup((x) => x.clipboardContentChanged$).returns(() => new Observable<string>());
            convertMock
                .setup((x) => x.convertAsync('https://my.url.is.glorious'))
                .returns(() => Promise.resolve(new ConversionResult(false, '')));

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object
            );

            // Act
            delayer.canExecute = true;
            convertComponent.ngOnInit();
            convertComponent.downloadUrl = 'https://my.url.is.glorious';
            await convertComponent.performConvertAsync();
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.downloadUrl, '');
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
                desktopMock.object
            );

            translatorMock.setup((x) => x.getAsync('Buttons.Ok')).returns(() => Promise.resolve('OK'));

            // Act
            convertComponent.downloadUrl = 'https://my.url.is.glorious';
            await convertComponent.showVideoLinkAsync();

            // Assert
            snackBarMock.verify((x) => x.showActionSnackBar('https://my.url.is.glorious', 'OK'), Times.exactly(1));
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

            convertMock.setup((x) => x.lastConvertedFilePath).returns(() => '/home/user/Music/Vitomu/Converted file.mp3');

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object
            );

            // Act
            convertComponent.viewInFolder();

            // Assert
            desktopMock.verify((x) => x.showInFolder('/home/user/Music/Vitomu/Converted file.mp3'), Times.exactly(1));
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

            convertMock.setup((x) => x.lastConvertedFilePath).returns(() => '/home/user/Music/Vitomu/Converted file.mp3');

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object
            );

            // Act
            convertComponent.play();

            // Assert
            desktopMock.verify((x) => x.openInDefaultApplication('/home/user/Music/Vitomu/Converted file.mp3'), Times.exactly(1));
        });
    });

    describe('ngOnDestroy', () => {
        it('Should not detect conversion progress changes', async () => {
            // Arrange
            const delayer = new Delayer();
            delayer.canDelay = false;
            const ngZoneMock = new NgZoneMock();
            const convertMock = new ConvertServiceMock();
            const clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
            const snackBarMock = Mock.ofType<SnackBarService>();
            const translatorMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            clipboardWatcherMock.setup((x) => x.clipboardContentChanged$).returns(() => new Observable<string>());

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock as any,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object
            );

            // Act
            convertComponent.progressPercent = 0;
            convertComponent.ngOnInit();
            convertComponent.ngOnDestroy();
            convertMock.onConversionProgressChanged(40);

            // Assert
            assert.equal(convertComponent.progressPercent, 0);
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

            clipboardWatcherMock.setup((x) => x.clipboardContentChanged$).returns(() => new Observable<string>());

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock as any,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object
            );

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

            convertMock.setup((x) => x.conversionProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup((x) => x.isVideoUrlConvertible(videoUrl)).returns(() => true);

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock as any,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object
            );

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

            convertMock.setup((x) => x.conversionProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup((x) => x.isVideoUrlConvertible(videoUrl)).returns(() => false);

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock as any,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object
            );

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

            convertMock.setup((x) => x.conversionProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup((x) => x.isVideoUrlConvertible(videoUrl)).returns(() => true);

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock as any,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object
            );

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

            convertMock.setup((x) => x.conversionProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup((x) => x.isVideoUrlConvertible(videoUrl)).returns(() => false);

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock as any,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object
            );

            // Act
            await convertComponent.ngOnInit();
            clipboardWatcherMock.onClipboardContentChanged(videoUrl);
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

            convertMock.setup((x) => x.conversionProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup((x) => x.isVideoUrlConvertible(videoUrl)).returns(() => true);

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock as any,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object
            );

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

            convertMock.setup((x) => x.conversionProgressChanged$).returns(() => new Observable<number>());

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock as any,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object
            );

            // Act
            await convertComponent.ngOnInit();
            convertComponent.ngOnDestroy();

            // Assert
            convertMock.verify((x) => x.areDependenciesAvailableAsync(), Times.atLeastOnce());
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

            clipboardWatcherMock.setup((x) => x.clipboardContentChanged$).returns(() => new Observable<string>());
            convertMock.setup((x) => x.conversionProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup((x) => x.areDependenciesAvailableAsync()).returns(() => Promise.resolve(true));

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object
            );

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

            clipboardWatcherMock.setup((x) => x.clipboardContentChanged$).returns(() => new Observable<string>());
            convertMock.setup((x) => x.conversionProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup((x) => x.areDependenciesAvailableAsync()).returns(() => Promise.resolve(true));

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object
            );

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

            clipboardWatcherMock.setup((x) => x.clipboardContentChanged$).returns(() => new Observable<string>());
            convertMock.setup((x) => x.conversionProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup((x) => x.areDependenciesAvailableAsync()).returns(() => Promise.resolve(true));

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object
            );

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

            clipboardWatcherMock.setup((x) => x.clipboardContentChanged$).returns(() => new Observable<string>());
            convertMock.setup((x) => x.conversionProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup((x) => x.areDependenciesAvailableAsync()).returns(() => Promise.resolve(true));

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object
            );

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

            clipboardWatcherMock.setup((x) => x.clipboardContentChanged$).returns(() => new Observable<string>());
            convertMock.setup((x) => x.conversionProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup((x) => x.areDependenciesAvailableAsync()).returns(() => Promise.resolve(false));

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object
            );

            // Act
            await convertComponent.ngOnInit();
            convertComponent.ngOnDestroy();

            // Assert
            convertMock.verify((x) => x.fixDependencies(), Times.exactly(1));
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

            clipboardWatcherMock.setup((x) => x.clipboardContentChanged$).returns(() => new Observable<string>());
            convertMock.setup((x) => x.conversionProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup((x) => x.areDependenciesAvailableAsync()).returns(() => Promise.resolve(true));

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object
            );

            // Act
            await convertComponent.ngOnInit();
            convertComponent.ngOnDestroy();

            // Assert
            convertMock.verify((x) => x.fixDependencies(), Times.never());
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

            clipboardWatcherMock.setup((x) => x.clipboardContentChanged$).returns(() => new Observable<string>());
            convertMock.setup((x) => x.conversionProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup((x) => x.areDependenciesAvailableAsync()).returns(() => Promise.resolve(false));

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object
            );

            // Act
            await convertComponent.ngOnInit();
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.previousConvertState, ConvertState.FixingDependencies);
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

            clipboardWatcherMock.setup((x) => x.clipboardContentChanged$).returns(() => new Observable<string>());
            convertMock.setup((x) => x.conversionProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup((x) => x.areDependenciesAvailableAsync()).returns(() => Promise.resolve(false));

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object
            );

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

            clipboardWatcherMock.setup((x) => x.clipboardContentChanged$).returns(() => new Observable<string>());
            convertMock.setup((x) => x.conversionProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup((x) => x.areDependenciesAvailableAsync()).returns(() => Promise.resolve(false));

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object
            );

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

            convertMock.setup((x) => x.conversionProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup((x) => x.areDependenciesAvailableAsync()).returns(() => Promise.resolve(true));

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock as any,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object
            );

            // Act
            await convertComponent.ngOnInit();
            convertComponent.ngOnDestroy();

            // Assert
            convertMock.verify((x) => x.areDependenciesAvailableAsync(), Times.exactly(1));
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

            convertMock.setup((x) => x.conversionProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup((x) => x.areDependenciesAvailableAsync()).returns(() => Promise.resolve(false));

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock as any,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object
            );

            // Act
            await convertComponent.ngOnInit();
            convertComponent.ngOnDestroy();

            // Assert
            convertMock.verify((x) => x.areDependenciesAvailableAsync(), Times.exactly(2));
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

            clipboardWatcherMock.setup((x) => x.clipboardContentChanged$).returns(() => new Observable<string>());
            convertMock.setup((x) => x.conversionProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup((x) => x.areDependenciesAvailableAsync()).returns(() => Promise.resolve(false));
            convertMock.setup((x) => x.areDependenciesAvailableAsync()).returns(() => Promise.resolve(false));

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object
            );

            // Act
            await convertComponent.ngOnInit();
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.convertState, ConvertState.DependenciesNotAvailable);
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

            clipboardWatcherMock.setup((x) => x.clipboardContentChanged$).returns(() => new Observable<string>());
            convertMock.setup((x) => x.conversionProgressChanged$).returns(() => new Observable<number>());
            convertMock.setup((x) => x.areDependenciesAvailableAsync()).returns(() => Promise.resolve(false));
            convertMock.setup((x) => x.areDependenciesAvailableAsync()).returns(() => Promise.resolve(true));

            const convertComponent: ConvertComponent = new ConvertComponent(
                delayer,
                ngZoneMock as any,
                convertMock.object,
                clipboardWatcherMock.object,
                snackBarMock.object,
                translatorMock.object,
                desktopMock.object
            );

            // Act
            await convertComponent.ngOnInit();
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.convertState, ConvertState.WaitingForClipboardContent);
        });
    });
});
