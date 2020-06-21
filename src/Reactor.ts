import { Queue } from "./Queue";

/**
 * Observable implemented with async generators
 */
export class Reactor<Emission = unknown> {

    /**
     * Promise resolver used to hold the stream in place while awaiting new emission
     */
    private marker?: (emission: Emission) => void;

    /**
     * Queue in which emissions are held
     */
    private queue: Queue<Emission>;

    /**
     * Asynchronously process next emission
     */
    private async continue(): Promise<Emission> {

        /**
         * If queue is empty, save marker while awaiting new emission
         */
        if (!this.queue.size) {
            return new Promise(resolve => this.marker = resolve);
        }

        return Promise.resolve(this.queue.dequeue());
    }

    /**
     * Stream emission
     * @param emission Emission to stream
     */
    protected async emit(emission: Emission): Promise<void> {

        /**
         * If stream awaiting next value, release marker
         */
        if (this.marker) {
            this.marker(emission);
            this.marker = undefined;
        }
        else {
            this.queue.enqueue(emission);
        }
    }

    /**
     * Initialize queue
     */
    public constructor() {
        this.queue = new Queue();
    }

    /**
     * Observe emissions
     */
    public async * stream(): AsyncGenerator<Emission> {
        while (true) {
            yield await this.continue();
        }
    }
}

export namespace Reactor {

    /**
     * Interface for reactors which may wish to relay emissions to other reactors
     */
    export interface Relay<Emission = unknown> {
        relay(emission: Emission): void;
    }
}