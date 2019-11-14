import * as assert from 'assert';
import { Mock, It, Times } from "typemoq";
import { Constants } from '../../app/core/constants';
import { HomeComponent } from '../../app/components/home/home.component';

describe('HomeComponent', () => {
    describe('constructor', () => {
        it('Should provide application name', () => {
            // Arrange
            
            // Act
            let aboutComponent: HomeComponent = new HomeComponent();

            // Assert
            assert.equal(aboutComponent.applicationName, Constants.applicationName);
        });
    });
});