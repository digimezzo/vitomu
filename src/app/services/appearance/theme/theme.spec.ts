import { Theme } from './theme';
import { ThemeAuthor } from './theme-author';
import { ThemeCoreColors } from './theme-core-colors';
import { ThemeNeutralColors } from './theme-neutral-colors';
import { ThemeOptions } from './theme-options';

describe('Theme', () => {
    it('should preserve all theme metadata', () => {
        const author = new ThemeAuthor('Author', 'author@example.com');
        const colors = new ThemeNeutralColors(
            '#000', '#111', '#222', '#333', '#444', '#555', '#666', '#777', '#888', '#999', '#aaa', '#bbb', '#ccc', '#ddd',
            '#eee', '#fff', '#000', '#111', '#222', '#333', '#444', '#555', '#666', '#777', '#888', '#999', '#aaa', '#bbb', '#ccc'
        );
        const theme = new Theme('Test', author, new ThemeCoreColors('#111', '#222', '#333'), colors, colors, new ThemeOptions(true));

        expect(theme.author).toBe(author);
        expect(theme.options.centerAlbumInfoText).toBeTruthy();
        expect(theme.isBroken).toBeFalsy();
    });
});