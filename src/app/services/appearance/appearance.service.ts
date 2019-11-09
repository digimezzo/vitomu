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
        this._selectedColorTheme = this.colorThemes.find(x => x.name === this.settings.colorTheme);
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
        try {
            this.updateClasses(this.overlayContainer.getContainerElement().classList, themeName);
        } catch (error) {
            this.logger.error(`Could not update overlay container classes: Error: ${error}`, "AppearanceService", "applyTheme");
        }

        // Apply theme to body
        try {
            this.updateClasses(document.body.classList, themeName);
        } catch (error) {
            this.logger.error(`Could not update body classes: Error: ${error}`, "AppearanceService", "applyTheme");
        }

        this.logger.info(`Applied theme '${themeName}'`, "AppearanceService", "applyTheme");
    }

    private updateClasses(tokenList: DOMTokenList, newThemeName: string) {
        if (tokenList === null) {
            this.logger.error(`${tokenList} is null`, "AppearanceService", "getClassesToRemove");
            return;
        }

        let classesToRemove: string[] = Array.from(tokenList).filter((item: string) => item.includes('-theme'));

        if (classesToRemove.length) {
            tokenList.remove(...classesToRemove);
        }

        tokenList.add(newThemeName);
    }
}