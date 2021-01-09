import * as NodeWebSocket from 'ws';

import { Reactor } from './Reactor';
import { Relay } from './Relay'

/**
 * Abstracts web socket client
 */
export class Socket extends Reactor<Relay.Packet> implements Relay {

    private connection: WebSocket | NodeWebSocket;

    public constructor(addressOrSocket?: string | NodeWebSocket) {
        super();

        if (addressOrSocket instanceof NodeWebSocket) {
            this.connection = addressOrSocket;

            this.connection.on('error', (error: Error) => {
                this.emit({
                    type: Socket.Action.Error,
                    data: error
                });
            });

            this.connection.on('message', (message: string) => {
                this.emit(JSON.parse(message));
            });

            this.connection.on('open', (event: Event) => {
                this.emit({
                    type: Socket.Action.Open,
                    data: event
                });
            });

            return;
        }
        
        if ('WebSocket' in globalThis) {
            this.connection = new WebSocket(addressOrSocket);

            this.connection.addEventListener('error', (event: ErrorEvent) => {
                this.emit({
                    type: Socket.Action.Error,
                    data: event
                });
            });

            this.connection.addEventListener('message', (event: MessageEvent) => {
                this.emit(JSON.parse(event.data));
            });

            this.connection.addEventListener('open', (event: Event) => {
                this.emit({
                    type: Socket.Action.Open,
                    data: event
                });
            });
        }
        else {
            this.connection = new NodeWebSocket(addressOrSocket);

            this.connection.on('error', (error: Error) => {
                this.emit({
                    type: Socket.Action.Error,
                    data: error
                });
            });

            this.connection.on('message', (message: string) => {
                this.emit(JSON.parse(message as string));
            });

            this.connection.on('open', (event: Event) => {
                this.emit({
                    type: Socket.Action.Open,
                    data: event
                });
            });
        }
    }

    public close(): void {
        this.connection.close();
        this.emit({ 
            type: Socket.Action.Close
        });
    }

    public relay(packet: Relay.Packet): void {
        this.connection.send(JSON.stringify(packet));
    }
}

export namespace Socket {

    export enum Action {
        Close = 'socket_close',
        Error = 'socket_error',
        Open = 'socket_open'
    }
}