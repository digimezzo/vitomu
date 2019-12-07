import { Component, OnInit, ViewEncapsulation, NgZone, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ConvertService } from '../../services/convert/convert.service';
import { Logger } from '../../core/logger';
import { Subscription } from 'rxjs';
import { ClipboardWatcher } from '../../core/clipboard-watcher';
import { SnackBarService } from '../../services/snack-bar/snack-bar.service';
import { TranslatorService } from '../../services/translator/translator.service';
import { Desktop } from '../../core/desktop';
import { FileSystem } from '../../core/file-system';
import { Utils } from '../../core/utils';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConvertComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  private _canConvert: boolean = false;
  private _isConverting: boolean = false;
  private _isConvertionSuccessful: boolean = false;
  private _progressPercent: number = 0;
  private _downloadUrl: string = "";
  private _lastConvertedFilePath: string = "";
  private _lastConvertedFileName: string = "";

  constructor(private ref: ChangeDetectorRef, private convert: ConvertService, private clipboardWatcher: ClipboardWatcher,
    private snackBar: SnackBarService, private translator: TranslatorService, private desktop: Desktop, private fileSystem: FileSystem) { }

  public progressMode = 'determinate';

  public get canConvert(): boolean {
    return this._canConvert;
  }

  public set canConvert(v: boolean) {
    this._canConvert = v;
  }

  public get progressPercent(): number {
    return this._progressPercent;
  }
  public set progressPercent(v: number) {
    this._progressPercent = v;
  }

  public get isConverting(): boolean {
    return this._isConverting;
  }

  public set isConverting(v: boolean) {
    this._isConverting = v;
  }

  public get isConvertionSuccessful(): boolean {
    return this._isConvertionSuccessful;
  }

  public set isConvertionSuccessful(v: boolean) {
    this._isConvertionSuccessful = v;
  }

  public get downloadUrl(): string {
    return this._downloadUrl;
  }

  public set downloadUrl(v: string) {
    this._downloadUrl = v;
  }

  public get lastConvertedFilePath(): string {
    return this._lastConvertedFilePath;
  }

  public set lastConvertedFilePath(v: string) {
    this._lastConvertedFilePath = v;
  }

  public get lastConvertedFileName(): string {
    return this._lastConvertedFileName;
  }

  public set lastConvertedFileName(v: string) {
    this._lastConvertedFileName = v;
  }

  ngOnInit() {
    this.subscription.add(this.convert.convertStatusChanged$.subscribe((isConverting) => this.handleConvertStatusChanged(isConverting)));
    this.subscription.add(this.convert.convertProgressChanged$.subscribe((progressPercent) => this.handleConvertProgressChanged(progressPercent)));
    this.subscription.add(this.convert.conversionSuccessful$.subscribe(async (filePath) => await this.handleConvertionSuccessfulAsync(filePath)));
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
    this.desktop.showInFolder(this.lastConvertedFilePath);
  }

  public play(): void {
    this.desktop.openInDefaultApplication(this.lastConvertedFilePath);
  }

  private handleConvertStatusChanged(isConverting: boolean): void {
    this.isConverting = isConverting;
    this.ref.detectChanges();
  }

  private handleConvertProgressChanged(progressPercent: number): void {
    this.progressPercent = progressPercent;
    this.ref.detectChanges();
  }

  private async handleConvertionSuccessfulAsync(filePath: string): Promise<void> {
    this.canConvert = false;
    this.isConvertionSuccessful = true;
    this.lastConvertedFilePath = filePath;
    this.lastConvertedFileName = this.fileSystem.getFileName(filePath);
    this.ref.detectChanges();

    setTimeout(() => {
      this.isConvertionSuccessful = false;
      this.ref.detectChanges();
    }, 3000);

    // await Utils.sleep(3000);
    // this.isConvertionSuccessful = false;
    // this.ref.detectChanges();
  }

  private handleClipboardContentChanged(clipboardText: string): void {
    this.canConvert = this.convert.isVideoUrlConvertible(clipboardText);

    if (this.canConvert) {
      this.isConvertionSuccessful = false;
      this.downloadUrl = clipboardText;
    }

    this.ref.detectChanges();
  }
}
