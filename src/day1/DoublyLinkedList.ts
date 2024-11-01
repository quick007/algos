type Node<T> = {
    value: T;
    prev?: Node<T>;
    next?: Node<T>;
};

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;

    constructor() {
        this.length = 0;
    }

    prepend(item: T): void {
        this.head = {
            value: item,
            next: this.head,
        };

        if (this.head.next) {
            this.head.next.prev = this.head;
        }
        this.length++;
    }

    insertAt(item: T, idx: number): void {
        if (!this.head && idx === 0) {
            this.head = {
                value: item,
            };
        }

        let temp = this.head;
        for (let i = 0; i < idx; i++) {
            temp = temp?.next;
        }

        if (!temp) {
            return;
        }

        temp.next = {
            value: item,
            prev: temp,
            next: temp.next,
        };

        if (temp.next.next) {
            temp.next.next.prev = temp.next;
        }
        this.length++;
    }

    append(item: T): void {
        this.length++;

        if (!this.head) {
            this.head = { value: item };
            return;
        }

        let temp = this.head;

        while (temp.next) {
            temp = temp.next;
        }

        temp.next = {
            value: item,
            prev: temp,
        };
    }

    remove(item: T): T | undefined {
        let temp = this.head;

        while (temp?.value) {
            if (temp.value === item) {
                this.length = Math.max(0, --this.length);

                if (temp.prev) {
                    temp.prev.next = temp.next;
                } else {
                    this.head = temp.next;
                }
                if (temp.next) {
                    temp.next.prev = temp.prev;
                }

                return temp.value;
            }
            temp = temp.next;
        }
        return undefined;
    }

    get(idx: number): T | undefined {
        let temp = this.head;
        for (let i = 0; i < idx; i++) {
            temp = temp?.next;
        }

        return temp?.value;
    }

    removeAt(idx: number): T | undefined {
        this.length = Math.max(0, --this.length);
        let temp = this.head;

        for (let i = 0; i < idx; i++) {
            temp = temp?.next;
        }

        if (temp) {
            if (temp.prev) {
                temp.prev.next = temp.next;
            } else {
                this.head = temp.next;
            }
            if (temp.next) {
                temp.next.prev = temp.prev;
            }
            return temp.value;
        }

        return undefined;
    }
}
