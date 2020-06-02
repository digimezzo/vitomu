import * as assert from 'assert';
import { HomeComponent } from '../../app/components/home/home.component';
import { Mock, Times } from 'typemoq';
import { UpdateService } from '../../app/services/update/update.service';
import { AppearanceService } from '../../app/services/appearance/appearance.service';

describe('HomeComponent', () => {
    describe('ngOnInit', () => {
        it('Should check for updates', () => {
            // Arrange
            const appearanceMock = Mock.ofType<AppearanceService>();
            const updateMock = Mock.ofType<UpdateService>();
            const homeComponent: HomeComponent = new HomeComponent(appearanceMock.object, updateMock.object);

            // Act
            homeComponent.ngOnInit();

            // Assert
            updateMock.verify(x => x.checkForUpdatesAsync, Times.exactly(1));
        });
    });
});
