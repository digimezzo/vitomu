export abstract class BaseSettings {
    public abstract get defaultLanguage(): string;
    public abstract language: string;
    public abstract audioFormat: string;
    public abstract audioBitrate: number;
    public abstract checkForUpdates: boolean;
    public abstract useCustomTitleBar: boolean;
    public abstract fontSize: number;
    public abstract colorTheme: string;
}
