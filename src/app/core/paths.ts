import { remote } from 'electron';

export class Paths {
    constructor() { }

    public static applicatioData(): string {
        return remote.app.getPath("userData");
    }
}