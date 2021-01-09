import * as WorkerThreads from 'worker_threads'

import { Reactor } from './Reactor'
import { Relay } from './Relay'

/**
 * Abstracts worker
 */
export class Thread extends Reactor<Relay.Packet> implements Relay {

    public static currentThread(): Thread {
        return new Thread(globalThis as unknown as Worker)
    }
    
    private worker: Worker | WorkerThreads.Worker

    public constructor(addressOrWorker: string | Worker | WorkerThreads.Worker) {
        super()

        if (typeof addressOrWorker === 'string') {

            if ('Worker' in globalThis) {
                this.worker = new Worker(addressOrWorker)
                this.worker.addEventListener('message', (event: MessageEvent) => {
                    this.emit(event.data)
                })

                return
            }
            
            this.worker = new WorkerThreads.Worker(addressOrWorker)
            this.worker.on('message', (message: Relay.Packet) => {
                this.emit(message)
            })

            return
        }

        if ('Worker' in globalThis) {
            this.worker = addressOrWorker
            this.worker.addEventListener('message', (event:  MessageEvent) => {
                this.emit(event.data)
            })

            return
        }

        this.worker = addressOrWorker as WorkerThreads.Worker;
        this.worker.on('message', (message: Relay.Packet) => {
            this.emit(message)
        })
    }

    public close(): void {
        this.worker.terminate();
        this.emit({
            type: Thread.Action.Close
        })
    }

    public relay(packet: Relay.Packet): void {
        this.worker.postMessage(packet)
    }
}

export namespace Thread {

    export enum Action {
        Close = 'thread_close'
    }
}
