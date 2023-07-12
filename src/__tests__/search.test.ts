import { search } from "../bpTreeNode";

describe('search', () => {
    const arr = [0,2,4,6,8,10];

    it('should find the index at which 4 exists', () => {
        const index = search(arr.length, function (i: number) {
            return arr[i] >= 2;
        });

        expect(index).toEqual(1);
    });
    
    it('should find the index at which 5 would exist', () => {
        const index = search(arr.length, function (i: number) {
            return arr[i] >= 5;
        });

        expect(index).toEqual(3);
    });

    it('should find the index at which -1 would exist', () => {
        const index = search(arr.length, function (i: number) {
            return arr[i] >= -1;
        });

        expect(index).toEqual(0);
    });
});

