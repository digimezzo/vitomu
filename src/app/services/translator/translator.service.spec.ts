import { TranslateService } from '@ngx-translate/core';
import * as assert from 'assert';
import { Mock, Times } from 'typemoq';
import { Settings } from '../../common/settings/settings';
import { Language } from '../appearance/theme/language';
import { BaseTranslatorService } from './base-translator.service';
import { TranslatorService } from './translator.service';

describe('TranslatorService', () => {
    describe('constructor', () => {
        it('Should provide a list of languages', () => {
            // Arrange
            const translateServiceMock = Mock.ofType<TranslateService>();
            const settingsMock = Mock.ofType<Settings>();

            // Act
            const translatorService: BaseTranslatorService = new TranslatorService(translateServiceMock.object, settingsMock.object);

            // Assert
            assert.ok(translatorService.languages.length > 0);
        });

        it('Should apply the default language', () => {
            // Arrange
            const translateServiceMock = Mock.ofType<TranslateService>();
            const settingsMock = Mock.ofType<Settings>();
            settingsMock.setup((x) => x.defaultLanguage).returns(() => 'en');

            // Act
            const translatorService: BaseTranslatorService = new TranslatorService(translateServiceMock.object, settingsMock.object);

            // Assert
            translateServiceMock.verify((x) => x.setDefaultLang('en'), Times.atLeastOnce());
        });
    });

    describe('applyLanguage', () => {
        it('Should apply the language from the settings', () => {
            // Arrange
            const translateServiceMock = Mock.ofType<TranslateService>();
            const settingsMock = Mock.ofType<Settings>();

            settingsMock.setup((x) => x.language).returns(() => 'en');

            const translatorService: BaseTranslatorService = new TranslatorService(translateServiceMock.object, settingsMock.object);

            // Act
            translatorService.applyLanguage();

            // Assert
            translateServiceMock.verify((x) => x.use('en'), Times.atLeastOnce());
        });
    });

    describe('selectedLanguage', () => {
        it('Should save the selected language in the settings', () => {
            // Arrange
            const translateServiceMock = Mock.ofType<TranslateService>();
            const settingsMock = Mock.ofType<Settings>();

            const translatorService: BaseTranslatorService = new TranslatorService(translateServiceMock.object, settingsMock.object);

            // Act
            const lang: Language = new Language('de', 'German', 'Deutch');
            translatorService.selectedLanguage = lang;

            // Assert
            settingsMock.verify((x) => (x.language = 'de'), Times.atLeastOnce());
        });

        it('Should apply the selected language', () => {
            // Arrange
            const translateServiceMock = Mock.ofType<TranslateService>();
            const settingsMock = Mock.ofType<Settings>();

            const translatorService: BaseTranslatorService = new TranslatorService(translateServiceMock.object, settingsMock.object);

            // Act
            const lang: Language = new Language('de', 'German', 'Deutch');
            translatorService.selectedLanguage = lang;

            // Assert
            translateServiceMock.verify((x) => x.use('de'), Times.atLeastOnce());
        });

        it('Should get the selected language', () => {
            // Arrange
            const translateServiceMock = Mock.ofType<TranslateService>();
            const settingsMock = Mock.ofType<Settings>();

            settingsMock.setup((x) => x.language).returns(() => 'de');

            const translatorService: BaseTranslatorService = new TranslatorService(translateServiceMock.object, settingsMock.object);
            translatorService.languages = [new Language('en', 'English', 'English'), new Language('de', 'German', 'Deutch')];

            // Act
            const selectedLanguage: Language = translatorService.selectedLanguage;

            // Assert
            assert.equal(selectedLanguage.code, 'de');
            assert.equal(selectedLanguage.englishName, 'German');
            assert.equal(selectedLanguage.localizedName, 'Deutch');
        });
    });
});
