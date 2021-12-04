import * as assert from 'assert';
import { LogoFullComponent } from './logo-full.component';

describe('LogoFullComponent', () => {
    describe('constructor', () => {
        it('Should provide correct application name', () => {
            // Arrange

            // Act
            const logoFullComponent: LogoFullComponent = new LogoFullComponent();

            // Assert
            assert.equal(logoFullComponent.applicationName, 'Vitomu');
        });
    });
});
