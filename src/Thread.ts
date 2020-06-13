import * as WorkerThreads from 'worker_threads';

import { Reactor } from './Reactor';

/**
 * Abstracts worker
 */
export class Thread extends Reactor<Thread.Instruction> implements Reactor.Relay {

    public static currentThread(): Thread {
        return new Thread(globalThis as unknown as Worker);
    }
    
    private worker: Worker | WorkerThreads.Worker;

    public constructor(addressOrWorker: string | Worker | WorkerThreads.Worker) {
        super();

        if (typeof addressOrWorker === 'string') {

            if ('Worker' in globalThis) {
                this.worker = new Worker(addressOrWorker as string);
                this.worker.addEventListener('message', event => {
                    this.emit(event.data);
                });

                return;
            }
            
            this.worker = new WorkerThreads.Worker(addressOrWorker as string);
            this.worker.on('message', data => {
                this.emit(data);
            });

            return;
        }

        if ('Worker' in globalThis) {
            this.worker = addressOrWorker as Worker;
            this.worker.addEventListener('message', event => {
                this.emit(event.data);
            });

            return;
        }

        this.worker = addressOrWorker as WorkerThreads.Worker;
        this.worker.on('message', data => {
            this.emit(data);
        });
    }

    public relay(instruction: Thread.Instruction): void {
        this.worker.postMessage(instruction);
    }

    public terminate(): void {
        this.worker.terminate();
        this.emit({
            action: Thread.Action.Terminate,
            details: undefined
        });
    }
}

export namespace Thread {

    export enum Action {
        Terminate = 'thread_terminate'
    }

    export interface Instruction<Details = unknown> {
        action: string;
        details: Details;
    }
}