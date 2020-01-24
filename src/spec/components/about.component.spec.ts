import { MatDialog } from '@angular/material';
import * as assert from 'assert';
import { It, Mock, Times } from 'typemoq';
import { AboutComponent } from '../../app/components/about/about.component';
import { Constants } from '../../app/core/constants';
import { Desktop } from '../../app/core/desktop';

describe('AboutComponent', () => {
    describe('constructor', () => {
        it('Should provide application version', () => {
            // Arrange
            const matDialogMock = Mock.ofType<MatDialog>();
            const desktopMock = Mock.ofType<Desktop>();

            // Act
            const aboutComponent: AboutComponent = new AboutComponent(matDialogMock.object, desktopMock.object);

            // Assert
            assert.equal(aboutComponent.applicationVersion, Constants.applicationVersion);
        });

        it('Should provide application copyright', () => {
            // Arrange
            const matDialogMock = Mock.ofType<MatDialog>();
            const desktopMock = Mock.ofType<Desktop>();

            // Act
            const aboutComponent: AboutComponent = new AboutComponent(matDialogMock.object,  desktopMock.object);

            // Assert
            assert.equal(aboutComponent.applicationCopyright, Constants.applicationCopyright);
        });

        it('Should provide website url', () => {
            // Arrange
            const matDialogMock = Mock.ofType<MatDialog>();
            const desktopMock = Mock.ofType<Desktop>();

            // Act
            const aboutComponent: AboutComponent = new AboutComponent(matDialogMock.object, desktopMock.object);

            // Assert
            assert.equal(aboutComponent.websiteUrl, Constants.websiteUrl);
        });

        it('Should provide github url', () => {
            // Arrange
            const matDialogMock = Mock.ofType<MatDialog>();
            const desktopMock = Mock.ofType<Desktop>();

            // Act
            const aboutComponent: AboutComponent = new AboutComponent(matDialogMock.object, desktopMock.object);

            // Assert
            assert.equal(aboutComponent.githubUrl, Constants.githubUrl);
        });

        it('Should provide twitter url', () => {
            // Arrange
            const matDialogMock = Mock.ofType<MatDialog>();
            const desktopMock = Mock.ofType<Desktop>();

            // Act
            const aboutComponent: AboutComponent = new AboutComponent(matDialogMock.object, desktopMock.object);

            // Assert
            assert.equal(aboutComponent.twitterUrl, Constants.twitterUrl);
        });
    });

    describe('openLicenseDialog', () => {
        it('Should open the license dialog', () => {
            // Arrange
            const matDialogMock = Mock.ofType<MatDialog>();
            const desktopMock = Mock.ofType<Desktop>();

            const aboutComponent: AboutComponent = new AboutComponent(matDialogMock.object, desktopMock.object);

            // Act
            aboutComponent.openLicenseDialog();

            // Assert
            matDialogMock.verify(x => x.open(It.isAny(), It.isAny()), Times.atLeastOnce());
        });
    });

    describe('openDonateLink', () => {
        it('Should open the the donate link', () => {
            // Arrange
            const matDialogMock = Mock.ofType<MatDialog>();
            const desktopMock = Mock.ofType<Desktop>();

            const aboutComponent: AboutComponent = new AboutComponent(matDialogMock.object, desktopMock.object);

            // Act
            aboutComponent.openDonateLink();

            // Assert
            desktopMock.verify(x => x.openLink(Constants.donateUrl), Times.atLeastOnce());
        });
    });
});
