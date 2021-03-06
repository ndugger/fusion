var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
import { Queue } from "./Queue";
/**
 * Observable implemented with async generators
 */
export class Reactor {
    /**
     * Initialize queue
     */
    constructor() {
        this.queue = new Queue();
    }
    /**
     * Asynchronously process next emission
     */
    continue() {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * If queue is empty, save marker while awaiting new emission
             */
            if (!this.queue.size) {
                return new Promise(resolve => this.marker = resolve);
            }
            return Promise.resolve(this.queue.dequeue());
        });
    }
    /**
     * Stream emission
     * @param emission Emission to stream
     */
    emit(emission) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    /**
     * Observe emissions
     */
    stream() {
        return __asyncGenerator(this, arguments, function* stream_1() {
            while (true) {
                yield yield __await(yield __await(this.continue()));
            }
        });
    }
}
//# sourceMappingURL=Reactor.js.map