import * as NodeWebSocket from 'ws';

import { Reactor } from './Reactor';
import { Socket } from './Socket';

export class Server extends Reactor<Socket> {
    
    private server: NodeWebSocket.Server;

    public listen(port: number): void {
        this.server = new NodeWebSocket.Server({ port });
        
        this.server.on('connection', async connection => {
            this.emit(new Socket(connection));
        });
    }
}

export namespace Server {

    export enum Action {
        Connect = 'server_connect',
        Listen = 'server_listen',
        Error = 'server_error'
    }
}