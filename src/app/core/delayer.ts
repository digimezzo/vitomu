import { Injectable } from "@angular/core";

@Injectable()
export class Delayer {
    constructor() {
    }

    private _canDelay: boolean = true;

    public get canDelay(): boolean {
        return this._canDelay;
    }
    public set canDelay(v: boolean) {
        this._canDelay = v;
    }

    public execute(action: any, delayMilliseconds: number): void {
        if (this.canDelay) {
            setTimeout(() => {
                action();
            }, delayMilliseconds);
        } else {
            action();
        }
    }
}