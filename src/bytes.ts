interface BytesI {
    compare: (a: Uint8Array, b: Uint8Array) => 0 | 1 | -1;
    equal: (a: Uint8Array, b: Uint8Array) => boolean;
}

export class Bytes {

    /** Bytes.compare takes two Uint8Arrays */
    static compare(a: Uint8Array, b: Uint8Array) {
        const minLength = Math.min(a.length, b.length);
        for (let i = 0; i < minLength; ++i) {
            if (a[i] < b[i]) return -1;
            if (a[i] > b[i]) return 1;
        }

        if (a.length < b.length) return -1;
        if (a.length > b.length) return 1;

        return 0;
    }

    /** Bytes.equal takes two Uint8Arrays and checks for equality */
    static equal(a: Uint8Array, b: Uint8Array) {
        return this.compare(a, b) === 0;
    }
}
