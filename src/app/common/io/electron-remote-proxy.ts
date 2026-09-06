import * as remote from '@electron/remote';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ElectronRemoteProxy {
    constructor() {
    }

    public getGlobal(name: string): any {
        return remote.getGlobal(name);
    }
}
