import { ThemeCoreColors } from './theme-core-colors';
import { ThemeAuthor } from './theme-author';
import { ThemeCreator } from './theme-creator';
import { ThemeNeutralColors } from './theme-neutral-colors';
import { ThemeOptions } from './theme-options';

export class Theme {
    constructor(
        public name: string,
        public author: ThemeAuthor | ThemeCreator,
        public coreColors: ThemeCoreColors,
        public darkColors: ThemeNeutralColors,
        public lightColors: ThemeNeutralColors,
        public options: ThemeOptions,
        public isBroken: boolean = false
    ) {}

    public get creator(): ThemeCreator | undefined {
        return this.author instanceof ThemeCreator ? this.author : undefined;
    }
}
