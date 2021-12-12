import { Injectable } from '@angular/core';
import * as commandExists from 'command-exists-promise';
import { remote } from 'electron';
import * as fs from 'fs-extra';
import * as path from 'path';

@Injectable()
export class FileSystem {
    private _pathSeparator: string = '';

    constructor() {
        this._pathSeparator = path.sep;
    }

    public combinePath(pathPieces: string[]): string {
        if (pathPieces == undefined || pathPieces.length === 0) {
            return '';
        }

        if (pathPieces.length === 1) {
            return pathPieces[0];
        }

        const combinedPath: string = pathPieces.join(this._pathSeparator);

        return combinedPath;
    }

    public applicationDataDirectory(): string {
        return remote.app.getPath('userData');
    }

    public musicDirectory(): string {
        return remote.app.getPath('music');
    }

    public async ensureDirectoryAsync(directory: string): Promise<void> {
        await fs.ensureDir(directory);
    }

    public pathExists(pathToCheck: string): boolean {
        return fs.existsSync(pathToCheck);
    }

    public readDirectory(directory: string): any[] {
        return fs.readdirSync(directory);
    }

    public async commandExistsAsync(command: string): Promise<boolean> {
        return await commandExists(command);
    }

    public getFileName(filePath: string): string {
        return path.basename(filePath);
    }

    public createWriteStream(filePath: string): any {
        return fs.createWriteStream(filePath);
    }

    public makeFileExecutable(filePath: string): any {
        fs.chmodSync(filePath, '755');
    }

    public getFilesInDirectory(directoryPath: string): string[] {
        const fileNames: string[] = fs.readdirSync(directoryPath);

        return fileNames
            .filter((fileName) => fs.lstatSync(this.combinePath([directoryPath, fileName])).isFile())
            .map((fileName) => this.combinePath([directoryPath, fileName]));
    }

    public createFullDirectoryPathIfDoesNotExist(directoryPath: string): void {
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }
    }

    public getFileContent(filePath: string): string {
        return fs.readFileSync(filePath, 'utf-8');
    }

    public writeToFile(filePath: string, textToWrite: string): void {
        fs.writeFileSync(filePath, textToWrite);
    }
}
