import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTooltipModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import 'reflect-metadata';
import '../polyfills';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GitHubApi } from './common/api/github-api';
import { ProductDetails } from './common/application/product-details';
import { Delayer } from './common/delayer';
import { BaseRemoteProxy } from './common/io/base-remote-proxy';
import { ClipboardWatcher } from './common/io/clipboard-watcher';
import { Desktop } from './common/io/desktop';
import { DocumentProxy } from './common/io/document-proxy';
import { ElectronRemoteProxy } from './common/io/electron-remote-proxy';
import { Environment } from './common/io/environment';
import { FileSystem } from './common/io/file-system';
import { RemoteProxy } from './common/io/remote-proxy';
import { Logger } from './common/logger';
import { BaseSettings } from './common/settings/base-settings';
import { Settings } from './common/settings/settings';
import { AboutComponent } from './components/about/about.component';
import { AudioBitrateSwitcherComponent } from './components/audio-bitrate-switcher/audio-bitrate-switcher.component';
import { AudioFormatSwitcherComponent } from './components/audio-format-switcher/audio-format-switcher.component';
import { ConvertComponent } from './components/convert/convert.component';
import { ErrorDialogComponent } from './components/dialogs/error-dialog/error-dialog.component';
import { LicenseDialogComponent } from './components/dialogs/license-dialog/license-dialog.component';
import { FontSizeSwitcherComponent } from './components/font-size-switcher/font-size-switcher.component';
import { HomeComponent } from './components/home/home.component';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';
import { LogoFullComponent } from './components/logo-full/logo-full.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';
import { WindowControlsComponent } from './components/window-controls/window-controls.component';
import { WebviewDirective } from './directives/webview.directive';
import { GlobalErrorHandler } from './global-error-handler';
import { AppearanceService } from './services/appearance/appearance.service';
import { BaseAppearanceService } from './services/appearance/base-appearance.service';
import { DefaultThemesCreator } from './services/appearance/default-themes-creator';
import { BaseConvertService } from './services/convert/base-convert.service';
import { ConvertService } from './services/convert/convert.service';
import { DependencyCheckerFactory } from './services/convert/dependency-checker-factory';
import { FFmpegDownloader } from './services/convert/ffmpeg-downloader';
import { VideoConverterFactory } from './services/convert/video-converter.factory';
import { YoutubeDownloaderDownloader } from './services/convert/youtube-downloader-downloader';
import { YoutubeDownloaderUpdater } from './services/convert/youtube-downloader-updater';
import { ElectronService } from './services/electron.service';
import { BaseSnackBarService } from './services/snack-bar/base-snack-bar.service';
import { SnackBarService } from './services/snack-bar/snack-bar.service';
import { BaseTranslatorService } from './services/translator/base-translator.service';
import { TranslatorService } from './services/translator/translator.service';
import { BaseUpdateService } from './services/update/base-update.service';
import { UpdateService } from './services/update/update.service';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ConvertComponent,
        SettingsComponent,
        AboutComponent,
        WindowControlsComponent,
        ThemeSwitcherComponent,
        FontSizeSwitcherComponent,
        AudioBitrateSwitcherComponent,
        AudioFormatSwitcherComponent,
        LanguageSwitcherComponent,
        ErrorDialogComponent,
        LicenseDialogComponent,
        LogoFullComponent,
        WebviewDirective,
    ],
    imports: [
        MatButtonModule,
        MatTooltipModule,
        MatDialogModule,
        MatTabsModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatSlideToggleModule,
        MatDividerModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
    ],
    providers: [
        ElectronService,
        UpdateService,
        Logger,
        Settings,
        FileSystem,
        Desktop,
        Delayer,
        ClipboardWatcher,
        FFmpegDownloader,
        YoutubeDownloaderDownloader,
        YoutubeDownloaderUpdater,
        GitHubApi,
        ElectronRemoteProxy,
        ProductDetails,
        VideoConverterFactory,
        Environment,
        DependencyCheckerFactory,
        DocumentProxy,
        DefaultThemesCreator,
        { provide: BaseSettings, useClass: Settings },
        { provide: BaseRemoteProxy, useClass: RemoteProxy },
        { provide: BaseAppearanceService, useClass: AppearanceService },
        { provide: BaseConvertService, useClass: ConvertService },
        { provide: BaseSnackBarService, useClass: SnackBarService },
        { provide: BaseTranslatorService, useClass: TranslatorService },
        { provide: BaseUpdateService, useClass: UpdateService },
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandler,
        },
    ],
    bootstrap: [AppComponent],
    entryComponents: [LicenseDialogComponent, ErrorDialogComponent],
})
export class AppModule {}
