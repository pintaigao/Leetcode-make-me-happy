// 加权有向图的通用实现（邻接矩阵）
class WeightedDigraph {
	// 存储相邻节点及边的权重
	constructor(n) {
		// 邻接矩阵，matrix[from][to] 存储从节点 from 到节点 to 的边的权重
		// 0 表示没有连接
		this.matrix = Array.from({ length: n }, () => Array(n).fill(0));
	}

	// 增，添加一条带权重的有向边，复杂度 O(1)
	addEdge(from, to, weight) {
		this.matrix[from][to] = weight;
	}

	// 删，删除一条有向边，复杂度 O(1)
	removeEdge(from, to) {
		this.matrix[from][to] = 0;
	}

	// 查，判断两个节点是否相邻，复杂度 O(1)
	hasEdge(from, to) {
		return this.matrix[from][to] !== 0;
	}

	// 查，返回一条边的权重，复杂度 O(1)
	weight(from, to) {
		return this.matrix[from][to];
	}

	// 查，返回某个节点的所有邻居节点，复杂度 O(V)
	neighbors(v) {
		const res = [];
		for (let i = 0; i < this.matrix[v].length; i++) {
			if (this.matrix[v][i] !== 0) {
				res.push({ to: i, weight: this.matrix[v][i] });
			}
		}
		return res;
	}
}

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