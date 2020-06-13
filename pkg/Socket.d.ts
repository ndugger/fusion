import * as NodeWebSocket from 'ws';
import { Reactor } from './Reactor';
/**
 * Abstracts web socket client
 */
export declare class Socket extends Reactor<Socket.Packet> implements Reactor.Relay {
    private connection;
    constructor(addressOrSocket?: string | NodeWebSocket);
    close(): void;
    relay(packet: Socket.Packet): void;
}
export declare namespace Socket {
    enum Action {
        Close = "socket_close",
        Error = "socket_error",
        Open = "socket_open"
    }
    interface Packet<Details = unknown> {
        action: string;
        details: Details;
    }
}
