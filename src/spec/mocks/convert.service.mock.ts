import { Observable, Subject } from 'rxjs';
import { ConvertState } from '../../app/services/convert/convert-state';

export class ConvertServiceMock {
    private convertStateChanged: Subject<ConvertState> = new Subject<ConvertState>();
    public convertStateChanged$: Observable<ConvertState> = this.convertStateChanged.asObservable();

    private convertProgressChanged: Subject<number> = new Subject<number>();
    public convertProgressChanged$: Observable<number> = this.convertProgressChanged.asObservable();

    public onConvertStateChanged(convertState: ConvertState): void {
        this.convertStateChanged.next(convertState);
    }

    public onConvertProgressChanged(progressPercent: number): void {
        this.convertProgressChanged.next(progressPercent);
    }

    public async checkPrerequisitesAsync(): Promise<void> {
    }
}
