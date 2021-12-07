import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApplicationPaths } from '../../common/application-paths';
import { BaseRemoteProxy } from '../../common/base-remote-proxy';
import { Constants } from '../../common/constants';
import { Desktop } from '../../common/desktop';
import { DocumentProxy } from '../../common/document-proxy';
import { FileSystem } from '../../common/file-system';
import { FontSize } from '../../common/font-size';
import { Logger } from '../../common/logger';
import { BaseSettings } from '../../common/settings/base-settings';
import { Strings } from '../../common/strings';
import { DefaultThemesCreator } from './default-themes-creator';
import { Palette } from './palette';
import { Theme } from './theme/theme';

@Injectable()
export class AppearanceService {
    private interval: number;
    private _themes: Theme[] = [];

    private _windowHasNativeTitleBar: boolean;
    private _selectedTheme: Theme;
    private _selectedFontSize: FontSize;
    private subscription: Subscription = new Subscription();

    private _themesDirectoryPath: string;

    constructor(
        private settings: BaseSettings,
        private logger: Logger,
        private overlayContainer: OverlayContainer,
        private remoteProxy: BaseRemoteProxy,
        private fileSystem: FileSystem,
        private desktop: Desktop,
        private defaultThemesCreator: DefaultThemesCreator,
        private documentProxy: DocumentProxy
    ) {
        this.initialize();
    }

    public get windowHasNativeTitleBar(): boolean {
        return this._windowHasNativeTitleBar;
    }

    public get followSystemColor(): boolean {
        return this.settings.followSystemColor;
    }

    public set followSystemColor(v: boolean) {
        this.settings.followSystemColor = v;
        this.applyTheme();
    }

    public get themes(): Theme[] {
        return this._themes;
    }

    public set themes(v: Theme[]) {
        this._themes = v;
    }

    public get selectedTheme(): Theme {
        return this._selectedTheme;
    }

    public set selectedTheme(v: Theme) {
        this._selectedTheme = v;
        this.settings.theme = v.name;
        this.applyTheme();
    }

    public fontSizes: FontSize[] = Constants.fontSizes;

    public get selectedFontSize(): FontSize {
        return this._selectedFontSize;
    }

    public set selectedFontSize(v: FontSize) {
        this._selectedFontSize = v;
        this.settings.fontSize = v.normalSize;
        this.applyFontSize();
    }

    public get themesDirectoryPath(): string {
        return this._themesDirectoryPath;
    }

    public refreshThemes(): void {
        this.ensureDefaultThemesExist();
        this._themes = this.getThemesFromThemesDirectory();
        this.setSelectedThemeFromSettings();
        this.applyTheme();
    }

    public applyAppearance(): void {
        this.applyTheme();
        this.applyFontSize();
    }

    public startWatchingThemesDirectory(): void {
        this.interval = window.setInterval(() => {
            this.checkIfThemesDirectoryHasChanged();
        }, 2000);
    }

    public stopWatchingThemesDirectory(): void {
        clearInterval(this.interval);
    }

    private initialize(): void {
        this._windowHasNativeTitleBar = this.remoteProxy.getGlobal('windowHasFrame');

        this._themesDirectoryPath = this.getThemesDirectoryPath();
        this.ensureThemesDirectoryExists();
        this.ensureDefaultThemesExist();
        this._themes = this.getThemesFromThemesDirectory();
        this.setSelectedThemeFromSettings();

        this.setSelectedFontSizeFromSettings();

        this.addSubscriptions();
    }

    private checkIfThemesDirectoryHasChanged(): void {
        const themeFiles: string[] = this.fileSystem.getFilesInDirectory(this.themesDirectoryPath);
        if (themeFiles.length !== this.themes.length) {
            this.refreshThemes();
        }
    }

    private applyFontSize(): void {
        const element: HTMLElement = this.documentProxy.getDocumentElement();
        element.style.setProperty('--fontsize-normal', this._selectedFontSize.normalSize + 'px');
        element.style.setProperty('--fontsize-larger', this._selectedFontSize.largerSize + 'px');
        element.style.setProperty('--fontsize-largest', this._selectedFontSize.largestSize + 'px');
    }

    private addSubscriptions(): void {
        this.subscription.add(
            this.desktop.accentColorChanged$.subscribe(() => {
                this.applyTheme();
            })
        );
    }

    private applyTheme(): void {
        const element: HTMLElement = this.documentProxy.getDocumentElement();

        // Color
        let accentColorToApply: string = this.selectedTheme.coreColors.accentColor;

        if (this.settings.followSystemColor) {
            const systemAccentColor: string = this.getSystemAccentColor();

            if (!Strings.isNullOrWhiteSpace(systemAccentColor)) {
                accentColorToApply = systemAccentColor;
            }
        }

        const palette: Palette = new Palette(accentColorToApply);

        // Core colors
        element.style.setProperty('--theme-accent-color', accentColorToApply);

        element.style.setProperty('--theme-accent-color-50', palette.color50);
        element.style.setProperty('--theme-accent-color-100', palette.color100);
        element.style.setProperty('--theme-accent-color-200', palette.color200);
        element.style.setProperty('--theme-accent-color-300', palette.color300);
        element.style.setProperty('--theme-accent-color-400', palette.color400);
        element.style.setProperty('--theme-accent-color-500', palette.color500);
        element.style.setProperty('--theme-accent-color-600', palette.color600);
        element.style.setProperty('--theme-accent-color-700', palette.color700);
        element.style.setProperty('--theme-accent-color-800', palette.color800);
        element.style.setProperty('--theme-accent-color-900', palette.color900);
        element.style.setProperty('--theme-accent-color-A100', palette.colorA100);
        element.style.setProperty('--theme-accent-color-A200', palette.colorA200);
        element.style.setProperty('--theme-accent-color-A400', palette.colorA400);
        element.style.setProperty('--theme-accent-color-A700', palette.colorA700);

        // Neutral colors
        // element.style.setProperty('--theme-window-button-icon', this.selectedTheme.darkColors.windowButtonIcon);
        // element.style.setProperty('--theme-hovered-item-background', this.selectedTheme.darkColors.hoveredItemBackground);
        // element.style.setProperty('--theme-selected-item-background', this.selectedTheme.darkColors.selectedItemBackground);
        // element.style.setProperty('--theme-selected-item-text', this.selectedTheme.darkColors.selectedItemText);
        // element.style.setProperty('--theme-tab-text', this.selectedTheme.darkColors.tabText);
        // element.style.setProperty('--theme-selected-tab-text', this.selectedTheme.darkColors.selectedTabText);
        // element.style.setProperty('--theme-main-background', this.selectedTheme.darkColors.mainBackground);
        // element.style.setProperty('--theme-header-background', this.selectedTheme.darkColors.headerBackground);
        // element.style.setProperty('--theme-footer-background', this.selectedTheme.darkColors.footerBackground);
        // element.style.setProperty('--theme-side-pane-background', this.selectedTheme.darkColors.sidePaneBackground);
        // element.style.setProperty('--theme-primary-text', this.selectedTheme.darkColors.primaryText);
        // element.style.setProperty('--theme-secondary-text', this.selectedTheme.darkColors.secondaryText);
        // element.style.setProperty('--theme-breadcrumb-background', this.selectedTheme.darkColors.breadcrumbBackground);
        // element.style.setProperty('--theme-slider-background', this.selectedTheme.darkColors.sliderBackground);
        // element.style.setProperty('--theme-slider-thumb-background', this.selectedTheme.darkColors.sliderThumbBackground);
        // element.style.setProperty('--theme-album-cover-logo', this.selectedTheme.darkColors.albumCoverLogo);
        // element.style.setProperty('--theme-album-cover-background', this.selectedTheme.darkColors.albumCoverBackground);
        // element.style.setProperty('--theme-pane-separators', this.selectedTheme.darkColors.paneSeparators);
        // element.style.setProperty('--theme-settings-separators', this.selectedTheme.darkColors.settingsSeparators);
        // element.style.setProperty('--theme-scroll-bars', scrollBarColorToApply);
        // element.style.setProperty('--theme-search-box', this.selectedTheme.darkColors.searchBox);
        // element.style.setProperty('--theme-search-box-text', this.selectedTheme.darkColors.searchBoxText);
        // element.style.setProperty('--theme-search-box-icon', this.selectedTheme.darkColors.searchBoxIcon);

        // CSS theme template
        const templateThemeName: string = 'template-theme';

        // Apply theme to components in the overlay container: https://gist.github.com/tomastrajan/ee29cd8e180b14ce9bc120e2f7435db7
        this.applyThemeClasses(this.overlayContainer.getContainerElement(), templateThemeName);

        // Apply theme to body
        this.applyThemeClasses(this.documentProxy.getBody(), templateThemeName);

        this.logger.info(
            `Applied theme name=${this.selectedTheme.name}' and theme classes='${templateThemeName}'`,
            'AppearanceService',
            'applyTheme'
        );
    }

    private setSelectedThemeFromSettings(): void {
        let themeFromSettings: Theme = this.themes.find((x) => x.name === this.settings.theme);

        if (themeFromSettings == undefined) {
            themeFromSettings = this.themes.find((x) => x.name === 'Dopamine');

            if (themeFromSettings == undefined) {
                themeFromSettings = this.themes[0];
            }

            this.logger.info(
                `Theme '${this.settings.theme}' from settings was not found. Applied theme '${themeFromSettings.name}' instead.`,
                'AppearanceService',
                'setSelectedThemeFromSettings'
            );
        }

        this._selectedTheme = themeFromSettings;
    }

    private setSelectedFontSizeFromSettings(): void {
        this._selectedFontSize = this.fontSizes.find((x) => x.normalSize === this.settings.fontSize);
    }

    private applyThemeClasses(element: HTMLElement, themeName: string): void {
        const classesToRemove: string[] = Array.from(element.classList).filter((item: string) => item.includes('-theme-'));

        if (classesToRemove != undefined && classesToRemove.length > 0) {
            element.classList.remove(...classesToRemove);
        }

        element.classList.add(themeName);
    }

    private getSystemAccentColor(): string {
        let systemAccentColor: string = '';

        try {
            const systemAccentColorWithTransparency: string = this.desktop.getAccentColor();
            systemAccentColor = '#' + systemAccentColorWithTransparency.substr(0, 6);
        } catch (e) {
            this.logger.error(`Could not get system accent color. Error: ${e.message}`, 'AppearanceService', 'getSystemAccentColor');
        }

        return systemAccentColor;
    }

    private ensureThemesDirectoryExists(): void {
        this.fileSystem.createFullDirectoryPathIfDoesNotExist(this.themesDirectoryPath);
    }

    private ensureDefaultThemesExist(): void {
        const defaultThemes: Theme[] = this.defaultThemesCreator.createAllThemes();

        for (const defaultTheme of defaultThemes) {
            const themeFilePath: string = this.fileSystem.combinePath([this.themesDirectoryPath, `${defaultTheme.name}.theme`]);
            const stringifiedTheme: string = JSON.stringify(defaultTheme, undefined, 2);
            this.fileSystem.writeToFile(themeFilePath, stringifiedTheme);
        }
    }

    private getThemesFromThemesDirectory(): Theme[] {
        const themeFiles: string[] = this.fileSystem.getFilesInDirectory(this.themesDirectoryPath);
        const themes: Theme[] = [];

        for (const themeFile of themeFiles) {
            const themeFileContent: string = this.fileSystem.getFileContent(themeFile);

            try {
                const theme: Theme = JSON.parse(themeFileContent);
                themes.push(theme);
            } catch (e) {
                this.logger.error(`Could not parse theme file. Error: ${e.message}`, 'AppearanceService', 'getThemesFromThemesDirectory');
            }
        }

        return themes;
    }

    private getThemesDirectoryPath(): string {
        const applicationDirectory: string = this.fileSystem.applicationDataDirectory();
        const themesDirectoryPath: string = this.fileSystem.combinePath([applicationDirectory, ApplicationPaths.themesFolder]);

        return themesDirectoryPath;
    }
}
