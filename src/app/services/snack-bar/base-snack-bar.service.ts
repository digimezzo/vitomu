export abstract class BaseSnackBarService {
    public abstract notifyOfNewVersionAsync(version: string): Promise<void>;
    public abstract showActionSnackBar(message: string, action: string): void;
}
