import * as remote from '@electron/remote';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Application {
    public getCurrentWindow(): Electron.BrowserWindow {
        return remote.getCurrentWindow();
    }
}
