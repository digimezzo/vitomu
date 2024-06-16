import { Component, OnInit } from '@angular/core';
import log from 'electron-log';
import * as path from 'path';
import { BaseTranslatorService } from './services/translator/base-translator.service';
import { Desktop } from './common/io/desktop';
import { AppearanceService } from './services/appearance/appearance.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(
        private translatorService: BaseTranslatorService,
        private appearanceService: AppearanceService,
        private desktop: Desktop,
    ) {
        log.create('renderer');
        log.transports.file.resolvePath = () => path.join(this.desktop.getApplicationDataDirectory(), 'logs', 'Vitomu.log');
    }

    public async ngOnInit(): Promise<void> {
        this.appearanceService.applyAppearance();
        await this.translatorService.applyLanguageAsync();
    }
}
