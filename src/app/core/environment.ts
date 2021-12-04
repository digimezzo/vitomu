import { Injectable } from '@angular/core';

@Injectable()
export class Environment {
    constructor() {}

    public isWindows(): boolean {
        return process.platform === 'win32';
    }
}
