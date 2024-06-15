import { Component, OnInit } from '@angular/core';
import log from 'electron-log';
import * as path from 'path';
import { BaseAppearanceService } from './services/appearance/base-appearance.service';
import { BaseTranslatorService } from './services/translator/base-translator.service';
import { Desktop } from './common/io/desktop';
import { BaseSnackBarService } from './services/snack-bar/base-snack-bar.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(
        private translatorService: BaseTranslatorService,
        private appearanceService: BaseAppearanceService,
        private desktop: Desktop,
        private snackBarService: BaseSnackBarService
    ) {
        log.create('renderer');
        log.transports.file.resolvePath = () => path.join(this.desktop.getApplicationDataDirectory(), 'logs', 'Vitomu.log');
    }

    public ngOnInit(): void {
        this.appearanceService.applyAppearance();
        this.translatorService.applyLanguage();
        this.snackBarService.showActionSnackBar('this.downloadUrl', 'action');
    }
}
