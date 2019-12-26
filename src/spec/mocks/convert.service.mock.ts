import { Subject, Observable } from "rxjs";
import { ConvertState } from "../../app/services/convert/convert-state";

export class ConvertServiceMock {
    private convertStateChanged = new Subject<ConvertState>();
    public convertStateChanged$: Observable<ConvertState> = this.convertStateChanged.asObservable();

    private convertProgressChanged = new Subject<number>();
    public convertProgressChanged$: Observable<number> = this.convertProgressChanged.asObservable();

    onConvertStateChanged(convertState: ConvertState) {
        this.convertStateChanged.next(convertState);
    }

    public onConvertProgressChanged(progressPercent: number): void {
        this.convertProgressChanged.next(progressPercent);
    }
}