import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BrowserWindow } from 'electron';
import { Logger } from './common/logger';
import { ErrorDialogComponent } from './components/dialogs/error-dialog/error-dialog.component';
import { Application } from './common/io/application';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private application: Application, private logger: Logger, private dialog: MatDialog, private zone: NgZone) {
    }

    public handleError(error: any): void {
        this.logger.error(`Handling global error. Cause: ${error}.`, 'GlobalErrorHandler', 'handleError');
        this.showGlobalErrorDialog();
    }

    public showGlobalErrorDialog(): void {
        this.logger.info('Showing global error dialog', 'GlobalErrorHandler', 'showGlobalErrorDialog');

        this.zone.run(() => {
            const dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, {
                // TranslationService is not able to provide the translation of texts in this class.
                // So we use a workaround where the translation happens in the error dialog itself.
                width: '450px',
                data: { isGlobalError: true }
            });

            dialogRef.afterClosed().subscribe((result) => {
                // Quit the application
                this.logger.info('Closing application', 'GlobalErrorHandler', 'showGlobalErrorDialog');
                const win: BrowserWindow = this.application.getCurrentWindow();
                win.close();
            });
        });
    }
}
