import * as assert from 'assert';
import * as TypeMoq from "typemoq";
import { Times } from "typemoq";
import { AppearanceService } from '../../app/services/appearance/appearance.service';
import { TranslatorService } from '../../app/services/translator/translator.service';
import { AppComponent } from '../../app/app.component';
import { ConvertService } from '../../app/services/convert/convert.service';

describe('AppComponent', () => {
    describe('constructor', () => {
        it('Should apply language', () => {
            // Arrange
            let appearanceServiceMock = TypeMoq.Mock.ofType<AppearanceService>();
            let translatorServiceMock = TypeMoq.Mock.ofType<TranslatorService>();
            let convertServiceMock = TypeMoq.Mock.ofType<ConvertService>();

            // Act
            let appComponent: AppComponent = new AppComponent(translatorServiceMock.object, appearanceServiceMock.object, convertServiceMock.object);

            // Assert
            translatorServiceMock.verify(x => x.applyLanguage(), Times.atLeastOnce());
        });

        it('Should apply theme', () => {
            // Arrange
            let appearanceServiceMock = TypeMoq.Mock.ofType<AppearanceService>();
            let translatorServiceMock = TypeMoq.Mock.ofType<TranslatorService>();
            let convertServiceMock = TypeMoq.Mock.ofType<ConvertService>();

            // Act
            let appComponent: AppComponent = new AppComponent(translatorServiceMock.object, appearanceServiceMock.object, convertServiceMock.object);

            // Assert
            appearanceServiceMock.verify(x => x.applyTheme(), Times.atLeastOnce());
        });
    });
});