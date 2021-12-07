import { Injectable } from '@angular/core';
import { remote, shell } from 'electron';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class Desktop {
    private accentColorChanged: Subject<void> = new Subject();

    constructor() {
        if (remote.systemPreferences != undefined) {
            remote.systemPreferences.on('accent-color-changed', () => this.accentColorChanged.next());
        }
    }

    public accentColorChanged$: Observable<void> = this.accentColorChanged.asObservable();

    public openLink(url: string): void {
        shell.openExternal(url);
    }

    public showInFolder(fileName: string): void {
        shell.showItemInFolder(fileName);
    }

    public openInDefaultApplication(fileName: string): void {
        shell.openItem(fileName);
    }

    public getAccentColor(): string {
        return remote.systemPreferences.getAccentColor();
    }
}
