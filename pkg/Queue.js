/**
 * Double stack queue implementation
 */
export class Queue {
    /**
     * Insert default entries into queue
     * @param entries Default entries
     */
    constructor(...entries) {
        this.input = [];
        this.output = [];
        for (const entry of entries) {
            this.enqueue(entry);
        }
    }
    /**
     * Current size of queue
     */
    get size() {
        return this.output.length + this.input.length;
    }
    /**
     * Add entry to queue
     * @param entry Entry to add to queue
     */
    enqueue(entry) {
        this.input.push(entry);
    }
    /**
     * Continue queue to next entry
     */
    dequeue() {
        if (!this.output.length) {
            while (this.input.length) {
                this.output.push(this.input.pop());
            }
        }
        if (!this.output.length) {
            return;
        }
        return this.output.pop();
    }
}
//# sourceMappingURL=Queue.js.map