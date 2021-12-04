import { Mock, Times } from 'typemoq';
import { AppComponent } from './app.component';
import { AppearanceService } from './services/appearance/appearance.service';
import { ConvertService } from './services/convert/convert.service';
import { TranslatorService } from './services/translator/translator.service';

describe('AppComponent', () => {
    describe('constructor', () => {
        it('Should apply language', () => {
            // Arrange
            const appearanceServiceMock = Mock.ofType<AppearanceService>();
            const translatorServiceMock = Mock.ofType<TranslatorService>();
            const convertServiceMock = Mock.ofType<ConvertService>();

            // Act
            const appComponent: AppComponent = new AppComponent(
                translatorServiceMock.object,
                appearanceServiceMock.object,
                convertServiceMock.object
            );

            // Assert
            translatorServiceMock.verify((x) => x.applyLanguage(), Times.atLeastOnce());
        });

        it('Should apply theme', () => {
            // Arrange
            const appearanceServiceMock = Mock.ofType<AppearanceService>();
            const translatorServiceMock = Mock.ofType<TranslatorService>();
            const convertServiceMock = Mock.ofType<ConvertService>();

            // Act
            const appComponent: AppComponent = new AppComponent(
                translatorServiceMock.object,
                appearanceServiceMock.object,
                convertServiceMock.object
            );

            // Assert
            appearanceServiceMock.verify((x) => x.applyTheme(), Times.atLeastOnce());
        });
    });
});
