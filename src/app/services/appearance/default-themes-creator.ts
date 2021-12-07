import { Theme } from './theme/theme';
import { ThemeCoreColors } from './theme/theme-core-colors';
import { ThemeCreator } from './theme/theme-creator';
import { ThemeNeutralColors } from './theme/theme-neutral-colors';

export class DefaultThemesCreator {
    private creator: ThemeCreator = new ThemeCreator('Digimezzo', 'info@digimezzo.com');

    public createAllThemes(): Theme[] {
        const themes: Theme[] = [];
        themes.push(this.createVitomuTheme());

        return themes;
    }

    private createVitomuTheme(): Theme {
        const neutralColors: ThemeNeutralColors = new ThemeNeutralColors(
            '#5e5e5e',
            'rgba(255, 255, 255, 0.05)',
            'rgba(255, 255, 255, 0.1)',
            '',
            '#666',
            '#fff',
            '#1a1a1a',
            '#111',
            '#111',
            '#171717',
            '#fff',
            '#5e5e5e',
            '#272727',
            '#999',
            '#fff',
            '#5e5e5e',
            '#202020',
            'transparent',
            '#363636',
            '#4883e0',
            '#202020',
            '#fff',
            '#5e5e5e'
        );

        return new Theme('Vitomu', this.creator, new ThemeCoreColors('#4883e0'), neutralColors);
    }
}
