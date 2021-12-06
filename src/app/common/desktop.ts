import { Injectable } from '@angular/core';
import { shell } from 'electron';

@Injectable()
export class Desktop {
    constructor() {
    }

    public openLink(url: string): void {
        shell.openExternal(url);
    }

    public showInFolder(fileName: string): void {
        shell.showItemInFolder(fileName);
    }

    public openInDefaultApplication(fileName: string): void {
        shell.openItem(fileName);
    }
}
