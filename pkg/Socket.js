import * as NodeWebSocket from 'ws';
import { Reactor } from './Reactor';
/**
 * Abstracts web socket client
 */
export class Socket extends Reactor {
    constructor(addressOrSocket) {
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
                this.emit(JSON.parse(data));
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
                this.emit(JSON.parse(data));
            });
            this.connection.on('open', event => {
                this.emit({
                    action: Socket.Action.Open,
                    details: event
                });
            });
        }
    }
    close() {
        this.connection.close();
        this.emit({
            action: Socket.Action.Close,
            details: undefined
        });
    }
    relay(packet) {
        this.connection.send(JSON.stringify(packet));
    }
}
(function (Socket) {
    let Action;
    (function (Action) {
        Action["Close"] = "socket_close";
        Action["Error"] = "socket_error";
        Action["Open"] = "socket_open";
    })(Action = Socket.Action || (Socket.Action = {}));
})(Socket || (Socket = {}));
//# sourceMappingURL=Socket.js.map