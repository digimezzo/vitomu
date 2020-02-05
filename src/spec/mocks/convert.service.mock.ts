import { Observable, Subject } from 'rxjs';

export class ConvertServiceMock {
    private conversionSuccessful: Subject<void> = new Subject<void>();
    public conversionSuccessful$: Observable<void> = this.conversionSuccessful.asObservable();

    private conversionFailed: Subject<void> = new Subject<void>();
    public conversionFailed$: Observable<void> = this.conversionFailed.asObservable();

    private conversionProgressChanged: Subject<number> = new Subject<number>();
    public conversionProgressChanged$: Observable<number> = this.conversionProgressChanged.asObservable();

    public onConversionSuccessful(): void {
        this.conversionSuccessful.next();
    }

    public onConversionFailed(): void {
        this.conversionFailed.next();
    }

    public onConversionProgressChanged(progressPercent: number): void {
        this.conversionProgressChanged.next(progressPercent);
    }

    public async checkPrerequisitesAsync(): Promise<void> {
    }
}
