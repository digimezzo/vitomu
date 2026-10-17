import { Theme } from '../theme/theme';
import { ThemeAuthor } from '../theme/theme-author';
import { ThemeCoreColors } from '../theme/theme-core-colors';
import { ThemeNeutralColors } from '../theme/theme-neutral-colors';
import { ThemeOptions } from '../theme/theme-options';
import { defaultDarkColors, defaultLightColors } from './default-neutral-colors';

export class VitomuTheme {
    public static create(author: ThemeAuthor): Theme {
        const coreColors: ThemeCoreColors = new ThemeCoreColors('#ec1a65', '#ec1a65', '#ec1a65');
        const darkColors: ThemeNeutralColors = defaultDarkColors();
        const lightColors: ThemeNeutralColors = defaultLightColors();
        darkColors.scrollBars = coreColors.accentColor;
        lightColors.scrollBars = coreColors.accentColor;
        const options: ThemeOptions = new ThemeOptions(false);
        return new Theme('Vitomu', author, coreColors, darkColors, lightColors, options);
    }
}
