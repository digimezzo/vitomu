import { Injectable } from '@angular/core';
import { Theme } from './theme/theme';
import { ThemeAuthor } from './theme/theme-author';
import { ThemeCoreColors } from './theme/theme-core-colors';
import { ThemeNeutralColors } from './theme/theme-neutral-colors';
import { ThemeOptions } from './theme/theme-options';

@Injectable()
export class DefaultThemesCreator {
    private readonly digimezzo = new ThemeAuthor('Digimezzo', 'digimezzo@outlook.com');
    private readonly blackSpirits = new ThemeAuthor('BlackSpirits', 'blackspirits@gmail.com');
    private readonly fennyWorks = new ThemeAuthor('FennyWorks', 'hello@fennyworks.com');

    public createAllThemes(): Theme[] {
        return [
            this.createTheme('Dopamine', '#6260e3', '#3fdcdd', '#4883e0', this.digimezzo),
            this.createTheme('Adwaita', '#3584e4', '#5ca4ff', '#3584e4', this.digimezzo, true),
            this.createTheme('Zune', '#f78f1e', '#ed008c', '#f0266f', this.digimezzo),
            this.createTheme('Beats', '#98247f', '#e21839', '#e21839', this.digimezzo),
            this.createTheme('Naughty', '#f5004a', '#9300ef', '#f5004a', this.digimezzo),
            this.createTheme('Ubuntu', '#d94612', '#f9622d', '#e95420', this.digimezzo, true),
            this.createTheme('Manjaro', '#009378', '#2eae92', '#16a085', this.digimezzo, true),
            this.createTheme('Palenight', '#008884', '#56c6c1', '#00908c', this.digimezzo, true),
            this.createTheme('Catppuccin', '#cba6f7', '#f5c2e7', '#cba6f7', this.blackSpirits, true),
            this.createTheme('Dracula', '#bd93f9', '#ff79c6', '#bd93f9', this.blackSpirits, true),
            this.createTheme('Kadbury', '#c9a84c', '#e2c97e', '#c9a84c', this.fennyWorks, true),
        ];
    }

    private createTheme(
        name: string,
        primaryColor: string,
        secondaryColor: string,
        accentColor: string,
        author: ThemeAuthor,
        centerAlbumInfoText: boolean = false
    ): Theme {
        return new Theme(
            name,
            author,
            new ThemeCoreColors(primaryColor, secondaryColor, accentColor),
            this.createDarkColors(accentColor),
            this.createLightColors(accentColor),
            new ThemeOptions(centerAlbumInfoText)
        );
    }

    private createDarkColors(accentColor: string): ThemeNeutralColors {
        return new ThemeNeutralColors(
            '#808080', 'rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.1)', '#777', '#fff', '#1b1b1b', '#121212',
            '#121212', '#181818', '#fff', '#7f7f7f', '#2e2e2e', '#fff', '#212121', 'transparent', 'transparent', '#373737',
            '#373737', accentColor, '#212121', '#fff', '#7f7f7f', '#121212', '#fff', '#373737', '#fff', '#fff', '#373737', '#fff'
        );
    }

    private createLightColors(accentColor: string): ThemeNeutralColors {
        return new ThemeNeutralColors(
            '#828282', 'rgba(0, 0, 0, 0.05)', 'rgba(0, 0, 0, 0.1)', '#909090', '#000', '#f7f7f7', '#fefefe', '#fefefe',
            '#f0f0f0', '#000', '#838383', '#dedede', '#333', '#cecece', 'transparent', 'transparent', '#d7d7d7', '#d7d7d7',
            accentColor, '#ededed', '#000', '#838383', '#fdfdfd', '#fff', '#d7d7d7', '#000', '#fff', '#d7d7d7', '#fff'
        );
    }
}