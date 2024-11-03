interface Node {
    value: string;
    children: (Node | null)[];
    isWord: boolean;
}

export default class Trie {
    // public length: number;
    private head: Node;

    constructor() {
        // this.length = 0;
        this.head = {
            value: "",
            children: this.newArray(),
            isWord: false,
        };
    }

    insert(item: string): void {
        this.newWord(item, this.head);
    }

    delete(item: string): void {
        let node = this.head;
        let prevIsWord: Node | undefined = undefined
        for (let i = 0; i < item.length; i++) {
            const letter = item.charAt(i);
            const pos = this.getPos(letter);
            const thisNode = node.children[pos];

            if (!thisNode) {
                return;
            }

            if (thisNode.isWord) {
                prevIsWord = thisNode
            }

            node = thisNode;
        }

        if (prevIsWord) {

        }
    }

    find(partial: string): string[] {}

    private newWord(item: string, node: Node) {
        if (item.length === 0) {
            return;
        }

        const letter = item.charAt(0);
        const pos = this.getPos(letter);
        item = item.slice(1);

        if (!node.children[pos]) {
            node.children[pos] = {
                value: letter,
                children: this.newArray(),
                isWord: false,
            };
        }

        if (item.length === 0) {
            node.children[pos] = {
                ...node.children[pos],
                isWord: true,
            };
        }

        this.newWord(item, node.children[pos]);
    }

    private newArray() {
        return Array(26).fill(null);
    }

    private getPos(char: string) {
        return char.charCodeAt(0) - "a".charCodeAt(0);
    }
}
