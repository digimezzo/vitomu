import { ThemeAuthor } from '../theme/theme-author';
import { VitomuTheme } from './vitomu-theme';

describe('VitomuTheme', () => {
    it('should use its accent color for scrollbars in both background modes', () => {
        const theme = VitomuTheme.create(new ThemeAuthor('Digimezzo', 'digimezzo@outlook.com'));

        expect(theme.darkColors.scrollBars).toEqual(theme.coreColors.accentColor);
        expect(theme.lightColors.scrollBars).toEqual(theme.coreColors.accentColor);
    });
});
