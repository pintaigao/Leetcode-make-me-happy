// 无权有向图, weight默认为1
class WeightedDigraph {
	constructor(n) {
		this.graph = Array.from({ length: n }, () => []);
	}

	addEdge(from, to) {
		this.graph[from].push({ to, weight: 1 });
	}

	removeEdge(from, to) {
		this.graph[from] = this.graph[from].filter(edge => edge.to !== to);
	}

	hasEdge(from, to) {
		return this.graph[from].some(edge => edge.to === to);
	}

	weight(from, to) {
		for (const e of this.graph[from]) {
			if (e.to === to) {
				return e.weight;
			}
		}
		return null;
	}

	neighbors(v) {
		return this.graph[v]
	}
}

// 测试代码
var graph = new WeightedDigraph(3);
graph.addEdge(0, 1, 1);
graph.addEdge(1, 2, 2);
graph.addEdge(2, 0, 3);
graph.addEdge(2, 1, 4);

console.log(graph.hasEdge(0, 1)); // true
console.log(graph.hasEdge(1, 0)); // false

graph.neighbors(2).forEach(function (edge) {
	console.log(2 + " -> " + edge.to + ", weight: " + edge.weight);
});
// 2 -> 0, weight: 3
// 2 -> 1, weight: 4

graph.removeEdge(0, 1);
console.log(graph.hasEdge(0, 1)); // false

// 邻接矩阵