import { Component, NgZone, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { Delayer } from '../../common/delayer';
import { ClipboardWatcher } from '../../common/io/clipboard-watcher';
import { Desktop } from '../../common/io/desktop';
import { BaseConvertService } from '../../services/convert/base-convert.service';
import { ConversionResult } from '../../services/convert/conversion-result';
import { ConvertState } from '../../services/convert/convert-state';
import { YoutubeDownloaderConstants } from '../../services/convert/youtube-downloader-constants';
import { BaseSnackBarService } from '../../services/snack-bar/base-snack-bar.service';
import { BaseTranslatorService } from '../../services/translator/base-translator.service';
import { PersistanceService } from '../../services/persistance/persistance.service';

@Component({
    selector: 'app-convert',
    host: { style: 'display: block; width: 100%;' },
    templateUrl: './convert.component.html',
    styleUrls: ['./convert.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ConvertComponent implements OnInit, OnDestroy {
    public youtubeDownloaderName: string = YoutubeDownloaderConstants.downloaderName;

    // This is required to use enum values in the template
    public ConvertStateEnum: typeof ConvertState = ConvertState;

    private subscription: Subscription = new Subscription();
    private _progressPercent: number;
    private _downloadUrl: string;
    private _convertState: ConvertState;
    private _progressMode: string;

    constructor(
        private delayer: Delayer,
        private zone: NgZone,
        public convertService: BaseConvertService,
        private clipboardWatcher: ClipboardWatcher,
        private snackBarService: BaseSnackBarService,
        private translatorService: BaseTranslatorService,
        private persistanceService: PersistanceService,
        private desktop: Desktop
    ) {
        this.reset();
    }

    public get progressMode(): string {
        return this._progressMode;
    }

    public set progressMode(v: string) {
        this._progressMode = v;
    }

    public get progressPercent(): number {
        return this._progressPercent;
    }

    public set progressPercent(v: number) {
        this._progressPercent = v;
    }

    public get convertState(): ConvertState {
        return this._convertState;
    }

    public set convertState(v: ConvertState) {
        this._convertState = v;
    }

    public get downloadUrl(): string {
        return this._downloadUrl;
    }

    public set downloadUrl(v: string) {
        this._downloadUrl = v;
    }

    public async ngOnInit(): Promise<void> {
        this.subscription.add(
            this.convertService.conversionProgressChanged$.subscribe((progressPercent) => {
                this.handleConversionProgressChanged(progressPercent);
            })
        );

        this.subscription.add(
            this.clipboardWatcher.clipboardContentChanged$.subscribe((clipboardText) => {
                this.handleClipboardContentChanged(clipboardText);
            })
        );

        await this.checkDependenciesAsync();
    }

    private async checkDependenciesAsync(): Promise<void> {
        // TODO: this is a workaround to prevent multiple checks. This should be done in a better way.
        if (this.persistanceService.dependenciesAreChecked) {
            return;
        }

        this.persistanceService.dependenciesAreChecked = true;
        
        await this.checkFfmpegAsync();
        await this.checkYoutubeDownloaderAsync();
        await this.updateYoutubeDownloaderAsync();

        this.convertState = ConvertState.WaitingForClipboardContent;
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    public async performConvertAsync(): Promise<void> {
        this.convertState = ConvertState.ConversionInProgress;
        const conversionResult: ConversionResult = await this.convertService.convertAsync(this.downloadUrl);

        if (conversionResult.isConversionSuccessful) {
            this.convertState = ConvertState.ConversionSuccessful;
        } else {
            this.convertState = ConvertState.ConversionFailed;
        }

        this.delayer.execute(() => this.reset(), 3000);
    }

    public async showVideoLinkAsync(): Promise<void> {
        const action: string = await this.translatorService.getAsync('Buttons.Ok');
        this.snackBarService.showActionSnackBar(this.downloadUrl, action);
    }

    public viewInFolder(): void {
        this.desktop.showInFolder(this.convertService.lastConvertedFilePath);
    }

    public play(): void {
        this.desktop.openPath(this.convertService.lastConvertedFilePath);
    }

    private reset(): void {
        this.convertState = ConvertState.WaitingForClipboardContent;
        this.progressPercent = 0;
        this.downloadUrl = '';
        this.progressMode = 'determinate';
    }

    private handleConversionProgressChanged(progressPercent: number): void {
        this.zone.run(() => (this.progressPercent = progressPercent));
    }

    private handleClipboardContentChanged(clipboardText: string): void {
        // Can only handle clipboard content changes while waiting for or having valid clipboard content
        if (this.convertState !== ConvertState.WaitingForClipboardContent && this.convertState !== ConvertState.HasValidClipboardContent) {
            return;
        }

        this.zone.run(() => {
            if (this.convertService.isVideoUrlConvertible(clipboardText)) {
                this.convertState = ConvertState.HasValidClipboardContent;
                this.downloadUrl = clipboardText;
            } else {
                this.reset();
            }
        });
    }

    private async checkFfmpegAsync(): Promise<void> {
        if (!(await this.convertService.isFfmpegAvailableAsync())) {
            this.convertState = ConvertState.downloadingFfmpeg;
            this.progressMode = 'indeterminate';
            await this.convertService.downloadFfmpegAsync();
            this.progressMode = 'determinate';
        }
    }

    private async checkYoutubeDownloaderAsync(): Promise<void> {
        if (!(await this.convertService.isYoutubeDownloaderAvailableAsync())) {
            this.convertState = ConvertState.downloadingYoutubeDownloader;
            this.progressMode = 'indeterminate';
            await this.convertService.downloadYoutubeDownloaderAsync();
            this.progressMode = 'determinate';
        }
    }

    private async updateYoutubeDownloaderAsync(): Promise<void> {
        this.convertState = ConvertState.updatingYoutubeDownloader;
        this.progressMode = 'indeterminate';
        await this.convertService.updateYoutubeDownloaderAsync();
        this.progressMode = 'determinate';
    }
}
