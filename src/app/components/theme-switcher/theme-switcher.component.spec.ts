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
                '#000000',
                '#011111',
                '#022222',
                '#033333',
                '#044444',
                '#055555',
                '#066666',
                '#077777',
                '#088888',
                '#099999',
                '#0fffff'
            );
            const lightColors: ThemeNeutralColors = new ThemeNeutralColors(
                '#100000',
                '#111111',
                '#122222',
                '#133333',
                '#144444',
                '#155555',
                '#166666',
                '#177777',
                '#188888',
                '#199999',
                '#1fffff'
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
