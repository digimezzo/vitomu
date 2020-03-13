import { ConversionResult } from '../../app/services/convert/conversion-result';
import * as assert from 'assert';

describe('ConversionResult', () => {
    describe('constructor', () => {
        it('Should indicate if conversion succeeded', () => {
            // Arrange & Act
            const convertVideoResult: ConversionResult = new ConversionResult(true, '/home/user/Music/Vitomu');

            // Assert
            assert.ok(convertVideoResult.isConversionSuccessful);
        });

        it('Should indicate if conversion failed', () => {
            // Arrange & Act
            const convertVideoResult: ConversionResult = new ConversionResult(false, '/home/user/Music/Vitomu');

            // Assert
            assert.ok(!convertVideoResult.isConversionSuccessful);
        });

        it('Should return empty converted file path if conversion failed', () => {
            // Arrange & Act
            const convertVideoResult: ConversionResult = new ConversionResult(false, '/home/user/Music/Vitomu');

            // Assert
            assert.equal(convertVideoResult.convertedFilePath, '');
        });

        it('Should return given converted file path path if conversion succeeded', () => {
            // Arrange & Act
            const convertVideoResult: ConversionResult = new ConversionResult(true, '/home/user/Music/Vitomu');

            // Assert
            assert.equal(convertVideoResult.convertedFilePath, '/home/user/Music/Vitomu');
        });
    });
});
