import * as assert from 'assert';
import * as TypeMoq from "typemoq";
import { AboutComponent } from '../../app/components/about/about.component';
import { Constants } from '../../app/core/constants';
import { MatDialog } from '@angular/material';
import { Times } from "typemoq";
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