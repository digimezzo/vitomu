import { ThemeCoreColors } from './theme-core-colors';

describe('ThemeCoreColors', () => {
    beforeEach(() => {});

    describe('constructor', () => {
        it('should create', () => {
            // Arrange

            // Act
            const colors: ThemeCoreColors = new ThemeCoreColors('#ccc');

            // Assert
            expect(colors).toBeDefined();
        });

        it('should set accentColor', () => {
            // Arrange
            const colors: ThemeCoreColors = new ThemeCoreColors('#ccc');

            // Act

            // Assert
            expect(colors.accentColor).toEqual('#ccc');
        });
    });
});
