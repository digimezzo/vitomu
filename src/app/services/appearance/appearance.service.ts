import { Injectable } from '@angular/core';
import { Settings } from '../../core/settings';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Logger } from '../../core/logger';
import { ColorTheme } from '../../core/colorTheme';
import { Constants } from '../../core/constants';

@Injectable({
    providedIn: 'root',
})
export class AppearanceService {
    private _selectedColorTheme: ColorTheme;

    constructor(private settings: Settings, private logger: Logger, private overlayContainer: OverlayContainer) {
        this.initialize();
    }

    public colorThemes: ColorTheme[] = Constants.colorThemes;

    public get selectedColorTheme(): ColorTheme {
        return this._selectedColorTheme;
    }

    public set selectedColorTheme(v: ColorTheme) {
        this._selectedColorTheme = v;
        this.settings.colorTheme = v.name;

        this.applyTheme();
    }

    public applyTheme(): void {
        let themeName: string = this.settings.colorTheme;

        // Apply theme to components in the overlay container: https://gist.github.com/tomastrajan/ee29cd8e180b14ce9bc120e2f7435db7
        let overlayContainerClasses: DOMTokenList = this.overlayContainer.getContainerElement().classList;
        let overlayContainerClassesToRemove: string[] = Array.from(overlayContainerClasses).filter((item: string) => item.includes('-theme'));

        if (overlayContainerClassesToRemove.length) {
            overlayContainerClasses.remove(...overlayContainerClassesToRemove);
        }

        overlayContainerClasses.add(themeName);

        // Apply theme to body
        let bodyClasses: DOMTokenList = document.body.classList;
        let bodyClassesToRemove: string[] = Array.from(bodyClasses).filter((item: string) => item.includes('-theme-'));

        if (bodyClassesToRemove.length) {
            bodyClasses.remove(...bodyClassesToRemove);
        }

        document.body.classList.add(themeName);

        this.logger.info(`Applied theme '${themeName}'`, "AppearanceService", "applyTheme");
    }

    private initialize(): void {
        this._selectedColorTheme = this.colorThemes.find(x => x.name === this.settings.colorTheme);
        this.applyTheme();
    }
}