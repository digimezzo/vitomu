import { Component } from '@angular/core';
import { AppearanceService } from './services/appearance/appearance.service';
import { TranslatorService } from './services/translator/translator.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor(private translator: TranslatorService, private appearance: AppearanceService) {
        this.appearance.applyAppearance();
        this.translator.applyLanguage();
    }
}
