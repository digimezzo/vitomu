export class NgZoneMock {

    run(fn: Function): Promise<void> { return Promise.resolve(fn()); }
}