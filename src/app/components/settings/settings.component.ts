import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Desktop } from '../../common/io/desktop';
import { BaseSettings } from '../../common/settings/base-settings';
import { BaseAppearanceService } from '../../services/appearance/base-appearance.service';

@Component({
    selector: 'app-settings',
    host: { style: 'display: block; width: 100%;' },
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SettingsComponent implements OnInit, OnDestroy {
    constructor(public appearanceService: BaseAppearanceService, private desktop: Desktop, private settings: BaseSettings) {}

    public get useSystemTitleBarChecked(): boolean {
        return this.settings.useSystemTitleBar;
    }
    public set useSystemTitleBarChecked(v: boolean) {
        this.settings.useSystemTitleBar = v;
    }

    public get checkForUpdatesChecked(): boolean {
        return this.settings.checkForUpdates;
    }
    public set checkForUpdatesChecked(v: boolean) {
        this.settings.checkForUpdates = v;
    }

    public ngOnDestroy(): void {
        this.appearanceService.stopWatchingThemesDirectory();
    }

    public async ngOnInit(): Promise<void> {
        this.appearanceService.startWatchingThemesDirectory();
    }

    public openThemesDirectory(): void {
        this.desktop.openPath(this.appearanceService.themesDirectoryPath);
    }
}
