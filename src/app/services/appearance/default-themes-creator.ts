import { Injectable } from '@angular/core';
import { Theme } from './theme/theme';
import { ThemeAuthor } from './theme/theme-author';
import { AdwaitaTheme } from './themes/adwaita-theme';
import { VitomuTheme } from './themes/vitomu-theme';

@Injectable()
export class DefaultThemesCreator {
    private readonly digimezzo = new ThemeAuthor('Digimezzo', 'digimezzo@outlook.com');

    public createAllThemes(): Theme[] {
        return [
            AdwaitaTheme.create(this.digimezzo),
            VitomuTheme.create(this.digimezzo),
        ];
    }
}