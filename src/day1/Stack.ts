type Node<T> = {
    value: T;
    prev?: Node<T>;
};

export default class Stack<T> {
    public length: number;
    private stack?: Node<T>;

    constructor() {
        this.length = 0;
    }

    push(item: T): void {
        this.stack = {
            value: item,
            prev: this.stack,
        };
        this.length++;
    }

    pop(): T | undefined {
        const temp = this.stack;

        if (!temp) {
            return undefined;
        }

        this.stack = temp.prev;
        this.length--;
        return temp.value;
    }

    peek(): T | undefined {
        return this.stack?.value;
    }
}
