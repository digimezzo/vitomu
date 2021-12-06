import * as assert from 'assert';
import { Observable, Subject } from 'rxjs';
import { IMock, Mock, Times } from 'typemoq';
import { ClipboardWatcher } from '../../common/clipboard-watcher';
import { ConvertState } from '../../common/convert-state';
import { Delayer } from '../../common/delayer';
import { Desktop } from '../../common/desktop';
import { ConversionResult } from '../../services/convert/conversion-result';
import { ConvertService } from '../../services/convert/convert.service';
import { SnackBarService } from '../../services/snack-bar/snack-bar.service';
import { TranslatorService } from '../../services/translator/translator.service';
import { ConvertComponent } from './convert.component';
import { NgZoneMock } from './ng-zone.mock';

describe('ConvertComponent', () => {
    let convertServiceMock: IMock<ConvertService>;
    let clipboardWatcherMock: IMock<ClipboardWatcher>;
    let snackBarServiceMock: IMock<SnackBarService>;
    let translatorServiceMock: IMock<TranslatorService>;
    let desktopMock: IMock<Desktop>;
    let ngZoneMock: any;

    let delayer: Delayer;

    let conversionProgressChanged: Subject<number>;
    let clipboardContentChanged: Subject<string>;

    beforeEach(() => {
        convertServiceMock = Mock.ofType<ConvertService>();
        clipboardWatcherMock = Mock.ofType<ClipboardWatcher>();
        snackBarServiceMock = Mock.ofType<SnackBarService>();
        translatorServiceMock = Mock.ofType<TranslatorService>();
        desktopMock = Mock.ofType<Desktop>();
        ngZoneMock = new NgZoneMock();

        delayer = new Delayer();

        conversionProgressChanged = new Subject();
        const conversionProgressChanged$: Observable<number> = conversionProgressChanged.asObservable();
        convertServiceMock.setup((x) => x.conversionProgressChanged$).returns(() => conversionProgressChanged$);

        clipboardContentChanged = new Subject();
        const clipboardContentChanged$: Observable<string> = clipboardContentChanged.asObservable();
        clipboardWatcherMock.setup((x) => x.clipboardContentChanged$).returns(() => clipboardContentChanged$);
    });

    function createComponent(): ConvertComponent {
        return new ConvertComponent(
            delayer,
            ngZoneMock as any,
            convertServiceMock.object,
            clipboardWatcherMock.object,
            snackBarServiceMock.object,
            translatorServiceMock.object,
            desktopMock.object
        );
    }
    describe('constructor', () => {
        it('Should start with progress mode determinate', () => {
            // Arrange
            delayer.canDelay = false;

            // Act
            const convertComponent: ConvertComponent = createComponent();

            // Assert
            assert.equal(convertComponent.progressMode, 'determinate');
        });

        it('Should start waiting for clipboard content', () => {
            // Arrange
            delayer.canDelay = false;

            // Act
            const convertComponent: ConvertComponent = createComponent();

            // Assert
            assert.equal(convertComponent.convertState, ConvertState.WaitingForClipboardContent);
        });

        it('Should start without progress', () => {
            // Arrange
            delayer.canDelay = false;

            // Act
            const convertComponent: ConvertComponent = createComponent();

            // Assert
            assert.equal(convertComponent.progressPercent, 0);
        });

        it('Should start without download url', () => {
            // Arrange
            delayer.canDelay = false;

            // Act
            const convertComponent: ConvertComponent = createComponent();

            // Assert
            assert.equal(convertComponent.downloadUrl, '');
        });
    });

    describe('performConvertAsync', () => {
        it('Should perform a conversion for the given download url', async () => {
            // Arrange
            convertServiceMock
                .setup((x) => x.convertAsync('https://my.url.is.glorious'))
                .returns(() => Promise.resolve(new ConversionResult(true, 'dummy')));

            const convertComponent: ConvertComponent = createComponent();

            // Act
            convertComponent.downloadUrl = 'https://my.url.is.glorious';
            await convertComponent.performConvertAsync();

            // Assert
            convertServiceMock.verify((x) => x.convertAsync('https://my.url.is.glorious'), Times.exactly(1));
        });

        it('Should detect when a conversion was successful', async () => {
            // Arrange
            delayer.canDelay = false;
            delayer.canExecute = false;

            convertServiceMock
                .setup((x) => x.convertAsync('https://my.url.is.glorious'))
                .returns(() => Promise.resolve(new ConversionResult(true, 'dummy')));

            const convertComponent: ConvertComponent = createComponent();

            // Act
            convertComponent.downloadUrl = 'https://my.url.is.glorious';
            await convertComponent.performConvertAsync();

            // Assert
            assert.equal(convertComponent.convertState, ConvertState.ConversionSuccessful);
        });

        it('Should reset state after successful conversion', async () => {
            // Arrange
            delayer.canDelay = false;

            clipboardWatcherMock.setup((x) => x.clipboardContentChanged$).returns(() => new Observable<string>());
            convertServiceMock
                .setup((x) => x.convertAsync('https://my.url.is.glorious'))
                .returns(() => Promise.resolve(new ConversionResult(true, 'dummy')));

            const convertComponent: ConvertComponent = createComponent();

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
            delayer.canDelay = false;

            clipboardWatcherMock.setup((x) => x.clipboardContentChanged$).returns(() => new Observable<string>());
            convertServiceMock
                .setup((x) => x.convertAsync('https://my.url.is.glorious'))
                .returns(() => Promise.resolve(new ConversionResult(true, 'dummy')));

            const convertComponent: ConvertComponent = createComponent();

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
            delayer.canDelay = false;

            clipboardWatcherMock.setup((x) => x.clipboardContentChanged$).returns(() => new Observable<string>());
            convertServiceMock
                .setup((x) => x.convertAsync('https://my.url.is.glorious'))
                .returns(() => Promise.resolve(new ConversionResult(true, 'dummy')));

            const convertComponent: ConvertComponent = createComponent();

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
            delayer.canDelay = false;
            delayer.canExecute = false;

            convertServiceMock
                .setup((x) => x.convertAsync('https://my.url.is.glorious'))
                .returns(() => Promise.resolve(new ConversionResult(false, '')));

            const convertComponent: ConvertComponent = createComponent();

            // Act
            convertComponent.downloadUrl = 'https://my.url.is.glorious';
            await convertComponent.performConvertAsync();

            // Assert
            assert.equal(convertComponent.convertState, ConvertState.ConversionFailed);
        });

        it('Should reset state after failed conversion', async () => {
            // Arrange
            delayer.canDelay = false;

            clipboardWatcherMock.setup((x) => x.clipboardContentChanged$).returns(() => new Observable<string>());
            convertServiceMock
                .setup((x) => x.convertAsync('https://my.url.is.glorious'))
                .returns(() => Promise.resolve(new ConversionResult(false, '')));

            const convertComponent: ConvertComponent = createComponent();

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
            delayer.canDelay = false;

            clipboardWatcherMock.setup((x) => x.clipboardContentChanged$).returns(() => new Observable<string>());
            convertServiceMock
                .setup((x) => x.convertAsync('https://my.url.is.glorious'))
                .returns(() => Promise.resolve(new ConversionResult(false, '')));

            const convertComponent: ConvertComponent = createComponent();

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
            delayer.canDelay = false;

            clipboardWatcherMock.setup((x) => x.clipboardContentChanged$).returns(() => new Observable<string>());
            convertServiceMock
                .setup((x) => x.convertAsync('https://my.url.is.glorious'))
                .returns(() => Promise.resolve(new ConversionResult(false, '')));

            const convertComponent: ConvertComponent = createComponent();

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
            delayer.canDelay = false;

            const convertComponent: ConvertComponent = createComponent();

            translatorServiceMock.setup((x) => x.getAsync('Buttons.Ok')).returns(() => Promise.resolve('OK'));

            // Act
            convertComponent.downloadUrl = 'https://my.url.is.glorious';
            await convertComponent.showVideoLinkAsync();

            // Assert
            snackBarServiceMock.verify((x) => x.showActionSnackBar('https://my.url.is.glorious', 'OK'), Times.exactly(1));
        });
    });

    describe('viewInFolder', () => {
        it('Should show the converted file in its containing folder', async () => {
            // Arrange
            delayer.canDelay = false;

            convertServiceMock.setup((x) => x.lastConvertedFilePath).returns(() => '/home/user/Music/Vitomu/Converted file.mp3');

            const convertComponent: ConvertComponent = createComponent();

            // Act
            convertComponent.viewInFolder();

            // Assert
            desktopMock.verify((x) => x.showInFolder('/home/user/Music/Vitomu/Converted file.mp3'), Times.exactly(1));
        });
    });

    describe('play', () => {
        it('Should play the converted file in the default application', async () => {
            // Arrange
            delayer.canDelay = false;

            convertServiceMock.setup((x) => x.lastConvertedFilePath).returns(() => '/home/user/Music/Vitomu/Converted file.mp3');

            const convertComponent: ConvertComponent = createComponent();

            // Act
            convertComponent.play();

            // Assert
            desktopMock.verify((x) => x.openInDefaultApplication('/home/user/Music/Vitomu/Converted file.mp3'), Times.exactly(1));
        });
    });

    describe('ngOnDestroy', () => {
        it('Should not detect conversion progress changes', async () => {
            // Arrange
            delayer.canDelay = false;

            clipboardWatcherMock.setup((x) => x.clipboardContentChanged$).returns(() => new Observable<string>());

            const convertComponent: ConvertComponent = createComponent();

            // Act
            convertComponent.progressPercent = 0;
            convertComponent.ngOnInit();
            convertComponent.ngOnDestroy();
            conversionProgressChanged.next(40);

            // Assert
            assert.equal(convertComponent.progressPercent, 0);
        });
    });

    describe('ngOnInit', () => {
        it('Should detect conversion progress changes', async () => {
            // Arrange
            delayer.canDelay = false;
            clipboardWatcherMock.setup((x) => x.clipboardContentChanged$).returns(() => new Observable<string>());
            const convertComponent: ConvertComponent = createComponent();

            // Act
            convertComponent.progressPercent = 0;
            convertComponent.ngOnInit();
            conversionProgressChanged.next(40);
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.progressPercent, 40);
        });

        it('Should detect valid clipboard content', async () => {
            // Arrange
            delayer.canDelay = false;
            const videoUrl: string = 'https://music.video.url';
            convertServiceMock.setup((x) => x.isVideoUrlConvertible(videoUrl)).returns(() => true);
            const convertComponent: ConvertComponent = createComponent();

            // Act
            convertComponent.ngOnInit();
            clipboardContentChanged.next(videoUrl);
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.convertState, ConvertState.HasValidClipboardContent);
        });

        it('Should ignore invalid clipboard content', async () => {
            // Arrange
            delayer.canDelay = false;
            const videoUrl: string = 'https://music.video.url';
            convertServiceMock.setup((x) => x.isVideoUrlConvertible(videoUrl)).returns(() => false);
            const convertComponent: ConvertComponent = createComponent();
            // Act
            convertComponent.ngOnInit();
            clipboardContentChanged.next(videoUrl);
            convertComponent.ngOnDestroy();
            // Assert
            assert.equal(convertComponent.convertState, ConvertState.WaitingForClipboardContent);
        });

        it('Should use video url if clipboard url is valid', async () => {
            // Arrange
            delayer.canDelay = false;
            const videoUrl: string = 'https://music.video.url';
            convertServiceMock.setup((x) => x.isVideoUrlConvertible(videoUrl)).returns(() => true);
            const convertComponent: ConvertComponent = createComponent();
            convertComponent.downloadUrl = '';
            // Act
            convertComponent.ngOnInit();
            clipboardContentChanged.next(videoUrl);
            convertComponent.ngOnDestroy();
            // Assert
            assert.equal(convertComponent.downloadUrl, videoUrl);
        });

        it('Should not use video url if clipboard url is invalid', async () => {
            // Arrange
            delayer.canDelay = false;
            const videoUrl: string = 'https://music.video.url';
            convertServiceMock.setup((x) => x.isVideoUrlConvertible(videoUrl)).returns(() => false);
            const convertComponent: ConvertComponent = createComponent();
            // Act
            await convertComponent.ngOnInit();
            clipboardContentChanged.next(videoUrl);
            convertComponent.ngOnDestroy();
            // Assert
            assert.equal(convertComponent.downloadUrl, '');
        });

        it('Should handle clipboard content only when waiting for or having valid clipboard content', () => {
            // Arrange
            delayer.canDelay = false;
            const videoUrl: string = 'https://music.video.url';
            convertServiceMock.setup((x) => x.isVideoUrlConvertible(videoUrl)).returns(() => true);
            const convertComponent: ConvertComponent = createComponent();

            // Act
            convertComponent.ngOnInit();
            convertComponent.downloadUrl = '';
            convertComponent.convertState = ConvertState.ConversionInProgress;
            clipboardContentChanged.next(videoUrl);
            const convertingDownloadUrl: string = convertComponent.downloadUrl;

            convertComponent.downloadUrl = '';
            convertComponent.convertState = ConvertState.ConversionFailed;
            clipboardContentChanged.next(videoUrl);
            const failedDownloadUrl: string = convertComponent.downloadUrl;

            convertComponent.downloadUrl = 'https://previous.music.video.url';
            convertComponent.convertState = ConvertState.HasValidClipboardContent;
            clipboardContentChanged.next(videoUrl);
            const hasValidClipboardContentDownloadUrl: string = convertComponent.downloadUrl;

            convertComponent.downloadUrl = '';
            convertComponent.convertState = ConvertState.ConversionSuccessful;
            clipboardContentChanged.next(videoUrl);
            const successfulDownloadUrl: string = convertComponent.downloadUrl;

            convertComponent.downloadUrl = '';
            convertComponent.convertState = ConvertState.WaitingForClipboardContent;
            clipboardContentChanged.next(videoUrl);
            const waitingForClipboardContentDownloadUrl: string = convertComponent.downloadUrl;

            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertingDownloadUrl, '');
            assert.equal(failedDownloadUrl, '');
            assert.equal(hasValidClipboardContentDownloadUrl, videoUrl);
            assert.equal(successfulDownloadUrl, '');
            assert.equal(waitingForClipboardContentDownloadUrl, videoUrl);
        });

        it('Should check if Ffmpeg is available', async () => {
            // Arrange
            delayer.canDelay = false;

            const convertComponent: ConvertComponent = createComponent();

            // Act
            await convertComponent.ngOnInit();
            convertComponent.ngOnDestroy();

            // Assert
            convertServiceMock.verify((x) => x.isFfmpegAvailableAsync(), Times.once());
        });

        it('Should check if Youtube downloader is available', async () => {
            // Arrange
            delayer.canDelay = false;

            const convertComponent: ConvertComponent = createComponent();

            // Act
            await convertComponent.ngOnInit();
            convertComponent.ngOnDestroy();

            // Assert
            convertServiceMock.verify((x) => x.isYoutubeDownloaderAvailableAsync(), Times.once());
        });

        it('Should update Youtube downloader', async () => {
            // Arrange
            delayer.canDelay = false;

            const convertComponent: ConvertComponent = createComponent();

            // Act
            await convertComponent.ngOnInit();
            convertComponent.ngOnDestroy();

            // Assert
            convertServiceMock.verify((x) => x.updateYoutubeDownloaderAsync(), Times.once());
        });

        it('Should set progress mode to determinate after initialization', async () => {
            // Arrange
            delayer.canDelay = false;
            convertServiceMock.setup((x) => x.isFfmpegAvailableAsync()).returns(async () => true);
            convertServiceMock.setup((x) => x.isYoutubeDownloaderAvailableAsync()).returns(async () => true);

            const convertComponent: ConvertComponent = createComponent();

            // Act
            await convertComponent.ngOnInit();
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.progressMode, 'determinate');
        });

        it('Should be waiting for clipboard content after initialization', async () => {
            // Arrange
            delayer.canDelay = false;
            convertServiceMock.setup((x) => x.isFfmpegAvailableAsync()).returns(async () => true);
            convertServiceMock.setup((x) => x.isYoutubeDownloaderAvailableAsync()).returns(async () => true);

            const convertComponent: ConvertComponent = createComponent();

            // Act
            await convertComponent.ngOnInit();
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.convertState, ConvertState.WaitingForClipboardContent);
        });

        it('Should have no progress after initialization', async () => {
            // Arrange
            delayer.canDelay = false;
            convertServiceMock.setup((x) => x.isFfmpegAvailableAsync()).returns(async () => true);
            convertServiceMock.setup((x) => x.isYoutubeDownloaderAvailableAsync()).returns(async () => true);

            const convertComponent: ConvertComponent = createComponent();

            // Act
            await convertComponent.ngOnInit();
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.progressPercent, 0);
        });

        it('Should have no download url after initialization', async () => {
            // Arrange
            delayer.canDelay = false;
            convertServiceMock.setup((x) => x.isFfmpegAvailableAsync()).returns(async () => true);
            convertServiceMock.setup((x) => x.isYoutubeDownloaderAvailableAsync()).returns(async () => true);

            const convertComponent: ConvertComponent = createComponent();

            // Act
            await convertComponent.ngOnInit();
            convertComponent.ngOnDestroy();

            // Assert
            assert.equal(convertComponent.downloadUrl, '');
        });

        it('Should not download Ffmpeg if it is available', async () => {
            // Arrange
            delayer.canDelay = false;
            convertServiceMock.setup((x) => x.isFfmpegAvailableAsync()).returns(async () => true);
            convertServiceMock.setup((x) => x.isYoutubeDownloaderAvailableAsync()).returns(async () => true);

            const convertComponent: ConvertComponent = createComponent();

            // Act
            await convertComponent.ngOnInit();
            convertComponent.ngOnDestroy();

            // Assert
            convertServiceMock.verify((x) => x.downloadFfmpegAsync(), Times.never());
        });

        it('Should download Ffmpeg if it is not available', async () => {
            // Arrange
            delayer.canDelay = false;
            convertServiceMock.setup((x) => x.isFfmpegAvailableAsync()).returns(async () => false);
            convertServiceMock.setup((x) => x.isYoutubeDownloaderAvailableAsync()).returns(async () => true);

            const convertComponent: ConvertComponent = createComponent();

            // Act
            await convertComponent.ngOnInit();
            convertComponent.ngOnDestroy();

            // Assert
            convertServiceMock.verify((x) => x.downloadFfmpegAsync(), Times.once());
        });

        it('Should not download Youtube downloader if it is available', async () => {
            // Arrange
            delayer.canDelay = false;
            convertServiceMock.setup((x) => x.isFfmpegAvailableAsync()).returns(async () => true);
            convertServiceMock.setup((x) => x.isYoutubeDownloaderAvailableAsync()).returns(async () => true);

            const convertComponent: ConvertComponent = createComponent();

            // Act
            await convertComponent.ngOnInit();
            convertComponent.ngOnDestroy();

            // Assert
            convertServiceMock.verify((x) => x.downloadYoutubeDownloaderAsync(), Times.never());
        });

        it('Should download Youtube downloader if it is not available', async () => {
            // Arrange
            delayer.canDelay = false;
            convertServiceMock.setup((x) => x.isFfmpegAvailableAsync()).returns(async () => true);
            convertServiceMock.setup((x) => x.isYoutubeDownloaderAvailableAsync()).returns(async () => false);

            const convertComponent: ConvertComponent = createComponent();

            // Act
            await convertComponent.ngOnInit();
            convertComponent.ngOnDestroy();

            // Assert
            convertServiceMock.verify((x) => x.downloadYoutubeDownloaderAsync(), Times.once());
        });
    });
});
