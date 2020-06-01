import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Settings } from '../../core/settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SettingsComponent implements OnInit {

  constructor(private settings: Settings) { }

  public get useCustomTitleBarChecked(): boolean {
    return this.settings.useCustomTitleBar;
  }
  public set useCustomTitleBarChecked(v: boolean) {
    this.settings.useCustomTitleBar = v;
  }

  public ngOnInit(): void {
  }
}
