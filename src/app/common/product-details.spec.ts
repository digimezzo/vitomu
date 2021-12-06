import * as assert from 'assert';
import { ProductDetails } from './product-details';

describe('ProductDetails', () => {
    describe('name', () => {
        it('Should provide application name', async () => {
            // Arrange
            const productDetails: ProductDetails = new ProductDetails();

            // Act
            const applicationName: string = productDetails.name;

            // Assert
            assert.ok(applicationName, 'Vitomu');
        });
    });

    describe('version', () => {
        it('Should provide application version', async () => {
            // Arrange
            const productDetails: ProductDetails = new ProductDetails();

            // Act
            const applicationVersion: string = productDetails.version;

            // Assert
            assert.ok(applicationVersion, '2.0.3');
        });
    });

    describe('copyright', () => {
        it('Should provide application copyright', async () => {
            // Arrange
            const productDetails: ProductDetails = new ProductDetails();

            // Act
            const applicationCopyright: string = productDetails.copyright;

            // Assert
            assert.ok(applicationCopyright, 'Copyright Digimezzo Ⓒ 2013 - 2020');
        });
    });
});
