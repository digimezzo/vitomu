import { Injectable } from '@angular/core';
import { clipboard } from 'electron';
import { Observable, Subject } from 'rxjs';
import { Strings } from './Strings';

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
        setInterval(() => {
            const clipBoardText: string = clipboard.readText();

            if (!Strings.isNullOrWhiteSpace(clipBoardText)) {
                this.onClipboardContentChanged(clipBoardText);
            }
        }, 2000);
    }
}
