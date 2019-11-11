import { remote } from 'electron';

export class Paths {
    constructor() { }

    public static applicatioDataFolder(): string {
        return remote.app.getPath("userData");
    }

    public static musicFolder(): string {
        return remote.app.getPath("music");
    }
}