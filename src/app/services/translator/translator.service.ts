import { Injectable } from '@angular/core';
import { Constants } from '../../common/application/constants';
import { TranslateServiceProxy } from '../../common/io/translate-service-proxy';
import { BaseSettings } from '../../common/settings/base-settings';
import { Language } from '../appearance/theme/language';

@Injectable({
    providedIn: 'root'
})
export class TranslatorService {
    public constructor(
        private translateServiceProxy: TranslateServiceProxy,
        private settings: BaseSettings
    ) {
        this.translateServiceProxy.setDefaultLang(this.settings.defaultLanguage);
    }

    public languages: Language[] = Constants.languages;

    public get selectedLanguage(): Language {
        return this.languages.find((x) => x.code === this.settings.language) ?? this.languages.find((x) => x.code === 'en')!;
    }

    public set selectedLanguage(v: Language) {
        this.settings.language = v.code;
        this.applyLanguageAsync();
    }

    public async applyLanguageAsync(): Promise<void> {
        await this.translateServiceProxy.use(this.settings.language);
    }

    public async getAsync(key: string | Array<string>, interpolateParams?: object): Promise<string> {
        return await this.translateServiceProxy.get(key, interpolateParams);
    }

    public get(key: string | Array<string>, interpolateParams?: object): string {
        return this.translateServiceProxy.instant(key, interpolateParams);
    }
}
