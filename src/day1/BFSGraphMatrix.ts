import Queue from "./Queue";

export default function bfs(graph: WeightedAdjacencyMatrix, source: number, needle: number): number[] | null {
	const q = new Queue<number>();
	const seen: boolean[] = new Array(graph.length).fill(false);
	const prev: number[] = new Array(graph.length).fill(-1)

	q.enqueue(source);
	seen[source] = true;
	
	while (q.length) {
		const curr = q.deque()

		if (curr === needle) {
			break;
		}

		if (curr === undefined) {
			break;
		}

		const connected = graph[curr];

		for (let i = 0; i < connected.length; i++) {
			const v = connected[i]
			if (seen[i] || v === 0) { // no connection or has been seen before
				continue;
			}
			seen[i] = true
			prev[i] = curr
			q.enqueue(i)
		}
	}

	if (prev[needle] === -1) {
		return null
	}

	const path: number[] = []
	let v = needle

	while (v !== -1) {
		path.push(v)
		v = prev[v]
	}

	// for (let i = 0; i < Math.floor(path.length / 2); i++) {
	// 	const temp = path[i]
	// 	path[i] = path[path.length - i];
	// 	path[path.length - i] = temp;
	// }

	return path.reverse()
}