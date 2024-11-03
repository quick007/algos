interface Node {
    value: string;
    children: (Node | null)[];
    isWord: boolean; // I really should have done this with numbers, but oh well
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
        let prevIsWord: {node: Node, next: string | undefined} | undefined = undefined
        for (let i = 0; i < item.length; i++) {
            const letter = item.charAt(i);
            const pos = this.getPos(letter);
            const thisNode = node.children[pos];

            if (!thisNode) {
                return;
            }

            if (thisNode.isWord) {
                const letter2 = item.charAt(i + 1);
                const pos2 = this.getPos(letter);
                prevIsWord = {
                    node: thisNode,
                    next: thisNode.children[pos2]?.value
                }
            }

            node = thisNode;
        }

        if (prevIsWord && prevIsWord.next) {
            prevIsWord.node.children[this.getPos(prevIsWord.next)] = null;
        }
    }

    find(partial: string): string[] {
        const words: string[] = []

        let node: Node = this.head
        for (let i = 0; i < partial.length; i++) {
            const pos = this.getPos(partial[i])

            if (node.children[pos] === null) {
                return words
            }

            node = node.children[pos]!
        }

        this.findWords(node, partial, words)

        return words
    }

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
                ...node.children[pos]!,
                isWord: true,
            };
        }

        this.newWord(item, node.children[pos]!);
    }

    private findWords(node: Node, prefix: string, words: string[]) {
        if (node.isWord) {
            words.push(prefix)
        }

        for (let i = 0; i < node.children.length - 1; i++) {
            if (node.children[i] !== null) {
                const char = String.fromCharCode(i + 'a'.charCodeAt(0))
                this.findWords(node.children[i]!, prefix + char, words)
            }
        }
    }

    private newArray() {
        return Array(26).fill(null);
    }

    private getPos(char: string) {
        return char.charCodeAt(0) - "a".charCodeAt(0);
    }
}
