import { BPTreeNode } from "./bpTreeNode";

const MAX_KEY_SIZE = 32768;

type pgid = number;

export class BPTree {
    path: string;
    data: Buffer;
    root: BPTreeNode;
    /** The maximum number of children an internal node can store */
    order: number;

    constructor(order = 128) {
        this.order = order;
    }
};

export class BPTreeInternalNode {
    key: Uint8Array;
    value: Uint8Array;
}

/** Bucket represents a collection of key/value pairs */
export class Bucket {
    root: pgid;
    rootNode: BPTreeNode;
    nodes: Map<pgid, BPTreeInternalNode>;
    buckets: Map<string, Bucket>;
    data: Uint8Array;
    page: Page;

    constructor(key: Uint8Array) {
        if (key.length > MAX_KEY_SIZE) throw new Error('Bucket key is greather than the max key size ' + MAX_KEY_SIZE);
        const clonedKey = new Uint8Array(key.length);
        clonedKey.set(key);
    }

    cursor() {
        return new Cursor(this, []);
    }

    /** pageNode returns the in-memory node, if it exists. Otherwise it returns the underlying page */
    pageNode(id: pgid) {
        if (this.root === 0) {
            if (id !== 0) throw new Error(`inline bucket non-zero page access(2): ${id} != 0`);
            if (this.rootNode) return [, this.rootNode];
            return [this.page,];
        }

        if (this.nodes) {
            if (this.nodes[id]) return [,this.nodes[id]];
        }
    }
}

export class Page {
}

/** ElementRef represents a reference to an element on a given page/node */
interface ElementRef {
    page: Page;
    node: BPTreeNode;
    index: number;
}

function elementRef(page: Page, node:  BPTreeNode, index: number): ElementRef {
    return { page, node, index }
}

export class Cursor {
    #bucket: Bucket;
    #stack: [];

    constructor(b: Bucket, s: []) {
        this.#bucket = b;
        this.#stack = s;
    }

    bucket() {
        return this.#bucket;
    }

    stack() {
        return this.#stack;
    }

    #seek(seek: Uint8Array) {
        this.#stack = this.#stack.slice(0,0) as [];
        this.#search(seek, this.#bucket.root);
    }

    /** search recursively performs a binary search against a given page/node until it finds a given key. */
    #search(seek: Uint8Array, pgid: pgid) {
        const [page, node] = this.#bucket.pageNode(pgid);
        const eleRef = elementRef(page, node);
    }
}

