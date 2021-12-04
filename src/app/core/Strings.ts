export class Strings {
    public static isNullOrWhiteSpace(stringToCheck: string): boolean {
        if (stringToCheck == undefined) {
            return true;
        }

        try {
            if (stringToCheck.trim() === '') {
                return true;
            }
        } catch (error) {
            return true;
        }

        return false;
    }
}
