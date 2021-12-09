import { Mock } from 'typemoq';
import { ProductInformation } from '../../common/application/product-information';
import { LogoFullComponent } from './logo-full.component';

describe('LogoFullComponent', () => {
    describe('constructor', () => {
        it('Should define productInformation', () => {
            // Arrange
            const productInformationMock = Mock.ofType<ProductInformation>();

            // Act
            const logoFullComponent: LogoFullComponent = new LogoFullComponent(productInformationMock.object);

            // Assert
            expect(logoFullComponent.productInformation).toBeDefined();
        });
    });
});
