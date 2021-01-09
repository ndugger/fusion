/**
 * Interface for reactors which may wish to relay results to an internal destination
 */
export interface Relay<Packet extends Relay.Packet = Relay.Packet> {
    close(): void
    relay(packet: Packet): void;
}

export namespace Relay {

    export interface Packet<Data = unknown> {
        type: string;
        data?: Data;
    }
}
