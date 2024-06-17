import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';
import { Observable, Subject } from 'rxjs';
import * as remote from '@electron/remote';

@Injectable()
export class RemoteProxy implements RemoteProxy {
    private argumentsReceived: Subject<string[]> = new Subject();

    constructor() {
        ipcRenderer.on('arguments-received', (event, argv) => {
            this.argumentsReceived.next(argv);
        });
    }

    public argumentsReceived$: Observable<string[]> = this.argumentsReceived.asObservable();

    public getGlobal(name: string): any {
        return remote.getGlobal(name);
    }

    public getCurrentWindow(): Electron.BrowserWindow {
        return remote.getCurrentWindow();
    }

    public getParameters(): string[] {
        return remote.process.argv;
    }
}
