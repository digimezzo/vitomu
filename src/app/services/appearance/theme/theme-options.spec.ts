import { ThemeOptions } from './theme-options';

describe('ThemeOptions', () => {
    beforeEach(() => {});

    describe('constructor', () => {
        it('should create', () => {
            // Arrange

            // Act
            const creator: ThemeOptions = new ThemeOptions();

            // Assert
            expect(creator).toBeDefined();
        });
    });
});
