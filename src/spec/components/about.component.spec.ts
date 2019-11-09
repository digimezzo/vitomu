import * as assert from 'assert';
import * as TypeMoq from "typemoq";
import { AboutComponent } from '../../app/components/about/about.component';

describe('AboutComponent', () => {
    describe('constructor', () => {
        it('Should provide correct application name', () => {
            // Arrange
        
            // Act
            let aboutComponent: AboutComponent = new AboutComponent();

            // Assert
            assert.equal(aboutComponent.applicationName, "Vitomu");
        });
    });
});