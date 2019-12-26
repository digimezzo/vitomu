import { Subject, Observable } from "rxjs";

export class ConvertServiceMock {
    private convertStatusChanged = new Subject<boolean>();
    public convertStatusChanged$: Observable<boolean> = this.convertStatusChanged.asObservable();

    private convertProgressChanged = new Subject<number>();
    public convertProgressChanged$: Observable<number> = this.convertProgressChanged.asObservable();

    private conversionSuccessful = new Subject<string>();
    public conversionSuccessful$: Observable<string> = this.conversionSuccessful.asObservable();

    private conversionFailed = new Subject<void>();
    public conversionFailed$: Observable<void> = this.conversionFailed.asObservable();

    private ffmpegNotFound = new Subject<void>();
    public ffmpegNotFound$: Observable<void> = this.ffmpegNotFound.asObservable();

    onConvertStatusChanged(isConverting: boolean) {
        this.convertStatusChanged.next(isConverting);
    }

    public onConvertProgressChanged(progressPercent: number): void {
        this.convertProgressChanged.next(progressPercent);
    }

    public onConversionSuccessful(fileName: string): void {
        this.conversionSuccessful.next(fileName);
    }

    public onConversionFailed(): void {
        this.conversionFailed.next();
    }

    public onFFmpegNotFound(): void {
        this.ffmpegNotFound.next();
    }
}