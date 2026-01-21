// 邻接表
class WeightedDigraph {
    constructor(n) {
        this.graph = Array.from({ length: n }, () => []);
    }

    addEdge(from, to, weight) {
        this.graph[from].push({ to, weight });
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

// 邻接矩阵