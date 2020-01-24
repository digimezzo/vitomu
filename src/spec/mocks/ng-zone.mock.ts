export class NgZoneMock {

    public run(fn: Function): Promise<void> { return Promise.resolve(fn()); }
}
