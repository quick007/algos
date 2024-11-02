export default class MinHeap {
    public length: number;
    private data: number[];

    constructor() {
        this.data = [];
        this.length = 0;
    }

    insert(value: number): void {
        this.data[this.length] = value;
        this.heapifyUp(this.length);
        this.length++;
    }

    delete(): number {
        if (this.length === 0) {
            return -1;
        }

        const o = this.data[0];
        if (this.length === 1) {
            this.length = 0;
            this.data = [];
            return o;
        }

        this.length--;
        this.data[0] = this.data[this.length];
        this.heapifyDown(0);
        return o;
    }

    private parent(i: number): number {
        return Math.floor((i - 1) / 2);
    }

    private leftChild(i: number): number {
        return i * 2 + 1;
    }

    private rightChild(i: number): number {
        return i * 2 + 2;
    }

    private heapifyDown(i: number) {
        const lIndex = this.leftChild(i);
        const rIndex = this.rightChild(i);

        if (i >= this.length || lIndex >= this.length) {
            return;
        }

        const left = this.data[lIndex];
        const right = this.data[rIndex];
        const value = this.data[i];

        if (left > right && value > right) {
            this.data[i] = right;
            this.data[rIndex] = value;
            this.heapifyDown(rIndex);
        } else if (right > left && value > left) {
            this.data[i] = left;
            this.data[lIndex] = value;
            this.heapifyDown(lIndex);
        }
    }

    private heapifyUp(i: number) {
        if (i === 0) {
            return;
        }

        const parent = this.parent(i);
        const parentValue = this.data[parent];
        const value = this.data[i];

        if (parentValue > value) {
            this.data[i] = parentValue;
            this.data[parent] = value;
            this.heapifyUp(parent);
        }
    }
}
