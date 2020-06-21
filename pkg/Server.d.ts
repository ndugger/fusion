import { Reactor } from './Reactor';
import { Socket } from './Socket';
export declare class Server extends Reactor<Socket> {
    private server;
    listen(port: number): void;
}
export declare namespace Server {
    enum Action {
        Connect = "server_connect",
        Listen = "server_listen",
        Error = "server_error"
    }
}
