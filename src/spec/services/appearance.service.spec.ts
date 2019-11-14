import * as assert from 'assert';
import { Mock, It, Times } from "typemoq";
import { Settings } from '../../app/core/settings';
import { Logger } from '../../app/core/logger';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AppearanceService } from '../../app/services/appearance/appearance.service';

describe('AppearanceService', () => {
    describe('constructor', () => {
        it('Should provide a list of themes', () => {
            // Arrange
            let settingsMock = Mock.ofType<Settings>();
            let loggerMock = Mock.ofType<Logger>();
            let overlayContainerMock = Mock.ofType<OverlayContainer>();
            overlayContainerMock.setup(x => x.getContainerElement()).returns(() => null);

            // Act
            let appearance: AppearanceService = new AppearanceService(settingsMock.object, loggerMock.object, overlayContainerMock.object);

            // Assert
            assert.ok(appearance.colorThemes.length > 0);
        });

        it('Should set the selected colorTheme', () => {
            // Arrange
            let settingsMock = Mock.ofType<Settings>();
            let loggerMock = Mock.ofType<Logger>();
            let overlayContainerMock = Mock.ofType<OverlayContainer>();
            overlayContainerMock.setup(x => x.getContainerElement()).returns(() => null);
            settingsMock.setup(x => x.colorTheme).returns(() => "default-pink-theme");

            // Act
            let appearance: AppearanceService = new AppearanceService(settingsMock.object, loggerMock.object, overlayContainerMock.object);

            // Assert
            assert.notEqual(appearance.selectedColorTheme, null);
        });
    });
});