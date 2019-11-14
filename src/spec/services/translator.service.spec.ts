import * as assert from 'assert';
import * as TypeMoq from "typemoq";
import { TranslatorService } from '../../app/services/translator/translator.service';
import { TranslateService } from '@ngx-translate/core';
import { Settings } from '../../app/core/settings';
import { Times } from 'typemoq';
import { Language } from '../../app/core/language';

describe('TranslatorService', () => {
    describe('constructor', () => {
        it('Should provide a list of languages', () => {
            // Arrange
            let translateServiceMock = TypeMoq.Mock.ofType<TranslateService>();
            let settingsMock = TypeMoq.Mock.ofType<Settings>();

            // Act
            let translator: TranslatorService = new TranslatorService(translateServiceMock.object, settingsMock.object);

            // Assert
            assert.ok(translator.languages.length > 0);
        });

        it('Should apply the default language', () => {
            // Arrange
            let translateServiceMock = TypeMoq.Mock.ofType<TranslateService>();
            let settingsMock = TypeMoq.Mock.ofType<Settings>();
            settingsMock.setup(x => x.defaultLanguage).returns(() => "en");

            // Act
            let translator: TranslatorService = new TranslatorService(translateServiceMock.object, settingsMock.object);

            // Assert
            translateServiceMock.verify(x => x.setDefaultLang("en"), Times.atLeastOnce());
        });  
    });

    describe('applyLanguage', () => {
        it('Should apply the language from the settings', () => {
            // Arrange
            let translateServiceMock = TypeMoq.Mock.ofType<TranslateService>();
            let settingsMock = TypeMoq.Mock.ofType<Settings>();

            settingsMock.setup(x => x.language).returns(() => "en");

            let translator: TranslatorService = new TranslatorService(translateServiceMock.object, settingsMock.object);

            // Act
            translator.applyLanguage();


            // Assert
            translateServiceMock.verify(x => x.use("en"), Times.atLeastOnce());
        });
    });

    describe('selectedLanguage', () => {
        it('Should save the selected language in the settings', () => {
            // Arrange
            let translateServiceMock = TypeMoq.Mock.ofType<TranslateService>();
            let settingsMock = TypeMoq.Mock.ofType<Settings>();

            let translator: TranslatorService = new TranslatorService(translateServiceMock.object, settingsMock.object);

            // Act
            let lang: Language = new Language("de", "German", "Deutch");
            translator.selectedLanguage = lang;


            // Assert
            settingsMock.verify(x => x.language = "de", Times.atLeastOnce());
        });

        it('Should apply the selected language', () => {
            // Arrange
            let translateServiceMock = TypeMoq.Mock.ofType<TranslateService>();
            let settingsMock = TypeMoq.Mock.ofType<Settings>();

            let translator: TranslatorService = new TranslatorService(translateServiceMock.object, settingsMock.object);

            // Act
            let lang: Language = new Language("de", "German", "Deutch");
            translator.selectedLanguage = lang;


            // Assert
            translateServiceMock.verify(x => x.use("de"), Times.atLeastOnce());
        });

        it('Should get the selected language', () => {
            // Arrange
            let translateServiceMock = TypeMoq.Mock.ofType<TranslateService>();
            let settingsMock = TypeMoq.Mock.ofType<Settings>();

            settingsMock.setup(x => x.language).returns(() => "de");
            
            let translator: TranslatorService = new TranslatorService(translateServiceMock.object, settingsMock.object);
            translator.languages = [new Language("en", "English", "English"), new Language("de", "German", "Deutch")];

            // Act
            let selectedLanguage: Language = translator.selectedLanguage;

            // Assert
            assert.equal(selectedLanguage.code, "de");
            assert.equal(selectedLanguage.englishName, "German");
            assert.equal(selectedLanguage.localizedName, "Deutch");
        });
    });
});