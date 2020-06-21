var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as NodeWebSocket from 'ws';
import { Reactor } from './Reactor';
import { Socket } from './Socket';
export class Server extends Reactor {
    listen(port) {
        this.server = new NodeWebSocket.Server({ port });
        this.server.on('connection', (connection) => __awaiter(this, void 0, void 0, function* () {
            this.emit(new Socket(connection));
        }));
    }
}
(function (Server) {
    let Action;
    (function (Action) {
        Action["Connect"] = "server_connect";
        Action["Listen"] = "server_listen";
        Action["Error"] = "server_error";
    })(Action = Server.Action || (Server.Action = {}));
})(Server || (Server = {}));
//# sourceMappingURL=Server.js.map