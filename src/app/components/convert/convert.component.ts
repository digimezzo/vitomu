import { Component, OnInit, ViewEncapsulation, NgZone } from '@angular/core';
import { ConvertService } from '../../services/convert/convert.service';
import { ipcRenderer, clipboard } from 'electron';
import { Events } from '../../core/events';
import { Logger } from '../../core/logger';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConvertComponent implements OnInit {

  private _canConvert: boolean;
  //private _converting: boolean;
  private _downloadUrl: string;

  constructor(private convert: ConvertService, private logger: Logger, private zone: NgZone) { }

  public get canConvert(): boolean {
    return this._canConvert;
  }

  public set canConvert(v: boolean) {
    this._canConvert = v;
  }

  // public get converting(): boolean {
  //   return this._converting;
  // }

  // public set converting(v: boolean) {
  //   this._converting = v;
  // }

  public get downloadUrl(): string {
    return this._downloadUrl;
  }

  public set downloadUrl(v: string) {
    this._downloadUrl = v;
  }

  ngOnInit() {
    ipcRenderer.on(Events.windowFocusChangedEvent, () => {
      let clipBoardText: string = clipboard.readText();

      this.zone.run(() => {
        if (clipBoardText && clipBoardText.includes('https://www.youtube.com/watch?v=')) {
          this.canConvert = true;
          this.downloadUrl = clipBoardText;
        } else {
          this.canConvert = false;
        }
      });
    });
  }

  public performConvert(){
    let pieces: string[] = this.downloadUrl.split("&");
    let videoId: string = pieces[0].replace("https://www.youtube.com/watch?v=","");
    this.convert.convertAsync(videoId);
  }
}
