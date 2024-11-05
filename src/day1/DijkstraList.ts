export default function DijkstraList(
    source: number,
    sink: number,
    arr: WeightedAdjacencyList,
): number[] {
	const seen: boolean[] = new Array(arr.length).fill(false)
	const dist: number[] = new Array(arr.length).fill(Infinity)
	const prev: number[] = new Array(arr.length).fill(-1)

	dist[source] = 0

	while(hasUnvistied()) {
		const curr = getLowestUnvisited()

		seen[curr] = true;

		const adjs = arr[curr]
		for (let i = 0; i < adjs.length; i++) {
			const edge = adjs[i];
				if (seen[edge.to]) {
					continue;
				}
			
				const currDist = dist[curr] + edge.weight
				if (currDist < dist[edge.to]) {
					dist[edge.to] = currDist
					prev[edge.to] = curr
				}
		}
	}

	function hasUnvistied() {
		return seen.some((s, i) => !s && dist[i] < Infinity)
	}

	function getLowestUnvisited() {
		let idx = -1;
		let lowest = Infinity;
		
		for (let i = 0; i < seen.length; i++) {
			if (seen[i]) {
				continue;
			} 

			if (lowest > dist[i]) {
				lowest = dist[i]
				idx = i
			}
		}

		return idx;
	}

	const out: number[] = []
	let curr = sink;

	while (prev[curr] !== -1) {
		out.push(curr);
		curr = prev[curr]
	}

	out.push(source)

	return out.reverse()
}
