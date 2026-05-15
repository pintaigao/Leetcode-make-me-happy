var calcEquation = function (equations, values, queries) {
  class Edge {
    constructor(node, weight) {
      this.node = node;
      this.weight = weight;
    }
  }
  // 把 equations 抽象成一幅图，邻接表存储
  let graph = {}, res = new Array(queries.length);
  for (let i = 0; i < equations.length; i++) {
    let a = equations[i][0], b = equations[i][1], w = values[i];
    // 构建双向图
    graph[a] = (graph[a] || []).concat(new Edge(b, w))
    graph[b] = (graph[b] || []).concat(new Edge(a, 1.0 / w))
  }

  function bfs(start, end) {
    if (!graph.hasOwnProperty(start) || !graph.hasOwnProperty(end)) { return -1.0; }
    if (start === end) { return 1.0; }
    // BFS 标准框架
    // key 为节点 ID（变量名），value 记录从 start 到该节点的路径乘积
    let queue = [start], visited = new Set(), weight = { [start]: 1.0 };
    // 不能visited = new Set(start)，因为 start=“aa“的话，new Set(start)结果是“a“
    visited.add(start)
    while (queue.length) {
      let cur = queue.shift();
      for (let neighbor of graph[cur]) {
        if (!visited.has(neighbor.node)) {
          // 更新路径乘积
          weight[neighbor.node] = weight[cur] * neighbor.weight;
          if (neighbor.node === end) return weight[end];
          // 记录 visited
          visited.add(neighbor.node);
          // 新节点加入队列继续遍历
          queue.push(neighbor.node);
        }
      }
    }

    return -1.0;
  }

  // Loop Query // BFS 遍历图，计算 start 到 end 的路径乘积
  for (let i = 0; i < queries.length; i++) res[i] = bfs(queries[i][0], queries[i][1]);

  return res;
};

// calcEquation([["a", "b"], ["b", "c"]], [2.0, 3.0], [["a", "c"], ["b", "a"], ["a", "e"], ["a", "a"], ["x", "x"]])
// calcEquation([["a", "b"], ["c", "d"]], [1.0, 1.0], [["a", "c"], ["b", "d"], ["b", "a"], ["d", "c"]])
calcEquation([["a", "aa"]], [9.0], [["aa", "a"], ["aa", "aa"]])
