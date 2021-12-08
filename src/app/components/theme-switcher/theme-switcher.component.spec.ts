import { IMock, Mock, Times } from 'typemoq';
import { BaseAppearanceService } from '../../services/appearance/base-appearance.service';
import { Theme } from '../../services/appearance/theme/theme';
import { ThemeCoreColors } from '../../services/appearance/theme/theme-core-colors';
import { ThemeCreator } from '../../services/appearance/theme/theme-creator';
import { ThemeNeutralColors } from '../../services/appearance/theme/theme-neutral-colors';
import { ThemeOptions } from '../../services/appearance/theme/theme-options';
import { ThemeSwitcherComponent } from './theme-switcher.component';

describe('ColorSchemeSwitcherComponent', () => {
    let appearanceServiceMock: IMock<BaseAppearanceService> = Mock.ofType<BaseAppearanceService>();

    let component: ThemeSwitcherComponent;

    beforeEach(() => {
        appearanceServiceMock = Mock.ofType<BaseAppearanceService>();

        component = new ThemeSwitcherComponent(appearanceServiceMock.object);
    });

    describe('constructor', () => {
        it('should create', () => {
            // Arrange

            // Act

            // Assert
            expect(component).toBeDefined();
        });

        it('should define appearanceService', () => {
            // Arrange

            // Act

            // Assert
            expect(component.appearanceService).toBeDefined();
        });
    });

    describe('setTheme', () => {
        it('should change the selected theme', () => {
            // Arrange
            const themeCreator: ThemeCreator = new ThemeCreator('My creator', 'my@email.com');
            const coreColors: ThemeCoreColors = new ThemeCoreColors('red', 'green', 'blue');
            const darkColors: ThemeNeutralColors = new ThemeNeutralColors(
                '#0000000',
                '#0111111',
                '#0222222',
                '#0333333',
                '#0444444',
                '#0555555',
                '#0666666',
                '#0777777',
                '#0888888',
                '#0999999'
            );
            const lightColors: ThemeNeutralColors = new ThemeNeutralColors(
                '#1000000',
                '#1111111',
                '#1222222',
                '#1333333',
                '#1444444',
                '#1555555',
                '#1666666',
                '#1777777',
                '#1888888',
                '#1999999'
            );

            const options: ThemeOptions = new ThemeOptions();

            // Act
            const defaultColorScheme: Theme = new Theme('My theme', themeCreator, coreColors, darkColors, lightColors, options);
            component.setTheme(defaultColorScheme);

            // Assert
            appearanceServiceMock.verify((x) => (x.selectedTheme = defaultColorScheme), Times.once());
        });
    });
});
