import { OverlayContainer } from '@angular/cdk/overlay';
import * as assert from 'assert';
import { Mock } from 'typemoq';
import { ElectronRemoteProxy } from '../../core/electron-remote-proxy';
import { Logger } from '../../core/logger';
import { Settings } from '../../core/settings';
import { AppearanceService } from './appearance.service';

describe('AppearanceService', () => {
    describe('constructor', () => {
        it('Should provide a list of themes', () => {
            // Arrange
            const electronRemoteMock = Mock.ofType<ElectronRemoteProxy>();
            electronRemoteMock.setup((x) => x.getGlobal('windowHasFrame')).returns(() => true);
            const settingsMock = Mock.ofType<Settings>();
            const loggerMock = Mock.ofType<Logger>();
            const overlayContainerMock = Mock.ofType<OverlayContainer>();
            overlayContainerMock.setup((x) => x.getContainerElement()).returns(() => null);

            // Act
            const appearance: AppearanceService = new AppearanceService(
                settingsMock.object,
                loggerMock.object,
                overlayContainerMock.object,
                electronRemoteMock.object
            );

            // Assert
            assert.ok(appearance.colorThemes.length > 0);
        });

        it('Should set the selected color theme', () => {
            // Arrange
            const electronRemoteMock = Mock.ofType<ElectronRemoteProxy>();
            electronRemoteMock.setup((x) => x.getGlobal('windowHasFrame')).returns(() => true);
            const settingsMock = Mock.ofType<Settings>();
            const loggerMock = Mock.ofType<Logger>();
            const overlayContainerMock = Mock.ofType<OverlayContainer>();
            overlayContainerMock.setup((x) => x.getContainerElement()).returns(() => null);
            settingsMock.setup((x) => x.colorTheme).returns(() => 'default-pink-theme');

            // Act
            const appearance: AppearanceService = new AppearanceService(
                settingsMock.object,
                loggerMock.object,
                overlayContainerMock.object,
                electronRemoteMock.object
            );

            // Assert
            assert.notEqual(appearance.selectedColorTheme, null);
        });

        it('Should provide a list of font sizes', () => {
            // Arrange
            const electronRemoteMock = Mock.ofType<ElectronRemoteProxy>();
            electronRemoteMock.setup((x) => x.getGlobal('windowHasFrame')).returns(() => true);
            const settingsMock = Mock.ofType<Settings>();
            const loggerMock = Mock.ofType<Logger>();
            const overlayContainerMock = Mock.ofType<OverlayContainer>();
            overlayContainerMock.setup((x) => x.getContainerElement()).returns(() => null);

            // Act
            const appearance: AppearanceService = new AppearanceService(
                settingsMock.object,
                loggerMock.object,
                overlayContainerMock.object,
                electronRemoteMock.object
            );

            // Assert
            assert.ok(appearance.fontSizes.length > 0);
        });

        it('Should set the selected font size', () => {
            // Arrange
            const electronRemoteMock = Mock.ofType<ElectronRemoteProxy>();
            electronRemoteMock.setup((x) => x.getGlobal('windowHasFrame')).returns(() => true);
            const settingsMock = Mock.ofType<Settings>();
            const loggerMock = Mock.ofType<Logger>();
            const overlayContainerMock = Mock.ofType<OverlayContainer>();
            overlayContainerMock.setup((x) => x.getContainerElement()).returns(() => null);
            settingsMock.setup((x) => x.fontSize).returns(() => 13);

            // Act
            const appearance: AppearanceService = new AppearanceService(
                settingsMock.object,
                loggerMock.object,
                overlayContainerMock.object,
                electronRemoteMock.object
            );

            // Assert
            assert.notEqual(appearance.selectedFontSize, null);
        });
    });
});
