import * as assert from 'assert';
import * as TypeMoq from "typemoq";
import { AboutComponent } from '../../app/components/about/about.component';
import { Constants } from '../../app/core/constants';
import { MatDialog } from '@angular/material';
import { Times } from "typemoq";

describe('AboutComponent', () => {
    describe('constructor', () => {
        it('Should provide application version', () => {
            // Arrange
            let matDialogMock = TypeMoq.Mock.ofType<MatDialog>();
        
            // Act
            let aboutComponent: AboutComponent = new AboutComponent(matDialogMock.object);

            // Assert
            assert.equal(aboutComponent.applicationVersion, Constants.applicationVersion);
        });

        it('Should provide application copyright', () => {
            // Arrange
            let matDialogMock = TypeMoq.Mock.ofType<MatDialog>();

            // Act
            let aboutComponent: AboutComponent = new AboutComponent(matDialogMock.object);

            // Assert
            assert.equal(aboutComponent.applicationCopyright, Constants.applicationCopyright);
        });

        it('Should provide website url', () => {
            // Arrange
            let matDialogMock = TypeMoq.Mock.ofType<MatDialog>();

            // Act
            let aboutComponent: AboutComponent = new AboutComponent(matDialogMock.object);

            // Assert
            assert.equal(aboutComponent.websiteUrl, Constants.websiteUrl);
        });

        it('Should provide github url', () => {
            // Arrange
            let matDialogMock = TypeMoq.Mock.ofType<MatDialog>();

            // Act
            let aboutComponent: AboutComponent = new AboutComponent(matDialogMock.object);

            // Assert
            assert.equal(aboutComponent.githubUrl, Constants.githubUrl);
        });

        it('Should provide twitter url', () => {
            // Arrange
            let matDialogMock = TypeMoq.Mock.ofType<MatDialog>();

            // Act
            let aboutComponent: AboutComponent = new AboutComponent(matDialogMock.object);

            // Assert
            assert.equal(aboutComponent.twitterUrl, Constants.twitterUrl);
        });
    });

    describe('openLicenseDialog', () => {
        it('Should open the license dialog', () => {
            // Arrange
            let matDialogMock = TypeMoq.Mock.ofType<MatDialog>();
            let aboutComponent: AboutComponent = new AboutComponent(matDialogMock.object);

            // Act
            aboutComponent.openLicenseDialog();

            // Assert
            matDialogMock.verify(x => x.open(TypeMoq.It.isAny(), TypeMoq.It.isAny()), Times.atLeastOnce());
        });
    });
});