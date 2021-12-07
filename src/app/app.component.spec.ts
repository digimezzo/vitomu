import { Mock, Times } from 'typemoq';
import { AppComponent } from './app.component';
import { AppearanceService } from './services/appearance/appearance.service';
import { TranslatorService } from './services/translator/translator.service';

describe('AppComponent', () => {
    describe('constructor', () => {
        it('Should apply language', () => {
            // Arrange
            const appearanceServiceMock = Mock.ofType<AppearanceService>();
            const translatorServiceMock = Mock.ofType<TranslatorService>();

            // Act
            const appComponent: AppComponent = new AppComponent(translatorServiceMock.object, appearanceServiceMock.object);

            // Assert
            translatorServiceMock.verify((x) => x.applyLanguage(), Times.once());
        });

        it('Should apply appearance', () => {
            // Arrange
            const appearanceServiceMock = Mock.ofType<AppearanceService>();
            const translatorServiceMock = Mock.ofType<TranslatorService>();

            // Act
            const appComponent: AppComponent = new AppComponent(translatorServiceMock.object, appearanceServiceMock.object);

            // Assert
            appearanceServiceMock.verify((x) => x.applyAppearance(), Times.once());
        });
    });
});
