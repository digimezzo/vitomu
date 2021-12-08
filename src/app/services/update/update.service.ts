import { Injectable } from '@angular/core';
import { GitHubApi } from '../../common/github-api';
import { Logger } from '../../common/logger';
import { ProductDetails } from '../../common/product-details';
import { BaseSettings } from '../../common/settings/base-settings';
import { VersionComparer } from '../../common/version-comparer';
import { BaseSnackBarService } from '../snack-bar/base-snack-bar.service';
import { BaseUpdateService } from './base-update.service';

@Injectable({
    providedIn: 'root',
})
export class UpdateService implements BaseUpdateService {
    constructor(
        private snackBar: BaseSnackBarService,
        private settings: BaseSettings,
        private logger: Logger,
        private gitHub: GitHubApi,
        private productDetails: ProductDetails
    ) {}

    public async checkForUpdatesAsync(): Promise<void> {
        if (this.settings.checkForUpdates) {
            this.logger.info('Checking for updates', 'UpdateService', 'checkForUpdatesAsync');

            try {
                const currentRelease: string = this.productDetails.version;
                const latestRelease: string = await this.gitHub.getLastestReleaseAsync('digimezzo', 'vitomu');

                this.logger.info(`Current=${currentRelease}, Latest=${latestRelease}`, 'UpdateService', 'checkForUpdatesAsync');

                if (VersionComparer.isNewerVersion(currentRelease, latestRelease)) {
                    this.logger.info(
                        `Latest (${latestRelease}) > Current (${currentRelease}). Notifying user.`,
                        'UpdateService',
                        'checkForUpdatesAsync'
                    );
                    await this.snackBar.notifyOfNewVersionAsync(latestRelease);
                } else {
                    this.logger.info(
                        `Latest (${latestRelease}) <= Current (${currentRelease}). Nothing to do.`,
                        'UpdateService',
                        'checkForUpdatesAsync'
                    );
                }
            } catch (error) {
                this.logger.error(`Could not check for updates. Cause: ${error}`, 'UpdateService', 'checkForUpdatesAsync');
            }
        } else {
            this.logger.info('Not checking for updates', 'UpdateService', 'checkForUpdatesAsync');
        }
    }
}
