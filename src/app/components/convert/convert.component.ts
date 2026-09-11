import { Component, NgZone, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
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

@Component({
    selector: 'app-convert',
    templateUrl: './convert.component.html',
    styleUrls: ['./convert.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ConvertComponent implements OnInit, OnDestroy {
    public youtubeDownloaderName: string = YoutubeDownloaderConstants.downloaderName;

    // This is required to use enum values in the template
    public ConvertStateEnum: typeof ConvertState = ConvertState;

    private subscription: Subscription = new Subscription();
    private _progressPercent: number;
    private _downloadUrl: string;
    private _convertState: ConvertState;
    private _progressMode: ProgressSpinnerMode;
    private youtubeDownloaderWasDownloaded: boolean = false;
    private isPostProcessing: boolean = false;

    constructor(
        private delayer: Delayer,
        private zone: NgZone,
        public convertService: BaseConvertService,
        private clipboardWatcher: ClipboardWatcher,
        private snackBarService: BaseSnackBarService,
        private translatorService: BaseTranslatorService,
        private desktop: Desktop
    ) {
        this.reset();
    }

    public get progressMode(): ProgressSpinnerMode {
        return this._progressMode;
    }

    public set progressMode(v: ProgressSpinnerMode) {
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

    public get isConverting(): boolean {
        return this.convertState === ConvertState.ConversionInProgress && this.progressMode === 'indeterminate';
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
        if (!(await this.checkFfmpegAsync())) {
            return;
        }

        this.convertState = ConvertState.WaitingForClipboardContent;
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    public async performConvertAsync(): Promise<void> {
        this.isPostProcessing = false;

        if (this.convertService.isVideoUrlConvertible(this.downloadUrl) && !this.convertService.isYoutubeDownloaderPrepared()) {
            if (!(await this.checkYoutubeDownloaderAsync())) {
                return;
            }

            if (!this.youtubeDownloaderWasDownloaded) {
                await this.updateYoutubeDownloaderAsync();
            }

            this.convertService.markYoutubeDownloaderAsPrepared();
        }

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
        this.zone.run(() => {
            if (progressPercent >= 0) {
                this.progressMode = 'determinate';
                this.progressPercent = progressPercent;
                return;
            }

            if (this.isPostProcessing) {
                return;
            }

            // Show a full ring before switching to the indeterminate extraction phase.
            this.isPostProcessing = true;
            this.progressMode = 'determinate';
            this.progressPercent = 100;
            setTimeout(() => {
                if (this.convertState === ConvertState.ConversionInProgress) {
                    this.progressMode = 'indeterminate';
                }
            }, 750);
        });
    }

    private handleClipboardContentChanged(clipboardText: string): void {
        // Can only handle clipboard content changes while waiting for or having valid clipboard content
        if (this.convertState !== ConvertState.WaitingForClipboardContent && this.convertState !== ConvertState.HasValidClipboardContent) {
            return;
        }

        this.zone.run(() => {
            if (this.convertService.isVideoUrlConvertible(clipboardText) || this.convertService.isLocalVideoConvertible(clipboardText)) {
                this.convertState = ConvertState.HasValidClipboardContent;
                this.downloadUrl = clipboardText.trim();
            } else {
                this.reset();
            }
        });
    }

    private async checkFfmpegAsync(): Promise<boolean> {
        if (!(await this.convertService.isFfmpegAvailableAsync())) {
            this.convertState = ConvertState.downloadingFfmpeg;
            this.progressMode = 'indeterminate';
            try {
                await this.convertService.downloadFfmpegAsync();
            } catch (error) {
                this.convertState = ConvertState.ffmpegNotAvailable;
                return false;
            }
            this.progressMode = 'determinate';
        }

        return true;
    }

    private async checkYoutubeDownloaderAsync(): Promise<boolean> {
        if (!(await this.convertService.isYoutubeDownloaderAvailableAsync())) {
            this.convertState = ConvertState.downloadingYoutubeDownloader;
            this.progressMode = 'indeterminate';
            try {
                await this.convertService.downloadYoutubeDownloaderAsync();
            } catch (error) {
                this.convertState = ConvertState.youtubeDownloaderNotAvailable;
                return false;
            }
            this.progressMode = 'determinate';
            this.youtubeDownloaderWasDownloaded = true;
        }

        return true;
    }

    private async updateYoutubeDownloaderAsync(): Promise<void> {
        this.convertState = ConvertState.updatingYoutubeDownloader;
        this.progressMode = 'indeterminate';
        await this.convertService.updateYoutubeDownloaderAsync();
        this.progressMode = 'determinate';
    }
}
