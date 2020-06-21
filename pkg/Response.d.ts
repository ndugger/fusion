import { Reactor } from './Reactor';
export declare class Response extends Reactor<Response.Options> implements Reactor.Relay<Response.Options> {
    relay(options: Response.Options): void;
}
export declare namespace Response {
    interface Options {
    }
}
