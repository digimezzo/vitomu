import { Component, OnInit, ViewEncapsulation, NgZone, OnDestroy } from '@angular/core';
import { ConvertService } from '../../services/convert/convert.service';
import { Subscription } from 'rxjs';
import { ClipboardWatcher } from '../../core/clipboard-watcher';
import { SnackBarService } from '../../services/snack-bar/snack-bar.service';
import { TranslatorService } from '../../services/translator/translator.service';
import { Desktop } from '../../core/desktop';
import { FileSystem } from '../../core/file-system';
import { Delayer } from '../../core/delayer';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConvertComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  private _hasValidClipboardContent: boolean = false;
  private _isConverting: boolean = false;
  private _isConversionSuccessful: boolean = false;
  private _isConversionFailed: boolean = false;
  private _isFFmpegNotFound: boolean = false;
  private _progressPercent: number = 0;
  private _downloadUrl: string = "";
  private _lastConvertedFilePath: string = "";
  private _lastConvertedFileName: string = "";

  constructor(private delayer: Delayer, private zone: NgZone, private convert: ConvertService, private clipboardWatcher: ClipboardWatcher,
    private snackBar: SnackBarService, private translator: TranslatorService, private desktop: Desktop, private fileSystem: FileSystem) { }

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

  public get isConverting(): boolean {
    return this._isConverting;
  }

  public set isConverting(v: boolean) {
    this._isConverting = v;
  }

  public get isConversionSuccessful(): boolean {
    return this._isConversionSuccessful;
  }

  public set isConversionSuccessful(v: boolean) {
    this._isConversionSuccessful = v;
  }

  public get isConversionFailed(): boolean {
    return this._isConversionFailed;
  }

  public set isConversionFailed(v: boolean) {
    this._isConversionFailed = v;
  }

  public get isFFmpegNotFound(): boolean {
    return this._isFFmpegNotFound;
  }

  public set isFFmpegNotFound(v: boolean) {
    this._isFFmpegNotFound = v;
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
    this.subscription.add(this.convert.conversionSuccessful$.subscribe((filePath) => this.handleConversionSuccessfulAsync(filePath)));
    this.subscription.add(this.convert.conversionFailed$.subscribe(() => this.handleConversionFailedAsync()));
    this.subscription.add(this.convert.ffmpegNotFound$.subscribe(() => this.handleFFmpegNotFound()));
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
    this.zone.run(() => this.isConverting = isConverting);
  }

  private handleConvertProgressChanged(progressPercent: number): void {
    this.zone.run(() => this.progressPercent = progressPercent);
  }

  private async handleConversionSuccessfulAsync(filePath: string): Promise<void> {
    this.zone.run(async () => {
      this.hasValidClipboardContent = false;
      this.isConversionSuccessful = true;
      this.lastConvertedFilePath = filePath;
      this.lastConvertedFileName = this.fileSystem.getFileName(filePath);
      this.delayer.execute(() => this.isConversionSuccessful = false, 3000);
    });
  }

  private async handleConversionFailedAsync(): Promise<void> {
    this.zone.run(async () => {
      this.hasValidClipboardContent = false;
      this.isConversionFailed = true;

      this.delayer.execute(() => this.isConversionFailed = false, 3000);
    });
  }

  private handleFFmpegNotFound(): void {
    this.zone.run(() => {
      this.hasValidClipboardContent = false;
      this.isFFmpegNotFound = true;
    });
  }

  private handleClipboardContentChanged(clipboardText: string): void {
    this.zone.run(() => {
      this.hasValidClipboardContent = this.convert.isVideoUrlConvertible(clipboardText);

      if (this.hasValidClipboardContent) {
        this.isConversionSuccessful = false;
        this.downloadUrl = clipboardText;
      }
    });
  }
}
