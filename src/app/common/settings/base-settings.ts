export abstract class BaseSettings {
    public abstract get defaultLanguage(): string;
    public abstract language: string;
    public abstract audioFormat: string;
    public abstract audioBitrate: number;
    public abstract checkForUpdates: boolean;
    public abstract useSystemTitleBar: boolean;
    public abstract fontSize: number;
    public abstract followSystemTheme: boolean;
    public abstract useLightBackgroundTheme: boolean;
    public abstract followSystemColor: boolean;
    public abstract theme: string;
}
