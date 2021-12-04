import { Injectable } from '@angular/core';
import * as child from 'child_process';
import { Environment } from '../../core/environment';
import { FileSystem } from '../../core/file-system';
import { Logger } from '../../core/logger';

@Injectable()
export class YoutubeDlUpdater {
    constructor(private environment: Environment, private fileSystem: FileSystem, private logger: Logger) {}

    public updateYoutubeDl(youtubeDlPath: string): void {
        try {
            const youtubeDlUpdateCommand: string = `${youtubeDlPath} -U`;

            this.logger.info(`Executing command:. ${youtubeDlUpdateCommand}`, 'YoutubeDlUpdater', 'updateYoutubeDlAsync');

            const process: child.ChildProcess = child.exec(youtubeDlUpdateCommand, (err, stdout, stderr) => {
                if (err) {
                    this.logger.error(
                        `An error occurred while updating Youtube-dl. Error: ${err}`,
                        'YoutubeDlUpdater',
                        'updateYoutubeDlAsync'
                    );
                }
            });

            process.stdout.on('data', (data) => {
                this.logger.info(data.toString(), 'YoutubeDlUpdater', 'updateYoutubeDlAsync');
            });
        } catch (error) {
            this.logger.error(`Could not update Youtube-dl. Error: ${error}`, 'YoutubeDlUpdater', 'updateYoutubeDlAsync');
        }
    }
}
