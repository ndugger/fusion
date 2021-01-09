import { Queue } from "./Queue";

/**
 * Observable implemented with async generators
 */
export class Reactor<Result = unknown> {

    /**
     * Promise resolver used to hold the stream in place while awaiting new emission
     */
    private cursor?: (result: Result) => void;

    /**
     * Queue to hold incoming results
     */
    private results: Queue<Result>;

    /**
     * Asynchronously process next result
     */
    private async continue(): Promise<Result> {

        /**
         * If queue is empty, save cursor while awaiting new emission
         */
        if (!this.results.size) {
            return new Promise(resolve => this.cursor = resolve);
        }

        return Promise.resolve(this.results.dequeue());
    }

    /**
     * Emit a result
     * @param result Result to process
     */
    protected async emit(result: Result): Promise<void> {

        /**
         * If stream awaiting next value, release marker
         */
        if (this.cursor) {
            this.cursor(result);
            this.cursor = undefined;
        }
        else {
            this.results.enqueue(result);
        }
    }

    /**
     * Initialize queue
     */
    public constructor() {
        this.results = new Queue();
    }

    /**
     * Observe incoming results
     */
    public async * stream(): AsyncGenerator<Result> {
        while (true) {
            yield await this.continue();
        }
    }
}