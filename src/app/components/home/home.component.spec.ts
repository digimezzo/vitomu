import { Mock, Times } from 'typemoq';
import { ProductInformation } from '../../common/application/product-information';
import { BaseAppearanceService } from '../../services/appearance/base-appearance.service';
import { UpdateService } from '../../services/update/update.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
    describe('constructor', () => {
        it('Should define productInformation', () => {
            // Arrange
            const productInformationMock = Mock.ofType<ProductInformation>();
            const appearanceMock = Mock.ofType<BaseAppearanceService>();
            const updateServiceMock = Mock.ofType<UpdateService>();
            updateServiceMock.setup((x) => x.checkForUpdatesAsync()).returns(() => Promise.resolve());

            // Act
            const homeComponent: HomeComponent = new HomeComponent(appearanceMock.object, productInformationMock.object, updateServiceMock.object);

            // Assert
            expect(homeComponent.productInformation).toBeDefined();
        });
    });

    describe('ngOnInit', () => {
        it('Should check for updates', () => {
            // Arrange
            const productInformationMock = Mock.ofType<ProductInformation>();
            const appearanceMock = Mock.ofType<BaseAppearanceService>();
            const updateServiceMock = Mock.ofType<UpdateService>();
            updateServiceMock.setup((x) => x.checkForUpdatesAsync()).returns(() => Promise.resolve());
            const homeComponent: HomeComponent = new HomeComponent(appearanceMock.object, productInformationMock.object, updateServiceMock.object);

            // Act
            homeComponent.ngOnInit();

            // Assert
            updateServiceMock.verify((x) => x.checkForUpdatesAsync, Times.exactly(1));
        });
    });
});
