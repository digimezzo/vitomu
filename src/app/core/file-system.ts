import * as fs from 'fs-extra';
import { Injectable } from '@angular/core';
import { remote } from 'electron';

@Injectable()
export class FileSystem{
    constructor() {
    }

    public applicatioDataFolder(): string {
        return remote.app.getPath("userData");
    }

    public musicFolder(): string {
        return remote.app.getPath("music");
    }

    public async ensureDir(directory: string): Promise<void>{
        await fs.ensureDir(directory);
    }

    public existsSync(path: string): boolean{
        return fs.existsSync(path);
    }

    public readdirSync(directory: string): any[]{
        return fs.readdirSync(directory);
    }
}