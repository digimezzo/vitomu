import * as assert from 'assert';
import * as TypeMoq from "typemoq";
import { AboutComponent } from '../../app/components/about/about.component';
import { Constants } from '../../app/core/constants';

describe('AboutComponent', () => {
    describe('constructor', () => {
        it('Should provide application version', () => {
            // Arrange
        
            // Act
            let aboutComponent: AboutComponent = new AboutComponent();

            // Assert
            assert.equal(aboutComponent.applicationVersion, Constants.applicationVersion);
        });

        it('Should provide application copyright', () => {
            // Arrange
        
            // Act
            let aboutComponent: AboutComponent = new AboutComponent();

            // Assert
            assert.equal(aboutComponent.applicationCopyright, Constants.applicationCopyright);
        });
    });
});