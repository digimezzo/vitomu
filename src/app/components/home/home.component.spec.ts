import { Mock, Times } from 'typemoq';
import { AppearanceService } from '../../services/appearance/appearance.service';
import { UpdateService } from '../../services/update/update.service';
import { HomeComponent } from './home.component';

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
            updateMock.verify((x) => x.checkForUpdatesAsync, Times.exactly(1));
        });
    });
});
