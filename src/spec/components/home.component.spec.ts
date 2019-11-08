import * as assert from 'assert';
import * as TypeMoq from "typemoq";
import { HomeComponent } from '../../app/components/home/home.component';

describe('Homeomponent', () => {
    describe('constructor', () => {
        it('Should show correct application name', () => {
            // Arrange
        
            // Act
            let homeComponent: HomeComponent = new HomeComponent();

            // Assert
            assert.equal(homeComponent.applicationName, "Vitomu");
        });
    });
});