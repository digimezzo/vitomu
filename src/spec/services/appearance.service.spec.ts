import * as assert from 'assert';
import * as TypeMoq from "typemoq";
import { Settings } from '../../app/core/settings';
import { Times } from 'typemoq';
import { Logger } from '../../app/core/logger';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AppearanceService } from '../../app/services/appearance/appearance.service';

describe('AppearanceService', () => {
    describe('constructor', () => {
        it('Should provide a list of themes', () => {
            // Arrange
            var settingsMock = TypeMoq.Mock.ofType<Settings>();
            var loggerMock = TypeMoq.Mock.ofType<Logger>();
            var overlayContainerMock = TypeMoq.Mock.ofType<OverlayContainer>();
            overlayContainerMock.setup(x => x.getContainerElement()).returns(() => null);

            // Act
            let appearance: AppearanceService = new AppearanceService(settingsMock.object, loggerMock.object, overlayContainerMock.object);

            // Assert
            assert.ok(appearance.colorThemes.length > 0);
        });
    });
});