import * as assert from 'assert';
import { Mock, Times } from 'typemoq';
import { Settings } from '../../common/settings/settings';
import { Language } from '../appearance/theme/language';
import { TranslatorService } from './translator.service';
import { TranslateServiceProxy } from '../../common/io/translate-service-proxy';

describe('TranslatorService', () => {
    describe('constructor', () => {
        it('Should provide a list of languages', () => {
            // Arrange
            const translateServiceProxyMock = Mock.ofType<TranslateServiceProxy>();
            const settingsMock = Mock.ofType<Settings>();

            // Act
            const translatorService: TranslatorService = new TranslatorService(translateServiceProxyMock.object, settingsMock.object);

            // Assert
            assert.ok(translatorService.languages.length > 0);
        });

        it('Should apply the default language', () => {
            // Arrange
            const translateServiceProxyMock = Mock.ofType<TranslateServiceProxy>();
            const settingsMock = Mock.ofType<Settings>();
            settingsMock.setup((x) => x.defaultLanguage).returns(() => 'en');

            // Act
            const translatorService: TranslatorService = new TranslatorService(translateServiceProxyMock.object, settingsMock.object);

            // Assert
            translateServiceProxyMock.verify((x) => x.setDefaultLang('en'), Times.atLeastOnce());
        });
    });

    describe('applyLanguage', () => {
        it('Should apply the language from the settings', async () => {
            // Arrange
            const translateServiceProxyMock = Mock.ofType<TranslateServiceProxy>();
            const settingsMock = Mock.ofType<Settings>();

            settingsMock.setup((x) => x.language).returns(() => 'en');

            const translatorService: TranslatorService = new TranslatorService(translateServiceProxyMock.object, settingsMock.object);

            // Act
            await translatorService.applyLanguageAsync();

            // Assert
            translateServiceProxyMock.verify((x) => x.use('en'), Times.atLeastOnce());
        });
    });

    describe('selectedLanguage', () => {
        it('Should save the selected language in the settings', () => {
            // Arrange
            const translateServiceProxyMock = Mock.ofType<TranslateServiceProxy>();
            const settingsMock = Mock.ofType<Settings>();

            const translatorService: TranslatorService = new TranslatorService(translateServiceProxyMock.object, settingsMock.object);

            // Act
            translatorService.selectedLanguage = new Language('de', 'German', 'Deutch');

            // Assert
            settingsMock.verify((x) => (x.language = 'de'), Times.atLeastOnce());
        });

        it('Should apply the selected language', () => {
            // Arrange
            const translateServiceProxyMock = Mock.ofType<TranslateServiceProxy>();
            const settingsMock: any = { language: 'en' };
            const translatorService: TranslatorService = new TranslatorService(translateServiceProxyMock.object, settingsMock);

            // Act
            translatorService.selectedLanguage = new Language('de', 'German', 'Deutch');

            // Assert
            translateServiceProxyMock.verify((x) => x.use('de'), Times.atLeastOnce());
        });

        it('Should get the selected language if found in the available languages', () => {
            // Arrange
            const translateServiceProxyMock = Mock.ofType<TranslateServiceProxy>();
            const settingsMock = Mock.ofType<Settings>();

            settingsMock.setup((x) => x.language).returns(() => 'de');

            const translatorService: TranslatorService = new TranslatorService(translateServiceProxyMock.object, settingsMock.object);
            translatorService.languages = [new Language('en', 'English', 'English'), new Language('de', 'German', 'Deutch')];

            // Act
            const selectedLanguage: Language = translatorService.selectedLanguage;

            // Assert
            assert.equal(selectedLanguage.code, 'de');
            assert.equal(selectedLanguage.englishName, 'German');
            assert.equal(selectedLanguage.localizedName, 'Deutch');
        });

        it('Should get the English language if not found in the available languages', () => {
            // Arrange
            const translateServiceProxyMock = Mock.ofType<TranslateServiceProxy>();
            const settingsMock = Mock.ofType<Settings>();

            settingsMock.setup((x) => x.language).returns(() => 'de');

            const translatorService: TranslatorService = new TranslatorService(translateServiceProxyMock.object, settingsMock.object);
            translatorService.languages = [new Language('en', 'English', 'English'), new Language('nl', 'Dutch', 'Nederlands')];

            // Act
            const selectedLanguage: Language = translatorService.selectedLanguage;

            // Assert
            assert.equal(selectedLanguage.code, 'en');
            assert.equal(selectedLanguage.englishName, 'English');
            assert.equal(selectedLanguage.localizedName, 'English');
        });
    });
});
