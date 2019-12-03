import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './services/electron.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { Logger } from './core/logger';
import { Settings } from './core/settings';
import { WindowControlsComponent } from './components/window-controls/window-controls.component';

import { MatTooltipModule, MatDialogModule, MatTabsModule, MatSelectModule, MatButtonModule, MatProgressSpinnerModule, MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GlobalErrorHandler } from './global-error-handler';
import { SettingsComponent } from './components/settings/settings.component';
import { AboutComponent } from './components/about/about.component';
import { ConvertComponent } from './components/convert/convert.component';
import { ColorThemeSwitcherComponent } from './components/color-theme-switcher/color-theme-switcher.component';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';
import { ErrorDialogComponent } from './components/dialogs/error-dialog/error-dialog.component';
import { TranslatorService } from './services/translator/translator.service';
import { AppearanceService } from './services/appearance/appearance.service';
import { ConvertService } from './services/convert/convert.service';
import { LogoFullComponent } from './components/logo-full/logo-full.component';
import { LicenseDialogComponent } from './components/dialogs/license-dialog/license-dialog.component';
import { FFmpegChecker } from './services/convert/ffmpeg-checker';
import { FileSystem } from './core/file-system';
import { FFmpegDownloader } from './services/convert/ffmpeg-downloader';
import { Desktop } from './core/desktop';
import { ClipboardWatcher } from './core/clipboard-watcher';
import { SnackBarService } from './services/snack-bar/snack-bar.service';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
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
    Logger, 
    Settings,
    FileSystem,
    Desktop,
    ClipboardWatcher,
    FFmpegDownloader,
    FFmpegChecker,
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
