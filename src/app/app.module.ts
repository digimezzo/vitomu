import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatProgressSpinnerModule, MatSelectModule, MatSnackBarModule, MatTabsModule, MatTooltipModule, MatSlideToggleModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import 'reflect-metadata';
import '../polyfills';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { AudioBitrateSwitcherComponent } from './components/audio-bitrate-switcher/audio-bitrate-switcher.component';
import { AudioFormatSwitcherComponent } from './components/audio-format-switcher/audio-format-switcher.component';
import { ColorThemeSwitcherComponent } from './components/color-theme-switcher/color-theme-switcher.component';
import { FontSizeSwitcherComponent } from './components/font-size-switcher/font-size-switcher.component';
import { ConvertComponent } from './components/convert/convert.component';
import { ErrorDialogComponent } from './components/dialogs/error-dialog/error-dialog.component';
import { LicenseDialogComponent } from './components/dialogs/license-dialog/license-dialog.component';
import { HomeComponent } from './components/home/home.component';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';
import { LogoFullComponent } from './components/logo-full/logo-full.component';
import { SettingsComponent } from './components/settings/settings.component';
import { WindowControlsComponent } from './components/window-controls/window-controls.component';
import { ClipboardWatcher } from './core/clipboard-watcher';
import { Delayer } from './core/delayer';
import { Desktop } from './core/desktop';
import { FileSystem } from './core/file-system';
import { Logger } from './core/logger';
import { Settings } from './core/settings';
import { WebviewDirective } from './directives/webview.directive';
import { GlobalErrorHandler } from './global-error-handler';
import { AppearanceService } from './services/appearance/appearance.service';
import { ConvertService } from './services/convert/convert.service';
import { FFmpegChecker } from './services/convert/ffmpeg-checker';
import { FFmpegDownloader } from './services/convert/ffmpeg-downloader';
import { ElectronService } from './services/electron.service';
import { SnackBarService } from './services/snack-bar/snack-bar.service';
import { TranslatorService } from './services/translator/translator.service';
import { VideoConverterFactory } from './services/convert/video-converter.factory';
import { GitHubApi } from './core/github-api';
import { ProductDetails } from './core/product-details';
import { UpdateService } from './services/update/update.service';
import { ElectronRemoteProxy } from './core/electron-remote-proxy';

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
    ColorThemeSwitcherComponent,
    FontSizeSwitcherComponent,
    AudioBitrateSwitcherComponent,
    AudioFormatSwitcherComponent,
    LanguageSwitcherComponent,
    ErrorDialogComponent,
    LicenseDialogComponent,
    LogoFullComponent,
    WebviewDirective
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
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    ElectronService,
    TranslatorService,
    AppearanceService,
    ConvertService,
    SnackBarService,
    UpdateService,
    Logger,
    Settings,
    FileSystem,
    Desktop,
    Delayer,
    ClipboardWatcher,
    FFmpegDownloader,
    FFmpegChecker,
    GitHubApi,
    ElectronRemoteProxy,
    ProductDetails,
    VideoConverterFactory,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    LicenseDialogComponent, ErrorDialogComponent
  ],
})
export class AppModule { }
