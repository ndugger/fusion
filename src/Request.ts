import * as http from 'http';
import * as url from 'url';

import { Reactor } from './Reactor';

export class Request extends Reactor<Request.Options> implements Reactor.Relay<Request.Options> {

    private address: string;

    public constructor(address: string) {
        super();
        this.address = address;
    }

    public relay(options: Request.Options) {

        if ('fetch' in globalThis) {
            fetch(this.address, options)
                .then(response => {

                })
                .catch(error => {

                });
        }
        else {
            http.request(Object.assign(options, url.parse(this.address)) as http.RequestOptions, response => {

            });
        }
    }
}

export namespace Request {

    export interface Options extends RequestInit {

    }
}