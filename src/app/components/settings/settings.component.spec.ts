import { Mock } from 'typemoq';
import { Desktop } from '../../common/io/desktop';
import { BaseSettings } from '../../common/settings/base-settings';
import { BaseAppearanceService } from '../../services/appearance/base-appearance.service';
import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
    describe('constructor', () => {
        it('Should define appearanceService', () => {
            // Arrange
            const appearanceServiceMock = Mock.ofType<BaseAppearanceService>();
            const desktopMock = Mock.ofType<Desktop>();
            const settingsMock = Mock.ofType<BaseSettings>();

            // Act
            const logoFullComponent: SettingsComponent = new SettingsComponent(
                appearanceServiceMock.object,
                desktopMock.object,
                settingsMock.object
            );

            // Assert
            expect(logoFullComponent.appearanceService).toBeDefined();
        });
    });
});
