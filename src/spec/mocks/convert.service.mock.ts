import { Observable, Subject } from 'rxjs';

export class ConvertServiceMock {
    private conversionProgressChanged: Subject<number> = new Subject<number>();
    public conversionProgressChanged$: Observable<number> = this.conversionProgressChanged.asObservable();

    public onConversionProgressChanged(progressPercent: number): void {
        this.conversionProgressChanged.next(progressPercent);
    }

    public async checkPrerequisitesAsync(): Promise<void> {
    }
}
