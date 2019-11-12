import * as fs from 'fs-extra';
import { Injectable } from '@angular/core';

@Injectable()
export class FileSystem{
    constructor() {
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