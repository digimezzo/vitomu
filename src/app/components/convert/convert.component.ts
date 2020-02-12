import { Component, NgZone, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClipboardWatcher } from '../../core/clipboard-watcher';
import { Delayer } from '../../core/delayer';
import { Desktop } from '../../core/desktop';
import { ConvertState } from '../../core/convert-state';
import { ConvertService } from '../../services/convert/convert.service';
import { SnackBarService } from '../../services/snack-bar/snack-bar.service';
import { TranslatorService } from '../../services/translator/translator.service';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConvertComponent implements OnInit, OnDestroy {

  // This is required to use enum values in the template
  public ConvertStateEnum: typeof ConvertState = ConvertState;

  // Only used for unit testing
  public previousConvertState: ConvertState;
  public previousProgressMode: string;

  private subscription: Subscription = new Subscription();
  private _progressPercent: number;
  private _downloadUrl: string;
  private _convertState: ConvertState;
  private _progressMode: string;

  constructor(private delayer: Delayer, private zone: NgZone, public convert: ConvertService, private clipboardWatcher: ClipboardWatcher,
    private snackBar: SnackBarService, private translator: TranslatorService, private desktop: Desktop) {
    this.reset();
  }

  public get progressMode(): string {
    return this._progressMode;
  }

  public set progressMode(v: string) {
    this.previousProgressMode = this._progressMode;
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
    this.previousConvertState = this._convertState;
    this._convertState = v;
  }

  public get downloadUrl(): string {
    return this._downloadUrl;
  }

  public set downloadUrl(v: string) {
    this._downloadUrl = v;
  }

  public async ngOnInit(): Promise<void> {
    this.subscription.add(this.convert.conversionProgressChanged$.subscribe((progressPercent) => {
      this.handleConversionProgressChanged(progressPercent);
    }));

    this.subscription.add(this.convert.conversionSuccessful$.subscribe(() => {
      this.handleConversionSuccessful();
    }));

    this.subscription.add(this.convert.conversionFailed$.subscribe(() => {
      this.handleConversionFailed();
    }));

    this.subscription.add(this.clipboardWatcher.clipboardContentChanged$.subscribe((clipboardText) => {
      this.handleClipboardContentChanged(clipboardText);
    }));

    await this.checkPrerequisitesAsync();
  }

  private async checkPrerequisitesAsync(): Promise<void> {
    if (!await this.convert.arePrerequisitesOKAsync()) {
      this.convertState = ConvertState.FixingPrerequisites;
      this.progressMode = 'indeterminate';
      await this.convert.fixPrerequisites();
      this.progressMode = 'determinate';

      if (!await this.convert.arePrerequisitesOKAsync()) {
        this.convertState = ConvertState.PrerequisitesNotOK;

        return;
      }
    }

    this.convertState = ConvertState.WaitingForClipboardContent;
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public performConvert(): void {
    this.convertState = ConvertState.ConversionInProgress;
    this.convert.convertAsync(this.downloadUrl);
  }

  public async showVideoLinkAsync(): Promise<void> {
    const action: string = await this.translator.getAsync('Buttons.Ok');
    this.snackBar.showActionSnackBar(this.downloadUrl, action);
  }

  public viewInFolder(): void {
    this.desktop.showInFolder(this.convert.lastConvertedFilePath);
  }

  public play(): void {
    this.desktop.openInDefaultApplication(this.convert.lastConvertedFilePath);
  }

  private reset(): void {
    this.convertState = ConvertState.WaitingForClipboardContent;
    this.progressPercent = 0;
    this.downloadUrl = '';
    this.progressMode = 'determinate';
  }

  private handleConversionSuccessful(): void {
    this.zone.run(() => {
      this.convertState = ConvertState.ConversionSuccessful;
      this.delayer.execute(() => this.reset(), 3000);
    });
  }

  private handleConversionFailed(): void {
    this.zone.run(() => {
      this.convertState = ConvertState.ConversionFailed;
      this.delayer.execute(() => this.reset(), 3000);
    });
  }

  private handleConversionProgressChanged(progressPercent: number): void {
    this.zone.run(() => this.progressPercent = progressPercent);
  }

  private handleClipboardContentChanged(clipboardText: string): void {
    // Can only handle clipboard content changes while waiting for or having valid clipboard content
    if (this.convertState !== ConvertState.WaitingForClipboardContent && this.convertState !== ConvertState.HasValidClipboardContent) {
      return;
    }

    this.zone.run(() => {
      if (this.convert.isVideoUrlConvertible(clipboardText)) {
        this.convertState = ConvertState.HasValidClipboardContent;
        this.downloadUrl = clipboardText;
      } else {
        this.reset();
      }
    });
  }
}
