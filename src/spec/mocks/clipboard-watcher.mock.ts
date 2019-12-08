import { Subject, Observable } from "rxjs";

export class ClipboardWatcherMock {
    private clipboardContentChanged = new Subject<string>();
    public clipboardContentChanged$: Observable<string> = this.clipboardContentChanged.asObservable();

    public onClipboardContentChanged(clipBoardText: string): void {
        this.clipboardContentChanged.next(clipBoardText);
    }
}
