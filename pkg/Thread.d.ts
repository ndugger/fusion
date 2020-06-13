/// <reference types="node" />
import * as WorkerThreads from 'worker_threads';
import { Reactor } from './Reactor';
/**
 * Abstracts worker
 */
export declare class Thread extends Reactor<Thread.Instruction> implements Reactor.Relay {
    static currentThread(): Thread;
    private worker;
    constructor(addressOrWorker: string | Worker | WorkerThreads.Worker);
    relay(instruction: Thread.Instruction): void;
    terminate(): void;
}
export declare namespace Thread {
    enum Action {
        Terminate = "thread_terminate"
    }
    interface Instruction<Details = unknown> {
        action: string;
        details: Details;
    }
}
