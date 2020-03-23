import { Component, OnInit } from '@angular/core';
import { AppearanceService } from './services/appearance/appearance.service';
import { ConvertService } from './services/convert/convert.service';
import { TranslatorService } from './services/translator/translator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private translator: TranslatorService, private appearance: AppearanceService, private convert: ConvertService) {

    this.appearance.applyTheme();
    this.appearance.applyFontSize();
    this.translator.applyLanguage();
  }
}
