import * as assert from 'assert';
import { Mock, It, Times } from "typemoq";
import { ColorThemeSwitcherComponent } from '../../app/components/color-theme-switcher/color-theme-switcher.component';
import { AppearanceService } from '../../app/services/appearance/appearance.service';
import { ColorTheme } from '../../app/core/color-theme';

describe('ColorThemeSwitcherComponent', () => {
    describe('setColorTheme', () => {
        it('Should change the selected color theme', () => {
            // Arrange
            let appearanceServiceMock = Mock.ofType<AppearanceService>();
            let colorThemeSwitcher: ColorThemeSwitcherComponent = new ColorThemeSwitcherComponent(appearanceServiceMock.object);

            // Act
            let blueColorTheme: ColorTheme = new ColorTheme("default-blue-theme", "Blue", "#1d7dd4");
            colorThemeSwitcher.setColorTheme(blueColorTheme);

            // Assert
            appearanceServiceMock.verify(x => x.selectedColorTheme = blueColorTheme, Times.atLeastOnce());
        });
    });
});