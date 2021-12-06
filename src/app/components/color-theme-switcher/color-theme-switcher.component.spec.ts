import { Mock, Times } from 'typemoq';
import { ColorTheme } from '../../common/color-theme';
import { AppearanceService } from '../../services/appearance/appearance.service';
import { ColorThemeSwitcherComponent } from './color-theme-switcher.component';

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
            appearanceServiceMock.verify((x) => (x.selectedColorTheme = blueColorTheme), Times.atLeastOnce());
        });
    });
});
