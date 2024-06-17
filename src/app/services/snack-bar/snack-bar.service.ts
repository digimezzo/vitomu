import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TranslatorService } from '../translator/translator.service';

@Injectable({
    providedIn: 'root',
})
export class SnackBarService {
    private showNotification: Subject<string> = new Subject();
    private dismissNotification: Subject<void> = new Subject();
    
    public constructor(private translatorService: TranslatorService) {}

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
}
