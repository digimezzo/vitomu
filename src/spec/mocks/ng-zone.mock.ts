export class NgZoneMock {

    run(fn: Function): any { return fn(); }
}