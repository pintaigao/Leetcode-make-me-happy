// 无向加权图的通用实现, 等同于双向有向加权图
class WeightedUndigraph {
	constructor(n) {
		this.graph = new WeightedDigraph(n);
	}

	// 增，添加一条带权重的无向边
	addEdge(from, to) {
		this.graph.addEdge(from, to, 1);
		this.graph.addEdge(to, from, 1);
	}

	// 删，删除一条无向边
	removeEdge(from, to) {
		this.graph.removeEdge(from, to);
		this.graph.removeEdge(to, from);
	}

	// 查，判断两个节点是否相邻
	hasEdge(from, to) {
		return this.graph.hasEdge(from, to);
	}

	// 查，返回一条边的权重
	weight(from, to) {
		return this.graph.weight(from, to);
	}

	// 查，返回某个节点的所有邻居节点
	neighbors(v) {
		return this.graph.neighbors(v);
	}
}

var graph = new WeightedUndigraph(3);
graph.addEdge(0, 1);
graph.addEdge(2, 0);
graph.addEdge(2, 1);

console.log(graph.hasEdge(0, 1)); // true
console.log(graph.hasEdge(1, 0)); // true

graph.neighbors(2).forEach(function (edge) {
	console.log(2 + " <-> " + edge.to + ", wight: " + edge.weight);
});
// 2 <-> 0, wight: 3
// 2 <-> 1, wight: 4

graph.removeEdge(0, 1);
console.log(graph.hasEdge(0, 1)); // false
console.log(graph.hasEdge(1, 0)); // false