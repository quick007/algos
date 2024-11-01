import Queue from "./Queue";

export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    const queue = new Queue<BinaryNode<number>>();

    queue.enqueue(head);

    while (queue.length) {
        const v = queue.deque();

        if (v!.value === needle) {
            return true;
        }

        if (v?.left) {
            queue.enqueue(v.left);
        }

        if (v?.right) {
            queue.enqueue(v.right);
        }
    }

    return false;
}
