import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {

    constructor(private zone: NgZone, private matSnackBar: MatSnackBar) {
    }

    public showActionSnackBar(message: string, action: string): void {
        this.zone.run(() => {
            this.matSnackBar.open(message, action, { panelClass: ['dark-snackbar'] });
        });
    }
}
