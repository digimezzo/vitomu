import { Injectable } from '@angular/core';
import * as remote from '@electron/remote';
import { execSync } from 'child_process';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class Desktop {
    private accentColorChanged: Subject<void> = new Subject();
    private nativeThemeUpdated: Subject<void> = new Subject();

    constructor() {
        if (remote.systemPreferences != undefined) {
            remote.systemPreferences.on('accent-color-changed', () => this.accentColorChanged.next());
        }

        if (remote.nativeTheme != undefined) {
            remote.nativeTheme.on('updated', () => this.nativeThemeUpdated.next());
        }
    }

    public accentColorChanged$: Observable<void> = this.accentColorChanged.asObservable();
    public nativeThemeUpdated$: Observable<void> = this.nativeThemeUpdated.asObservable();

    public openLink(url: string): void {
        remote.shell.openExternal(url);
    }

    public showInFolder(fileName: string): void {
        remote.shell.showItemInFolder(fileName);
    }

    public getAccentColor(): string {
        if (process.platform === 'linux') {
            return this.getLinuxAccentColor();
        }

        return remote.systemPreferences.getAccentColor();
    }

    public showFileInDirectory(filePath: string): void {
        remote.shell.showItemInFolder(filePath);
    }

    public isSnap(): boolean {
        return remote.getGlobal('isSnap') === true;
    }

    public shouldUseDarkColors(): boolean {
        return remote.nativeTheme.shouldUseDarkColors;
    }

    public openPath(path: string): void {
        remote.shell.openPath(path);
    }

    private getLinuxAccentColor(): string {
        try {
            const output = execSync(
                'gdbus call --session --dest org.freedesktop.portal.Desktop ' +
                    '--object-path /org/freedesktop/portal/desktop ' +
                    '--method org.freedesktop.portal.Settings.Read ' +
                    'org.freedesktop.appearance accent-color',
                { timeout: 2000, encoding: 'utf-8' },
            );

            const match = output.match(/([\d.]+),\s*([\d.]+),\s*([\d.]+)/);

            if (match == undefined) {
                return '';
            }

            const red = Math.round(parseFloat(match[1]) * 255);
            const green = Math.round(parseFloat(match[2]) * 255);
            const blue = Math.round(parseFloat(match[3]) * 255);

            if (isNaN(red) || isNaN(green) || isNaN(blue)) {
                return '';
            }

            const toHex = (value: number): string => Math.max(0, Math.min(255, value)).toString(16).padStart(2, '0');

            return toHex(red) + toHex(green) + toHex(blue) + 'ff';
        } catch {
            return '';
        }
    }
}
