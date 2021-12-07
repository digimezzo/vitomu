import { Component, OnInit } from '@angular/core';
import { remote } from 'electron';
import log from 'electron-log';
import * as path from 'path';
import { AppearanceService } from './services/appearance/appearance.service';
import { TranslatorService } from './services/translator/translator.service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(private translator: TranslatorService, private appearance: AppearanceService) {
        log.create('renderer');
        log.transports.file.resolvePath = () => path.join(remote.app.getPath('userData'), 'logs', 'Vitomu.log');
    }

    public ngOnInit(): void {
        this.appearance.applyAppearance();
        this.translator.applyLanguage();
    }
}
