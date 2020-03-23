import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { ColorTheme } from '../../core/color-theme';
import { Constants } from '../../core/constants';
import { Logger } from '../../core/logger';
import { Settings } from '../../core/settings';
import { FontSize } from '../../core/font-size';

@Injectable({
    providedIn: 'root',
})
export class AppearanceService {
    private _selectedColorTheme: ColorTheme;
    private _selectedFontSize: FontSize;

    constructor(private settings: Settings, private logger: Logger, private overlayContainer: OverlayContainer) {
        this._selectedColorTheme = this.colorThemes.find(x => x.name === this.settings.colorTheme);
        this._selectedFontSize = this.fontSizes.find(x => x.normalSize === Number(this.settings.fontSize));
    }

    public colorThemes: ColorTheme[] = Constants.colorThemes;
    public fontSizes: FontSize[] = Constants.fontSizes;

    public get selectedColorTheme(): ColorTheme {
        return this._selectedColorTheme;
    }

    public set selectedColorTheme(v: ColorTheme) {
        this._selectedColorTheme = v;
        this.settings.colorTheme = v.name;

        this.applyTheme();
    }

    public get selectedFontSize(): FontSize {
        return this._selectedFontSize;
    }

    public set selectedFontSize(v: FontSize) {
        this._selectedFontSize = v;
        this.settings.fontSize = v.normalSize;

        this.applyFontSize();
    }

    public applyTheme(): void {
        const themeName: string = this._selectedColorTheme.name;

        // Apply theme to components in the overlay container: https://gist.github.com/tomastrajan/ee29cd8e180b14ce9bc120e2f7435db7
        try {
            this.updateClasses(this.overlayContainer.getContainerElement().classList, themeName);
        } catch (error) {
            this.logger.error(`Could not update overlay container classes: Error: ${error}`, 'AppearanceService', 'applyTheme');
        }

        // Apply theme to body
        try {
            this.updateClasses(document.body.classList, themeName);
        } catch (error) {
            this.logger.error(`Could not update body classes: Error: ${error}`, 'AppearanceService', 'applyTheme');
        }

        this.logger.info(`Applied theme '${themeName}'`, 'AppearanceService', 'applyTheme');
    }

    public applyFontSize(): void {
        const element = document.documentElement;
        element.style.setProperty('--fontsize-normal', this._selectedFontSize.normalSize + 'px');
        element.style.setProperty('--fontsize-larger', this._selectedFontSize.largerSize + 'px');
        element.style.setProperty('--fontsize-largest', this._selectedFontSize.largestSize + 'px');
    }

    private updateClasses(tokenList: DOMTokenList, newThemeName: string): void {
        if (tokenList === null) {
            this.logger.error(`${tokenList} is null`, 'AppearanceService', 'getClassesToRemove');
            return;
        }

        const classesToRemove: string[] = Array.from(tokenList).filter((item: string) => item.includes('-theme'));

        if (classesToRemove.length) {
            tokenList.remove(...classesToRemove);
        }

        tokenList.add(newThemeName);
    }
}
