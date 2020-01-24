import { Injectable } from '@angular/core';

@Injectable()
export class Delayer {
    constructor() {
    }

    private _canDelay: boolean = true;
    private _canExecute: boolean = true;


    public get canDelay(): boolean {
        return this._canDelay;
    }
    public set canDelay(v: boolean) {
        this._canDelay = v;
    }

    public get canExecute(): boolean {
        return this._canExecute;
    }
    public set canExecute(v: boolean) {
        this._canExecute = v;
    }

    public execute(action: any, delayMilliseconds: number): void {
        if (this.canDelay) {
            setTimeout(() => {
                if (this.canExecute) {
                    action();
                }
            }, delayMilliseconds);
        } else {
            if (this.canExecute) {
                action();
            }
        }
    }
}
