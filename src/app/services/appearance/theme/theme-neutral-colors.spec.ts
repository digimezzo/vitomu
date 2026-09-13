import { ThemeNeutralColors } from './theme-neutral-colors';

describe('ThemeNeutralColors', () => {
    it('should expose the expanded neutral color set', () => {
        const colors = new ThemeNeutralColors(
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
            '21', '22', '23', '24', '25', '26', '27', '28', '29'
        );

        expect(colors.selectedItemBackground).toEqual('3');
        expect(colors.mainBackground).toEqual('6');
        expect(colors.dialogBackground).toEqual('23');
        expect(colors.highlightForeground).toEqual('29');
    });
});