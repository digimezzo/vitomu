import { DefaultThemesCreator } from './default-themes-creator';
import { Theme } from './theme/theme';

describe('DefaultThemesCreator', () => {
    beforeEach(() => {});

    describe('constructor', () => {
        it('should create', () => {
            // Arrange

            // Act
            const defaultThemesCreator: DefaultThemesCreator = new DefaultThemesCreator();

            // Assert
            expect(defaultThemesCreator).toBeDefined();
        });
    });

    describe('createAllThemes', () => {
        it('should create all default themes', () => {
            // Arrange
            const defaultThemesCreator: DefaultThemesCreator = new DefaultThemesCreator();

            // Act
            const defaultThemes: Theme[] = defaultThemesCreator.createAllThemes();

            // Assert
            expect(defaultThemes.length).toEqual(3);
            expect(defaultThemes[0].name).toEqual('Vitomu');
            expect(defaultThemes[1].name).toEqual('Jade');
            expect(defaultThemes[2].name).toEqual('Palenight');
        });
    });
});
