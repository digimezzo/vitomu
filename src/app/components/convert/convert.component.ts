import { Component, OnInit, ViewEncapsulation, NgZone, OnDestroy } from '@angular/core';
import { ConvertService } from '../../services/convert/convert.service';
import { Subscription } from 'rxjs';
import { ClipboardWatcher } from '../../core/clipboard-watcher';
import { SnackBarService } from '../../services/snack-bar/snack-bar.service';
import { TranslatorService } from '../../services/translator/translator.service';
import { Desktop } from '../../core/desktop';
import { FileSystem } from '../../core/file-system';
import { Delayer } from '../../core/delayer';
import { ConvertState } from '../../services/convert/convert-state';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConvertComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  private _hasValidClipboardContent: boolean = false;
  private _progressPercent: number = 0;
  private _downloadUrl: string = "";
  private _convertState: ConvertState = ConvertState.Idle;

  constructor(private delayer: Delayer, private zone: NgZone, private convert: ConvertService, private clipboardWatcher: ClipboardWatcher,
    private snackBar: SnackBarService, private translator: TranslatorService, private desktop: Desktop) { }

  public progressMode = 'determinate';

  public get hasValidClipboardContent(): boolean {
    return this._hasValidClipboardContent;
  }

  public set hasValidClipboardContent(v: boolean) {
    this._hasValidClipboardContent = v;
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
          this.delayer.execute(() => this.convertState = ConvertState.Idle, delayMilliseconds);
          break;
        case ConvertState.Successful:
          this.delayer.execute(() => this.convertState = ConvertState.Idle, delayMilliseconds);
          break;
      }
    });
  }

  private handleConvertProgressChanged(progressPercent: number): void {
    this.zone.run(() => this.progressPercent = progressPercent);
  }

  private handleClipboardContentChanged(clipboardText: string): void {
    this.zone.run(() => {
      this.hasValidClipboardContent = this.convert.isVideoUrlConvertible(clipboardText);

      if (this.hasValidClipboardContent) {
        this.downloadUrl = clipboardText;
      }
    });
  }
}
