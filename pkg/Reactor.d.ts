/**
 * Observable implemented with async generators
 */
export declare class Reactor<Emission = unknown> {
    /**
     * Promise resolver used to hold the stream in place while awaiting new emission
     */
    private marker?;
    /**
     * Queue in which emissions are held
     */
    private queue;
    /**
     * Asynchronously process next emission
     */
    private continue;
    /**
     * Stream emission
     * @param emission Emission to stream
     */
    protected emit(emission: Emission): Promise<void>;
    /**
     * Initialize queue
     */
    constructor();
    /**
     * Observe emissions
     */
    stream(): AsyncGenerator<Emission>;
}
export declare namespace Reactor {
    /**
     * Interface for reactors which may wish to relay emissions to other reactors
     */
    interface Relay<Emission = unknown> {
        relay(emission: Emission): void;
    }
}
