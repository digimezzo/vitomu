import { Component } from '@angular/core';
import { TranslatorService } from './services/translator/translator.service';
import { AppearanceService } from './services/appearance/appearance.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private translator: TranslatorService, private appearance: AppearanceService) {

    this.appearance.applyTheme();
    this.translator.applyLanguage();
  }
}
