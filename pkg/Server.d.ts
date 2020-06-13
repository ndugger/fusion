import { Reactor } from './Reactor';
export declare class Server extends Reactor {
    private server;
    listen(port: number): void;
}
export declare namespace Server {
    enum Action {
        Listen = "server_listen",
        Error = "server_error"
    }
}
