import { ThemeNeutralColors } from './theme-neutral-colors';

describe('ThemeNeutralColors', () => {
    function createNeutralColors(): ThemeNeutralColors {
        return new ThemeNeutralColors(
            '#000000',
            '#111111',
            '#222222',
            '#333333',
            '#444444',
            '#555555',
            '#666666',
            '#777777',
            '#888888',
            '#999999',
            '#ffffff'
        );
    }

    beforeEach(() => {});

    describe('constructor', () => {
        it('should create', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors).toBeDefined();
        });

        it('should set windowButtonIcon', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.windowButtonIcon).toEqual('#000000');
        });

        it('should set hoveredItemBackground', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.hoveredItemBackground).toEqual('#111111');
        });

        it('should set tabText', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.tabText).toEqual('#222222');
        });

        it('should set selectedTabText', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.selectedTabText).toEqual('#333333');
        });

        it('should set primaryBackground', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.primaryBackground).toEqual('#444444');
        });

        it('should set secondaryBackground', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.secondaryBackground).toEqual('#555555');
        });

        it('should set primaryText', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.primaryText).toEqual('#666666');
        });

        it('should set secondaryText', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.secondaryText).toEqual('#777777');
        });

        it('should set settingsSeparators', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.settingsSeparators).toEqual('#888888');
        });

        it('should set scrollBars', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.scrollBars).toEqual('#999999');
        });

        it('should set buttonText', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.buttonText).toEqual('#ffffff');
        });
    });
});
