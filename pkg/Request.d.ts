import { Reactor } from './Reactor';
export declare class Request extends Reactor<Request.Options> implements Reactor.Relay<Request.Options> {
    private address;
    constructor(address: string);
    relay(options: Request.Options): void;
}
export declare namespace Request {
    interface Options extends RequestInit {
    }
}
