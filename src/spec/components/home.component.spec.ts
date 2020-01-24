import * as assert from 'assert';
import { HomeComponent } from '../../app/components/home/home.component';
import { Constants } from '../../app/core/constants';

describe('HomeComponent', () => {
    describe('constructor', () => {
        it('Should provide application name', () => {
            // Arrange

            // Act
            const aboutComponent: HomeComponent = new HomeComponent();

            // Assert
            assert.equal(aboutComponent.applicationName, Constants.applicationName);
        });
    });
});
