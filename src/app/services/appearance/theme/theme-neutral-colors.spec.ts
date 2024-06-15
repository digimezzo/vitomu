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
            '#ffffff',
            '#fffff1',
            '#fffff2',
            '#fffff3',
            '#fffff4'
        );
    }

    beforeEach(() => {});

    describe('constructor', () => {
        it('should create', () => {
            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors).toBeDefined();
        });

        it('should set windowButtonIcon', () => {
            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.windowButtonIcon).toEqual('#000000');
        });

        it('should set hoveredItemBackground', () => {
            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.hoveredItemBackground).toEqual('#111111');
        });

        it('should set tabText', () => {
            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.tabText).toEqual('#222222');
        });

        it('should set selectedTabText', () => {
            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.selectedTabText).toEqual('#333333');
        });

        it('should set primaryBackground', () => {
            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.primaryBackground).toEqual('#444444');
        });

        it('should set secondaryBackground', () => {
            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.secondaryBackground).toEqual('#555555');
        });

        it('should set primaryText', () => {
            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.primaryText).toEqual('#666666');
        });

        it('should set secondaryText', () => {
            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.secondaryText).toEqual('#777777');
        });

        it('should set settingsSeparators', () => {
            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.settingsSeparators).toEqual('#888888');
        });

        it('should set scrollBars', () => {
            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.scrollBars).toEqual('#999999');
        });

        it('should set buttonText', () => {
            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.buttonText).toEqual('#ffffff');
        });

        it('should set highlightForeground', () => {
            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.highlightForeground).toEqual('#fffff1');
        });

        it('should set sliderBackground', () => {
            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.sliderBackground).toEqual('#fffff2');
        });

        it('should set sliderThumbBackground', () => {
            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.sliderThumbBackground).toEqual('#fffff3');
        });

        it('should set tooltipText', () => {
            // Act
            const colors: ThemeNeutralColors = createNeutralColors();

            // Assert
            expect(colors.tooltipText).toEqual('#fffff4');
        });
    });
});
