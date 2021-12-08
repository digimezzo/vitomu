import { Language } from '../../common/language';

export abstract class BaseTranslatorService {
    public abstract languages: Language[];
    public abstract selectedLanguage: Language;
    public abstract applyLanguage(): void;
    public abstract getAsync(key: string | Array<string>, interpolateParams?: Object): Promise<string>;
}
