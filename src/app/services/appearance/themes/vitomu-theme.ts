import { Theme } from '../theme/theme';
import { ThemeAuthor } from '../theme/theme-author';
import { ThemeCoreColors } from '../theme/theme-core-colors';
import { ThemeNeutralColors } from '../theme/theme-neutral-colors';
import { ThemeOptions } from '../theme/theme-options';
import { defaultDarkColors, defaultLightColors } from './default-neutral-colors';

export class VitomuTheme {
    public static create(author: ThemeAuthor): Theme {
        const darkColors: ThemeNeutralColors = defaultDarkColors();
        const lightColors: ThemeNeutralColors = defaultLightColors();
        const options: ThemeOptions = new ThemeOptions(false);
        return new Theme('Vitomu', author, new ThemeCoreColors('#6260e3', '#3fdcdd', '#4883e0'), darkColors, lightColors, options);
    }
}
