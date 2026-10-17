import { Theme } from '../theme/theme';
import { ThemeAuthor } from '../theme/theme-author';
import { ThemeCoreColors } from '../theme/theme-core-colors';
import { ThemeNeutralColors } from '../theme/theme-neutral-colors';
import { ThemeOptions } from '../theme/theme-options';

export class AdwaitaTheme {
    public static create(author: ThemeAuthor): Theme {
        const darkColors = new ThemeNeutralColors('#ffffff', 'rgba(255, 255, 255, 0.07)', 'rgba(255, 255, 255, 0.10)', '#99999b', '#ffffff', '#222226', '#2e2e32', '#2e2e32', '#2e2e32', '#ffffff', '#99999b', '#4d4d51', '#ffffff', '#38383b', '#212125', '#1d1d22', '#333337', '#333337', '#3584e4', '#424246', '#9c9c9e', '#9c9c9e', '#222226', '#ffffff', '#4d4d51', '#ffffff', '#ffffff', '#4d4d51', '#ffffff');
        const lightColors = new ThemeNeutralColors('#2e2e33', 'rgba(46, 52, 54, 0.06)', 'rgba(46, 52, 54, 0.10)', '#979799', '#323237', '#fafafb', '#ffffff', '#ffffff', '#ebebed', '#323237', '#979799', '#e0e0e1', '#323237', '#ebebeb', '#e2e2e3', '#dadadc', '#d2d2d4', '#d2d2d4', '#3584e4', '#e6e6e7', '#818185', '#868689', '#fafafb', '#ffffff', '#e0e0e1', '#323237', '#ffffff', '#e0e0e1', '#ffffff');
        return new Theme('Adwaita', author, new ThemeCoreColors('#3584e4', '#5ca4ff', '#3584e4'), darkColors, lightColors, new ThemeOptions(true));
    }
}
