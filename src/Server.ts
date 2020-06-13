import * as NodeWebSocket from 'ws';

import { Reactor } from './Reactor';
import { Socket } from './Socket';

export class Server extends Reactor {
    
    private server: NodeWebSocket.Server;

    public listen(port: number): void {
        this.server = new NodeWebSocket.Server({ port });

        this.server.on('connection', async connection => {
            const socket = new Socket(connection);

            for await (const packet of socket.stream()) {
                console.log(packet)
            }
        });

        setInterval(() => console.log('waiting'), 1000);
    }
}

export namespace Server {

    export enum Action {
        Listen = 'server_listen',
        Error = 'server_error'
    }
}