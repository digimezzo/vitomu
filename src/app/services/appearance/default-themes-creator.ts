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

        return themes;
    }

    private createVitomuTheme(): Theme {
        const darkColors: ThemeNeutralColors = new ThemeNeutralColors(
            '#5e5e5e',
            'rgba(255, 255, 255, 0.05)',
            'rgba(255, 255, 255, 0.1)',
            '',
            '#666',
            '#fff',
            '#1a1a1a',
            '#111',
            '#222',
            '#333'
        );

        const lightColors: ThemeNeutralColors = new ThemeNeutralColors(
            '#838383',
            'rgba(0, 0, 0, 0.05)',
            'rgba(0, 0, 0, 0.1)',
            '',
            '#909090',
            '#000',
            '#f5f5f5',
            '#fdfdfd',
            '#fefefe',
            '#fdfdfd'
        );

        const options: ThemeOptions = new ThemeOptions();

        return new Theme('Vitomu', this.creator, new ThemeCoreColors('#6260e3', '#3fdcdd', '#4883e0'), darkColors, lightColors, options);
    }
}
