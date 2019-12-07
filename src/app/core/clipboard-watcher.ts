import { Injectable } from "@angular/core";
import { ipcRenderer, clipboard } from 'electron';
import { Events } from "./events";
import { Subject, Observable } from "rxjs";

@Injectable()
export class ClipboardWatcher {
    constructor() {
        this.startWatching();
    }

    private clipboardContentChanged = new Subject<string>();
    public clipboardContentChanged$: Observable<string> = this.clipboardContentChanged.asObservable();

    private startWatching(): void {
        ipcRenderer.on(Events.windowFocusChangedEvent, () => {
            let clipBoardText: string = clipboard.readText();

            if (clipBoardText) {
                this.clipboardContentChanged.next(clipBoardText);
            }
        });
    }
}