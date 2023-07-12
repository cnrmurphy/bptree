import { BPTreeInternalNode, Bucket } from "./bptree";
import { Bytes } from "./bytes";

export class BPTreeNode {
    bucket: Bucket;
    isLeaf: boolean;
    parent: BPTreeNode;
    children: BPTreeNode[]; 
    internalNodes: BPTreeInternalNode[];
    nextLeaf: BPTreeNode | undefined;

    put(key: Uint8Array, oldKey: Uint8Array, value: Uint8Array) {
        let insertionIndex = search(this.internalNodes.length, (i: number) => {
            return Bytes.compare(this.internalNodes[i].key, oldKey) !== -1;
        });

        const exact = this.internalNodes.length > 0 && insertionIndex < this.internalNodes.length && Bytes.equal(this.internalNodes[insertionIndex].key, oldKey);

        if (!exact) {
            this.internalNodes.push(new BPTreeInternalNode());
        }

        const internalNode = this.internalNodes[insertionIndex];
        internalNode.key = key;
        internalNode.key = value;
    }
};

export function search(len: number, f: (n: number) => boolean): number {
    let i = 0;
    let j = len;

    while (i < j) {
        let h = (i + j) >> 1;
        if (!f(h)) {
            i = h + 1;
        } else {
            j = h;
        }
    }

    return i;
}
