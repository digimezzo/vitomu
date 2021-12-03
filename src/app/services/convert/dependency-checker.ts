import { Injectable } from '@angular/core';
import * as path from 'path';
import { FileSystem } from '../../core/file-system';
import { Logger } from '../../core/logger';

@Injectable()
export class DependencyChecker {
    constructor(
        private dependencyFolderName: string,
        private dependencyFileName: string,
        private logger: Logger,
        private fileSystem: FileSystem
    ) {}

    public get downloadedDependencyFolder(): string {
        return path.join(this.fileSystem.applicatioDataDirectory(), this.dependencyFolderName);
    }

    public async isDependencyAvailableAsync(): Promise<boolean> {
        return (await this.isDependencyInSystemPathAsync()) || this.getPathOfDownloadedDependency() !== '';
    }

    public async isDependencyInSystemPathAsync(): Promise<boolean> {
        return await this.fileSystem.commanExistsAsync(this.dependencyFileName);
    }

    public getPathOfDownloadedDependency(): string {
        if (!this.fileSystem.pathExists(this.downloadedDependencyFolder)) {
            this.logger.info(
                `Dependency folder "${this.downloadedDependencyFolder}" was not found`,
                'DependencyChecker',
                'getPathOfDownloadedDependency'
            );

            return '';
        }

        const dependencyFile: string = this.fileSystem
            .readDirectory(this.downloadedDependencyFolder)
            .find((file) => file.includes(this.dependencyFileName));

        if (!dependencyFile) {
            this.logger.info(
                `Dependency was not found in folder ${this.downloadedDependencyFolder}`,
                'DependencyChecker',
                'getPathOfDownloadedDependency'
            );

            return '';
        }

        const dependencyFilePath: string = path.join(this.downloadedDependencyFolder, dependencyFile);
        this.logger.info(`Dependency was found in at '${dependencyFilePath}'`, 'DependencyChecker', 'getPathOfDownloadedDependency');

        return dependencyFilePath;
    }
}