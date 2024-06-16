import { Mock } from 'typemoq';
import { Desktop } from '../../common/io/desktop';
import { BaseSettings } from '../../common/settings/base-settings';
import { SettingsComponent } from './settings.component';
import { AppearanceService } from '../../services/appearance/appearance.service';

jest.mock('@electron/remote', () => ({ exec: jest.fn() }));

describe('SettingsComponent', () => {
    describe('constructor', () => {
        it('Should define appearanceService', () => {
            // Arrange
            const appearanceServiceMock = Mock.ofType<AppearanceService>();
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
