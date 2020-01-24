import { Injectable } from '@angular/core';
import { clipboard, ipcRenderer } from 'electron';
import { Observable, Subject } from 'rxjs';
import { Events } from './events';

@Injectable()
export class ClipboardWatcher {
    constructor() {
        this.startWatching();
    }

    private clipboardContentChanged: Subject<string> = new Subject<string>();
    public clipboardContentChanged$: Observable<string> = this.clipboardContentChanged.asObservable();

    public onClipboardContentChanged(clipBoardText: string): void {
        this.clipboardContentChanged.next(clipBoardText);
    }

    private startWatching(): void {
        ipcRenderer.on(Events.windowFocusChangedEvent, () => {
            const clipBoardText: string = clipboard.readText();

            if (clipBoardText) {
                this.onClipboardContentChanged(clipBoardText);
            }
        });
    }
}
