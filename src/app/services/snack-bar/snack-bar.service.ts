import { Injectable, NgZone } from '@angular/core';
import { BaseTranslatorService } from '../translator/base-translator.service';
import { BaseSnackBarService } from './base-snack-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class SnackBarService implements BaseSnackBarService {
    constructor(private zone: NgZone, private matSnackBar: MatSnackBar, private translatorService: BaseTranslatorService) {}

    public async notifyOfNewVersionAsync(version: string): Promise<void> {
        const message: string = await this.translatorService.getAsync('SnackBarMessages.NewVersionAvailable', { version: version });
        const action: string = await this.translatorService.getAsync('SnackBarActions.Ok');
        this.showActionSnackBar(message, action);
    }

    public showActionSnackBar(message: string, action: string): void {
        this.zone.run(() => {
            this.matSnackBar.open(message, action, { panelClass: ['dark-snackbar'] });
        });
    }
}
