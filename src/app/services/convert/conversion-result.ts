export class ConversionResult {
    constructor(public isConversionSuccessful: boolean, private proposedConvertedFilePath: string) {
        if (isConversionSuccessful) {
            this.convertedFilePath = proposedConvertedFilePath;
        } else {
            this.convertedFilePath = '';
        }
    }

    public convertedFilePath: string;
}
