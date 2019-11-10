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
            var matDialogMock = TypeMoq.Mock.ofType<MatDialog>();
        
            // Act
            let aboutComponent: AboutComponent = new AboutComponent(matDialogMock.object);

            // Assert
            assert.equal(aboutComponent.applicationVersion, Constants.applicationVersion);
        });

        it('Should provide application copyright', () => {
            // Arrange
            var matDialogMock = TypeMoq.Mock.ofType<MatDialog>();

            // Act
            let aboutComponent: AboutComponent = new AboutComponent(matDialogMock.object);

            // Assert
            assert.equal(aboutComponent.applicationCopyright, Constants.applicationCopyright);
        });
    });

    describe('openLicenseDialog', () => {
        it('Should open the license dialog', () => {
            // Arrange
            var matDialogMock = TypeMoq.Mock.ofType<MatDialog>();
            let aboutComponent: AboutComponent = new AboutComponent(matDialogMock.object);

            // Act
            aboutComponent.openLicenseDialog();

            // Assert
            matDialogMock.verify(x => x.open(TypeMoq.It.isAny(), TypeMoq.It.isAny()), Times.atLeastOnce());
        });
    });
});