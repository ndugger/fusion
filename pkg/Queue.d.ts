/**
 * Double stack queue implementation
 */
export declare class Queue<Entry = unknown> {
    private input;
    private output;
    /**
     * Current size of queue
     */
    get size(): number;
    /**
     * Insert default entries into queue
     * @param entries Default entries
     */
    constructor(...entries: Entry[]);
    /**
     * Add entry to queue
     * @param entry Entry to add to queue
     */
    enqueue(entry: Entry): void;
    /**
     * Continue queue to next entry
     */
    dequeue(): Entry | undefined;
}
