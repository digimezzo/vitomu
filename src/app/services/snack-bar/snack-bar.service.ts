import { Injectable } from '@angular/core';
import { BaseTranslatorService } from '../translator/base-translator.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SnackBarService {
    private showNotification: Subject<string> = new Subject();
    private dismissNotification: Subject<void> = new Subject();
    
    public constructor(private translatorService: BaseTranslatorService) {}

    public showNotification$: Observable<string> = this.showNotification.asObservable();
    public dismissNotification$: Observable<void> = this.dismissNotification.asObservable();

    public dismiss(): void {
        this.dismissNotification.next();
    }
    
    public showDownloadUrl(downloadUrl: string): void {
        this.showNotification.next(downloadUrl)
    }

    public async notifyOfNewVersionAsync(version: string): Promise<void> {
        const message: string = await this.translatorService.getAsync('SnackBarMessages.NewVersionAvailable', { version: version });
        this.showNotification.next(message);
    }
    //
    // public showActionSnackBar(message: string, action: string): void {
    //     this.zone.run(() => {
    //         this.matSnackBar.open(message, action, { panelClass: ['dark-snackbar'] });
    //     });
    // }
}
