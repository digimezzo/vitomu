import { Mock, Times } from 'typemoq';
import { ColorThemeSwitcherComponent } from '../../app/components/color-theme-switcher/color-theme-switcher.component';
import { ColorTheme } from '../../app/core/color-theme';
import { AppearanceService } from '../../app/services/appearance/appearance.service';

describe('ColorThemeSwitcherComponent', () => {
    describe('setColorTheme', () => {
        it('Should change the selected color theme', () => {
            // Arrange
            const appearanceServiceMock = Mock.ofType<AppearanceService>();
            const colorThemeSwitcher: ColorThemeSwitcherComponent = new ColorThemeSwitcherComponent(appearanceServiceMock.object);

            // Act
            const blueColorTheme: ColorTheme = new ColorTheme('default-blue-theme', 'Blue', '#1d7dd4');
            colorThemeSwitcher.setColorTheme(blueColorTheme);

            // Assert
            appearanceServiceMock.verify(x => x.selectedColorTheme = blueColorTheme, Times.atLeastOnce());
        });
    });
});
