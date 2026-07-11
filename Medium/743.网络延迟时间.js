// Dijkstra
// 从某个节点 K 发出一个信号。需要多久才能使所有节点都收到信号
var networkDelayTime = function (times, n, k) {
	// 节点编号是从 1 开始的，所以要一个大小为 n + 1 的邻接表
	const graph = Array.from({ length: n + 1 }, () => []), res = 0;

	// 构造图
	for (const [from, to, weight] of times) {
		// from -> List<(to, weight)>
		// 邻接表存储图结构，同时存储权重信息
		graph[from].push([to, weight]);
	}

	function dijkstra(src) {
		// distTo[i] = 从起点（在这里是 K）到节点 i 的最小距离；Infinity 表示未知 // 最小堆，元素为 [its dist from start, node]
		const distTo = new Array(graph.length).fill(Infinity), pq = new PriorityQueue((a, b) => a[0] - b[0]);
		// 起点 src，距离为 0 （理所当然distTo[K] = 0）
		pq.enqueue([0, src]), distTo[src] = 0;

		while (!pq.isEmpty()) {
			const [curDistFromStart, curNode] = pq.dequeue();
			// 如果已有更优路径，则跳过
			// 不能 <= ，因为这个 curNode 才刚被看，我们希望看它后面的 node，< 的情况明确可以不看，但 = 要看，因为可能是从别的路径来的，可能会有更优的路径
			if (distTo[curNode] < curDistFromStart) continue;
			// 遍历当前节点的邻居
			for (const [nextNode, weight] of graph[curNode]) {
				const nextDist = curDistFromStart + weight;
				// 如果已经有更优路径，则跳过，= 的情况也不看	
				if (distTo[nextNode] <= nextDist) {
					continue;
				}
				pq.enqueue([nextDist, nextNode]);
				distTo[nextNode] = nextDist;
			}
		}
		return distTo;
	}

	const distTo = dijkstra(k);

	// 找到最长的那条
	for (let i = 1; i <= n; i++) {
		if (distTo[i] === Infinity) {
			// 有节点不可达
			return -1;
		}
		res = Math.max(res, distTo[i]);
	}
	return res;
};

// 快的方法
var networkDelayTime2 = function (times, n, k) {
	// g = g[i][j] 表示节点 i 到 节点 j 这条边的 边权, dis = 从节点k 到任意节点的 最短距离, done = 访问过的节点集合
	let g = Array.from({ length: n }, () => Array(n).fill(Infinity)), dis = Array(n).fill(Infinity), done = Array(n).fill(false)
	console.log(g);

	for (const [x, y, d] of times) {
		g[x - 1][y - 1] = d
	}

	console.log(g);
	// 初始节点k自身到自身节点的距离
	dis[k - 1] = 0
	while (true) {
		// x 表示 没有被访问过的节点中，距离最小的节点
		let x = -1;
		// 遍历所有节点，找到距离最小的节点
		for (let i = 0; i < n; i++) {
			// 如果节点 i 没有被访问过，并且距离小于当前最小距离，则更新 x
			if (!done[i] && (x < 0 || dis[i] < dis[x])) {
				x = i
			}
		}

		// 如果 x < 0，所有点都 done=true（都选完了）。这时最短路都定完，可以计算答案说明没有找到没有被访问过的节点，或者所有没有被访问过的节点距离都是 Infinity，说明剩余的节点不可达，直接返回结果
		if (x < 0) {
			return Math.max(...dis)
		}

		// 如果 x 的距离是 Infinity，说明剩余的节点不可达，直接返回结果
		if (dis[x] === Infinity) {
			return -1
		}

		// 标记节点 x 已经被访问过
		done[x] = true
		// 更新节点 x 的邻居节点的距离
		for (let y = 0; y < n; y++) {
			// 如果节点 y 没有被访问过，并且节点 x 到节点 y 的距离不为 Infinity，则更新节点 y 的距离
			dis[y] = Math.min(dis[y], dis[x] + g[x][y])
		}
		console.log("x = " + x)
		console.log(dis);
	}
};

networkDelayTime2([[2, 1, 1], [2, 3, 1], [3, 4, 1]], 4, 2)
