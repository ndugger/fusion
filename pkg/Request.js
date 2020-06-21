import * as http from 'http';
import * as url from 'url';
import { Reactor } from './Reactor';
export class Request extends Reactor {
    constructor(address) {
        super();
        this.address = address;
    }
    relay(options) {
        if ('fetch' in globalThis) {
            fetch(this.address, options)
                .then(response => {
            })
                .catch(error => {
            });
        }
        else {
            http.request(Object.assign(options, url.parse(this.address)), response => {
            });
        }
    }
}
//# sourceMappingURL=Request.js.map