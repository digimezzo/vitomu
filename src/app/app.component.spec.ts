import { Mock, Times } from 'typemoq';
import { AppComponent } from './app.component';
import { TranslatorService } from './services/translator/translator.service';
import { Desktop } from './common/io/desktop';
import { AppearanceService } from './services/appearance/appearance.service';

jest.mock('@electron/remote', () => ({ exec: jest.fn() }));

describe('AppComponent', () => {
    describe('constructor', () => {
        it('Should create', () => {
            // Arrange
            const appearanceServiceMock = Mock.ofType<AppearanceService>();
            const translatorServiceMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            // Act
            const appComponent: AppComponent = new AppComponent(
                translatorServiceMock.object, 
                appearanceServiceMock.object, 
                desktopMock.object);

            // Assert
            expect(appComponent).toBeDefined();
        });
    });

    describe('ngOnInit', () => {
        it('Should apply language', () => {
            // Arrange
            const appearanceServiceMock = Mock.ofType<AppearanceService>();
            const translatorServiceMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();

            const appComponent: AppComponent = new AppComponent(
                translatorServiceMock.object,
                appearanceServiceMock.object,
                desktopMock.object);

            // Act
            appComponent.ngOnInit();

            // Assert
            translatorServiceMock.verify((x) => x.applyLanguageAsync(), Times.once());
        });

        it('Should apply appearance', () => {
            // Arrange
            const appearanceServiceMock = Mock.ofType<AppearanceService>();
            const translatorServiceMock = Mock.ofType<TranslatorService>();
            const desktopMock = Mock.ofType<Desktop>();
            
            const appComponent: AppComponent = new AppComponent(
                translatorServiceMock.object,
                appearanceServiceMock.object,
                desktopMock.object);

            // Act
            appComponent.ngOnInit();

            // Assert
            appearanceServiceMock.verify((x) => x.applyAppearance(), Times.once());
        });
    });
});
