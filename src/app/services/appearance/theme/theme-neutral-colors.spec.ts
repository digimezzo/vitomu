import { ThemeNeutralColors } from './theme-neutral-colors';

describe('ThemeNeutralColors', () => {
    function createNeutralColors(): ThemeNeutralColors {
        return new ThemeNeutralColors('red', 'green', 'blue', 'blue', 'white', 'black', 'eee', '#ddd', '#aaa', '#bbb');
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
            expect(colors.windowButtonIcon).toEqual('red');
        });

        it('should set hoveredItemBackground', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.hoveredItemBackground).toEqual('black');
        });

        it('should set tabText', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.tabText).toEqual('black');
        });

        it('should set selectedTabText', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.selectedTabText).toEqual('white');
        });

        it('should set primaryBackground', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.primaryBackground).toEqual('#aaa');
        });

        it('should set secondaryBackground', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.secondaryBackground).toEqual('#aaa');
        });

        it('should set primaryText', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.primaryText).toEqual('#eee');
        });

        it('should set secondaryText', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.secondaryText).toEqual('#ddd');
        });

        it('should set settingsSeparators', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.settingsSeparators).toEqual('#777');
        });

        it('should set scrollBars', () => {
            // Arrange

            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.scrollBars).toEqual('#888');
        });
    });
});
