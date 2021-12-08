import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from '../../common/constants';
import { Language } from '../../common/language';
import { BaseSettings } from '../../common/settings/base-settings';
import { BaseTranslatorService } from './base-translator.service';

@Injectable({
    providedIn: 'root',
})
export class TranslatorService implements BaseTranslatorService {
    constructor(private translateService: TranslateService, private settings: BaseSettings) {
        this.translateService.setDefaultLang(this.settings.defaultLanguage);
    }

    public languages: Language[] = Constants.languages;

    public get selectedLanguage(): Language {
        return this.languages.find((x) => x.code === this.settings.language);
    }

    public set selectedLanguage(v: Language) {
        this.settings.language = v.code;
        this.translateService.use(v.code);
    }

    public applyLanguage(): void {
        this.translateService.use(this.settings.language);
    }

    public getAsync(key: string | Array<string>, interpolateParams?: Object): Promise<string> {
        return this.translateService.get(key, interpolateParams).toPromise();
    }
}
