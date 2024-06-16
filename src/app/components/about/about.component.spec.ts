import { MatDialog } from '@angular/material/dialog';
import * as assert from 'assert';
import { It, Mock, Times } from 'typemoq';
import { Constants } from '../../common/application/constants';
import { ProductInformation } from '../../common/application/product-information';
import { Desktop } from '../../common/io/desktop';
import { AboutComponent } from './about.component';

jest.mock('@electron/remote', () => ({ exec: jest.fn() }));

describe('AboutComponent', () => {
    describe('constructor', () => {
        it('Should define productInformation', () => {
            // Arrange
            const productInformationMock = Mock.ofType<ProductInformation>();
            const matDialogMock = Mock.ofType<MatDialog>();
            const desktopMock = Mock.ofType<Desktop>();

            // Act
            const aboutComponent: AboutComponent = new AboutComponent(
                productInformationMock.object,
                matDialogMock.object,
                desktopMock.object
            );

            // Assert
            expect(aboutComponent.productInformation).toBeDefined();
        });

        it('Should provide website url', () => {
            // Arrange
            const productInformationMock = Mock.ofType<ProductInformation>();
            const matDialogMock = Mock.ofType<MatDialog>();
            const desktopMock = Mock.ofType<Desktop>();

            // Act
            const aboutComponent: AboutComponent = new AboutComponent(
                productInformationMock.object,
                matDialogMock.object,
                desktopMock.object
            );

            // Assert
            assert.equal(aboutComponent.websiteUrl, Constants.websiteUrl);
        });

        it('Should provide github url', () => {
            // Arrange
            const productInformationMock = Mock.ofType<ProductInformation>();
            const matDialogMock = Mock.ofType<MatDialog>();
            const desktopMock = Mock.ofType<Desktop>();

            // Act
            const aboutComponent: AboutComponent = new AboutComponent(
                productInformationMock.object,
                matDialogMock.object,
                desktopMock.object
            );

            // Assert
            assert.equal(aboutComponent.githubUrl, Constants.githubUrl);
        });

        it('Should provide twitter url', () => {
            // Arrange
            const productInformationMock = Mock.ofType<ProductInformation>();
            const matDialogMock = Mock.ofType<MatDialog>();
            const desktopMock = Mock.ofType<Desktop>();

            // Act
            const aboutComponent: AboutComponent = new AboutComponent(
                productInformationMock.object,
                matDialogMock.object,
                desktopMock.object
            );

            // Assert
            assert.equal(aboutComponent.twitterUrl, Constants.twitterUrl);
        });
    });

    describe('openLicenseDialog', () => {
        it('Should open the license dialog', () => {
            // Arrange
            const productInformationMock = Mock.ofType<ProductInformation>();
            const matDialogMock = Mock.ofType<MatDialog>();
            const desktopMock = Mock.ofType<Desktop>();

            const aboutComponent: AboutComponent = new AboutComponent(
                productInformationMock.object,
                matDialogMock.object,
                desktopMock.object
            );

            // Act
            aboutComponent.openLicenseDialog();

            // Assert
            matDialogMock.verify((x) => x.open(It.isAny(), It.isAny()), Times.atLeastOnce());
        });
    });

    describe('openDonateLink', () => {
        it('Should open the the donate link', () => {
            // Arrange
            const productInformationMock = Mock.ofType<ProductInformation>();
            const matDialogMock = Mock.ofType<MatDialog>();
            const desktopMock = Mock.ofType<Desktop>();

            const aboutComponent: AboutComponent = new AboutComponent(
                productInformationMock.object,
                matDialogMock.object,
                desktopMock.object
            );

            // Act
            aboutComponent.openDonateLink();

            // Assert
            desktopMock.verify((x) => x.openLink(Constants.donateUrl), Times.atLeastOnce());
        });
    });
});
