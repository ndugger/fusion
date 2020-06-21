import * as WorkerThreads from 'worker_threads';
import { Reactor } from './Reactor';
/**
 * Abstracts worker
 */
export class Thread extends Reactor {
    constructor(addressOrWorker) {
        super();
        if (typeof addressOrWorker === 'string') {
            if ('Worker' in globalThis) {
                this.worker = new Worker(addressOrWorker);
                this.worker.addEventListener('message', event => {
                    this.emit(event.data);
                });
                return;
            }
            this.worker = new WorkerThreads.Worker(addressOrWorker);
            this.worker.on('message', data => {
                this.emit(data);
            });
            return;
        }
        if ('Worker' in globalThis) {
            this.worker = addressOrWorker;
            this.worker.addEventListener('message', event => {
                this.emit(event.data);
            });
            return;
        }
        this.worker = addressOrWorker;
        this.worker.on('message', data => {
            this.emit(data);
        });
    }
    static currentThread() {
        return new Thread(globalThis);
    }
    relay(instruction) {
        this.worker.postMessage(instruction);
    }
    terminate() {
        this.worker.terminate();
        this.emit({
            action: Thread.Action.Terminate,
            details: undefined
        });
    }
}
(function (Thread) {
    let Action;
    (function (Action) {
        Action["Terminate"] = "thread_terminate";
    })(Action = Thread.Action || (Thread.Action = {}));
})(Thread || (Thread = {}));
//# sourceMappingURL=Thread.js.map