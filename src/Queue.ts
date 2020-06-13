/**
 * Double stack queue implementation
 */
export class Queue<Entry = unknown> {

    private input: Entry[] = [];
    private output: Entry[] = [];

    /**
     * Current size of queue
     */
    public get size(): number {
        return this.output.length + this.input.length;
    }

    /**
     * Insert default entries into queue
     * @param entries Default entries
     */
    public constructor(...entries: Entry[]) {
        for (const entry of entries) {
            this.enqueue(entry);
        }
    }

    /**
     * Add entry to queue
     * @param entry Entry to add to queue
     */
    public enqueue(entry: Entry): void {
        this.input.push(entry);
    }

    /**
     * Continue queue to next entry
     */
    public dequeue(): Entry | undefined {

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