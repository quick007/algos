function walk(graph: WeightedAdjacencyList, node: number, needle: number, path: number[], seen: boolean[]): boolean {
	if (seen[node]) {
		return false;
	}

	if (node === needle) {
		path.push(node)
		return true;
	}

	//pre
	seen[node] = true
	path.push(node)

	//recurse
	const connections = graph[node]
	for (let i = 0; i < connections.length; i++) {
		const c = connections[i]
		if (
			walk(
				graph, 
				c.to,
				needle,
				path,
				seen
			)
		) {
			return true
		}
	}

	//post
	path.pop()
	return false

}

export default function dfs(graph: WeightedAdjacencyList, source: number, needle: number): number[] | null {
	const seen: boolean[] = new Array(graph.length).fill(false);
	const path: number[] = [];

	walk(graph, source, needle, path, seen)

	if (path.length) {
		return path
	}
	return null
}