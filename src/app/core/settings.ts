import { Injectable } from '@angular/core';
import * as Store from 'electron-store';
import { Constants } from './constants';
import * as os from 'os';

@Injectable()
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

    // Audio format
    public get audioFormat(): string {
        return this.settings.get('audioFormat');
    }

    public set audioFormat(v: string) {
        this.settings.set('audioFormat', v);
    }

    // Bitrate
    public get audioBitrate(): number {
        return this.settings.get('audioBitrate');
    }

    public set audioBitrate(v: number) {
        this.settings.set('audioBitrate', v);
    }

    // Custom title bar
    public get useCustomTitleBar(): boolean {
        return this.settings.get('useCustomTitleBar');
    }

    public set useCustomTitleBar(v: boolean) {
        this.settings.set('useCustomTitleBar', v);
    }

    // FontSize
    public get fontSize(): number {
        return this.settings.get('fontSize');
    }

    public set fontSize(v: number) {
        this.settings.set('fontSize', v);
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

        if (!this.settings.has('audioFormat')) {
            this.settings.set('audioFormat', 'mp3');
        }

        if (!this.settings.has('audioBitrate')) {
            this.settings.set('audioBitrate', 320);
        }

        if (!this.settings.has('useCustomTitleBar')) {
            if (os.platform() === 'win32') {
                this.settings.set('useCustomTitleBar', true);
            } else {
                this.settings.set('useCustomTitleBar', false);
            }
        }

        if (!this.settings.has('fontSize')) {
            this.settings.set('fontSize', 13);
        }

        if (!this.settings.has('colorTheme')) {
            this.settings.set('colorTheme', 'default-pink-theme');
        } else {
            const settingsColorThemeName: string = this.settings.get('colorTheme');

            // Check if the color theme which is saved in the settings still exists
            // in the app (The color themes might change between releases).
            // If not, reset the color theme setting to the default color theme.
            if (!Constants.colorThemes.map(x => x.name).includes(settingsColorThemeName)) {
                this.settings.set('colorTheme', 'default-pink-theme');
            }
        }
    }
}
