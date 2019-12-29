import { Component, OnInit, ViewEncapsulation, NgZone, OnDestroy } from '@angular/core';
import { ConvertService } from '../../services/convert/convert.service';
import { Subscription } from 'rxjs';
import { ClipboardWatcher } from '../../core/clipboard-watcher';
import { SnackBarService } from '../../services/snack-bar/snack-bar.service';
import { TranslatorService } from '../../services/translator/translator.service';
import { Desktop } from '../../core/desktop';
import { Delayer } from '../../core/delayer';
import { ConvertState } from '../../services/convert/convert-state';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConvertComponent implements OnInit, OnDestroy {

  // This is required to use enum values in the template
  ConvertState = ConvertState;

  private subscription: Subscription = new Subscription();
  private _progressPercent: number;
  private _downloadUrl: string;
  private _convertState: ConvertState;

  constructor(private delayer: Delayer, private zone: NgZone, private convert: ConvertService, private clipboardWatcher: ClipboardWatcher,
    private snackBar: SnackBarService, private translator: TranslatorService, private desktop: Desktop) { 
      this.resetState();
    }

  public progressMode = 'determinate';

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

  ngOnInit() {
    this.subscription.add(this.convert.convertStateChanged$.subscribe((convertState) => this.handleConvertStateChanged(convertState)));
    this.subscription.add(this.convert.convertProgressChanged$.subscribe((progressPercent) => this.handleConvertProgressChanged(progressPercent)));
    this.subscription.add(this.clipboardWatcher.clipboardContentChanged$.subscribe((clipboardText) => this.handleClipboardContentChanged(clipboardText)));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public performConvert() {
    this.convert.convertAsync(this.downloadUrl);
  }

  public async showVideoLinkAsync(): Promise<void> {
    let action: string = await this.translator.getAsync('Buttons.Ok');
    this.snackBar.showActionSnackBar(this.downloadUrl, action);
  }

  public viewInFolder(): void {
    this.desktop.showInFolder(this.convert.lastConvertedFilePath);
  }

  public play(): void {
    this.desktop.openInDefaultApplication(this.convert.lastConvertedFilePath);
  }

  private handleConvertStateChanged(convertState: ConvertState): void {
    this.zone.run(() => {
      this.convertState = convertState;
      let delayMilliseconds: number = 3000;

      switch (convertState) {
        case ConvertState.Failed:
          this.delayer.execute(() => {
            this.delayer.execute(() => this.resetState(), delayMilliseconds);
            this.progressPercent = 0;
          }, delayMilliseconds);
          break;
        case ConvertState.Successful:
          this.delayer.execute(() => this.resetState(), delayMilliseconds);
          break;
      }
    });
  }

  private resetState(): void {
    this.convertState = ConvertState.WaitingForClipboardContent;
    this.progressPercent = 0;
    this.downloadUrl = "";
  }

  private handleConvertProgressChanged(progressPercent: number): void {
    this.zone.run(() => this.progressPercent = progressPercent);
  }

  private handleClipboardContentChanged(clipboardText: string): void {
    // Can only handle clipboard content while waiting for clipboard content
    if(this.convertState !== ConvertState.WaitingForClipboardContent){
      return;
    }

    this.zone.run(() => {
      if (this.convert.isVideoUrlConvertible(clipboardText)) {
        this.convertState = ConvertState.HasValidClipboardContent;
        this.downloadUrl = clipboardText;
      } else {
        this.resetState();
      }
    });
  }
}
