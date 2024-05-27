import { ProductInformation } from './product-information';

describe('ProductInformation', () => {
    describe('name', () => {
        it('Should provide application name', async () => {
            // Arrange
            const productInformation: ProductInformation = new ProductInformation();

            // Act
            const applicationName: string = productInformation.name;

            // Assert
            expect(applicationName).toEqual('Vitomu');
        });
    });

    describe('version', () => {
        it('Should provide application version', async () => {
            // Arrange
            const productInformation: ProductInformation = new ProductInformation();

            // Act
            const applicationVersion: string = productInformation.version;

            // Assert
            expect(applicationVersion).toEqual('2.1.1');
        });
    });

    describe('copyright', () => {
        it('Should provide application copyright', async () => {
            // Arrange
            const productInformation: ProductInformation = new ProductInformation();

            // Act
            const applicationCopyright: string = productInformation.copyright;

            // Assert
            expect(applicationCopyright).toEqual('Copyright Digimezzo Ⓒ 2017 - 2024');
        });
    });
});
