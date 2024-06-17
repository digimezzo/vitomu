import { Component, OnInit } from '@angular/core';
import log from 'electron-log';
import * as path from 'path';
import { Desktop } from './common/io/desktop';
import { AppearanceService } from './services/appearance/appearance.service';
import { TranslatorService } from './services/translator/translator.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(
        private translatorService: TranslatorService,
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
