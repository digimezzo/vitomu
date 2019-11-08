import { Injectable } from '@angular/core';
import * as Store from 'electron-store';
import { Constants } from './constants';

@Injectable({
    providedIn: 'root',
})
export class Settings {
    private settings: Store<any> = new Store();

    constructor() {
        this.initialize();
    }

    // Default language
    public get defaultLanguage(): string {
        return 'en';
    }

    // Language
    public get language(): string {
        return this.settings.get('language');
    }

    public set language(v: string) {
        this.settings.set('language', v);
    }

    // Color theme
    public get colorTheme(): string {
        return this.settings.get('colorTheme');
    }

    public set colorTheme(v: string) {
        this.settings.set('colorTheme', v);
    }

    private initialize(): void {
        // storageDirectory and activeCollection cannot be initialized here.
        // Their value is set later, depending on user action.

        if (!this.settings.has('language')) {
            this.settings.set('language', 'en');
        }

        if (!this.settings.has('colorTheme')) {
            this.settings.set('colorTheme', "default-pink-theme");
        } else {
            let settingsColorThemeName: string = this.settings.get('colorTheme');

            // Check if the color theme which is saved in the settings still exists 
            // in the app (The color themes might change between releases).
            // If not, reset the color theme setting to the default color theme.
            if (!Constants.colorThemes.map(x => x.name).includes(settingsColorThemeName)) {
                this.settings.set('colorTheme', "default-pink-theme");
            }
        }
    }
}