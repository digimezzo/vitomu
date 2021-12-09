import { Theme } from './theme/theme';
import { ThemeCoreColors } from './theme/theme-core-colors';
import { ThemeCreator } from './theme/theme-creator';
import { ThemeNeutralColors } from './theme/theme-neutral-colors';
import { ThemeOptions } from './theme/theme-options';

export class DefaultThemesCreator {
    private creator: ThemeCreator = new ThemeCreator('Digimezzo', 'info@digimezzo.com');

    public createAllThemes(): Theme[] {
        const themes: Theme[] = [];
        themes.push(this.createVitomuTheme());
        themes.push(this.createGreenTheme());
        themes.push(this.createPalenightTheme());

        return themes;
    }

    private createVitomuTheme(): Theme {
        const darkColors: ThemeNeutralColors = new ThemeNeutralColors(
            '#a4a4a4',
            'rgba(255, 255, 255, 0.05)',
            '#b4b4b4',
            '#ffffff',
            '#202020',
            '#333',
            '#bdbdbd',
            '#9b9b9b',
            '#333',
            '#ec1a65'
        );

        const lightColors: ThemeNeutralColors = new ThemeNeutralColors(
            '#a4a4a4',
            'rgba(255, 255, 255, 0.05)',
            '#b4b4b4',
            '#ffffff',
            '#202020',
            '#333',
            '#bdbdbd',
            '#9b9b9b',
            '#333',
            '#ec1a65'
        );

        const options: ThemeOptions = new ThemeOptions();

        return new Theme('Vitomu', this.creator, new ThemeCoreColors('#ec1a65', '#ec1a65', '#ec1a65'), darkColors, lightColors, options);
    }

    private createGreenTheme(): Theme {
        const darkColors: ThemeNeutralColors = new ThemeNeutralColors(
            '#a4a4a4',
            'rgba(255, 255, 255, 0.05)',
            '#b4b4b4',
            '#ffffff',
            '#202020',
            '#333',
            '#bdbdbd',
            '#9b9b9b',
            '#333',
            '#00b163'
        );

        const lightColors: ThemeNeutralColors = new ThemeNeutralColors(
            '#a4a4a4',
            'rgba(255, 255, 255, 0.05)',
            '#b4b4b4',
            '#ffffff',
            '#202020',
            '#333',
            '#bdbdbd',
            '#9b9b9b',
            '#333',
            '#00b163'
        );

        const options: ThemeOptions = new ThemeOptions();

        return new Theme('Green', this.creator, new ThemeCoreColors('#00b163', '#00b163', '#00b163'), darkColors, lightColors, options);
    }

    private createPalenightTheme(): Theme {
        const darkColors: ThemeNeutralColors = new ThemeNeutralColors(
            '#747e88',
            'rgba(255, 255, 255, 0.05)',
            '#b4b4b4',
            '#ffffff',
            '#292d3e',
            '#25293a',
            '#eeffff',
            '#747e88',
            '#3b415c',
            '#7e57c2'
        );

        const lightColors: ThemeNeutralColors = new ThemeNeutralColors(
            '#747e88',
            'rgba(255, 255, 255, 0.05)',
            '#b4b4b4',
            '#ffffff',
            '#292d3e',
            '#25293a',
            '#eeffff',
            '#747e88',
            '#3b415c',
            '#7e57c2'
        );

        const options: ThemeOptions = new ThemeOptions();

        return new Theme('Palenight', this.creator, new ThemeCoreColors('#7e57c2', '#7e57c2', '#7e57c2'), darkColors, lightColors, options);
    }
}
