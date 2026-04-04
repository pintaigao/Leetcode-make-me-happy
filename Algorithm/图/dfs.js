// 图节点
class Vertex {
  constructor(id) {
    this.id = id;
    this.neighbors = [];
  }
}

// 图的遍历框架
// 遍历所有节点（visited 数组）
// 需要一个 visited 数组记录被遍历过的节点
// 避免走回头路陷入死循环
var traverse = function (graph, s, visited) {
  // base case
  if (s < 0 || s >= graph.size()) {
    return;
  }
  if (visited[s]) {
    // 防止死循环
    return;
  }
  // 前序位置
  // visited 数组，用来记录被遍历过的节点，避免遇到环时陷入死循环
  visited[s] = true;
  console.log("visit " + s);
  for (var e of graph.neighbors(s)) {
    traverse(graph, e.to, visited);
  }
  // 后序位置
};
// 遍历图的边
// 从起点 s 开始遍历图的所有边
// 需要一个二维 visited 数组记录被遍历过的边，visited[u][v] 表示边 u->v 已经被遍历过
var traverseEdges = function (graph, s, visited) {
  // base case
  if (s < 0 || s >= graph.size()) {
    return;
  }
  var neighbors = graph.neighbors(s);
  for (var i = 0; i < neighbors.length; i++) {
    var e = neighbors[i];
    // 如果边已经被遍历过，则跳过
    if (visited[s][e.to]) {
      continue;
    }
    // 标记并访问边
    visited[s][e.to] = true;
    console.log("visit edge: " + s + " -> " + e.to);
    traverseEdges(graph, e.to, visited);
  }
};

//遍历所有路径（onPath 数组）
// 下面的算法代码可以遍历图的所有路径，寻找从 src 到 dest 的所有路径

// onPath 和 path 记录当前递归路径上的节点
var onPath = new Array(graph.size()).fill(false);
var path = [];
var traverseOnPath = function (graph, src, dest) {
  // base case
  if (src < 0 || src >= graph.size()) {
    return;
  }
  if (onPath[src]) {
    // 防止死循环（成环）
    return;
  }
  if (src === dest) {
    // 找到目标节点
    console.log("find path: " + path.join("->") + "->" + dest);
    return;
  }

  // 前序位置
  onPath[src] = true;
  path.push(src);
  for (var e of graph.neighbors(src)) {
    traverseOnPath(graph, e.to, dest);
  }
  // 后序位置
  path.pop();
  onPath[src] = false;
};