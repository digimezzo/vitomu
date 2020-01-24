import { Observable, Subject } from 'rxjs';

export class ClipboardWatcherMock {
    private clipboardContentChanged: Subject<string> = new Subject<string>();
    public clipboardContentChanged$: Observable<string> = this.clipboardContentChanged.asObservable();

    public onClipboardContentChanged(clipBoardText: string): void {
        this.clipboardContentChanged.next(clipBoardText);
    }
}
