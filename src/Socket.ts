import * as NodeWebSocket from 'ws';

import { Reactor } from './Reactor';

/**
 * Abstracts web socket client
 */
export class Socket extends Reactor<Socket.Packet> implements Reactor.Relay {

    private connection: WebSocket | NodeWebSocket;

    public constructor(addressOrSocket?: string | NodeWebSocket) {
        super();

        if (addressOrSocket instanceof NodeWebSocket) {
            this.connection = addressOrSocket;

            this.connection.on('error', error => {
                this.emit({
                    action: Socket.Action.Error,
                    details: error
                });
            });

            this.connection.on('message', data => {
                this.emit(JSON.parse(data as string));
            });

            this.connection.on('open', event => {
                this.emit({
                    action: Socket.Action.Open,
                    details: event
                });
            });

            return;
        }
        
        if ('WebSocket' in globalThis) {
            this.connection = new WebSocket(addressOrSocket);

            this.connection.addEventListener('error', event => {
                this.emit({
                    action: Socket.Action.Error,
                    details: event
                });
            });

            this.connection.addEventListener('message', event => {
                this.emit(JSON.parse(event.data));
            });

            this.connection.addEventListener('open', event => {
                this.emit({
                    action: Socket.Action.Open,
                    details: event
                });
            });
        }
        else {
            this.connection = new NodeWebSocket(addressOrSocket);

            this.connection.on('error', error => {
                this.emit({
                    action: Socket.Action.Error,
                    details: error
                });
            });

            this.connection.on('message', data => {
                this.emit(JSON.parse(data as string));
            });

            this.connection.on('open', event => {
                this.emit({
                    action: Socket.Action.Open,
                    details: event
                });
            });
        }
    }

    public close(): void {
        this.connection.close();
        this.emit({ 
            action: Socket.Action.Close, 
            details: undefined 
        });
    }

    public relay(packet: Socket.Packet): void {
        this.connection.send(JSON.stringify(packet));
    }
}

export namespace Socket {

    export enum Action {
        Close = 'socket_close',
        Error = 'socket_error',
        Open = 'socket_open'
    }

    export interface Packet<Details = unknown> {
        action: string;
        details: Details;
    }
}