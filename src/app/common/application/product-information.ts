import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ProductInformation {
    public get name(): string {
        return require('../../../../package.json').name;
    }

    public get version(): string {
        return require('../../../../package.json').version;
    }

    public get copyright(): string {
        return 'Copyright Digimezzo Ⓒ 2017 - 2021';
    }
}
