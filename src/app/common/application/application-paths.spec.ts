import { ApplicationPaths } from './application-paths';

describe('ApplicationPaths', () => {
    describe('themesFolder', () => {
        it('should return the themes folder', () => {
            // Arrange

            // Act
            const themesFolder: string = ApplicationPaths.themesFolder;

            // Assert
            expect(themesFolder).toEqual('Themes');
        });
    });
});
