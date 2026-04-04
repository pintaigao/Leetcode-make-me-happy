// 图结构的 BFS 遍历，从节点 s 开始进行 BFS
var bfs = function (graph, s) {
  var visited = new Array(graph.size()).fill(false), q = [];
  q.push(s);
  visited[s] = true;

  while (q.length !== 0) {
    var cur = q.shift();
    var neighbors = graph.neighbors(cur);
    for (var i = 0; i < neighbors.length; i++) {
      var e = neighbors[i];
      if (visited[e.to]) {
        continue;
      }
      q.push(e.to);
      visited[e.to] = true;
    }
  }
}

// 从 s 开始 BFS 遍历图的所有节点，且记录遍历的步数（一层一层遍历）
var bfs2 = function (graph, s) {
  var visited = new Array(graph.size()).fill(false), q = [];
  q.push(s);
  visited[s] = true;
  // 记录从 s 开始走到当前节点的步数
  var step = 0;

  while (q.length !== 0) {
    var sz = q.length;
    // 为什么要用 sz 来控制 for 循环？ --- 因为每一轮 for 循环都表示从 s 开始走了 step 步，sz 是当前层的节点数量
    // 这一轮 for 完了，step 就加 1
    for (var i = 0; i < sz; i++) {
      var cur = q.shift();
      // 访问当前节点
      var neighbors = graph.neighbors(cur);
      for (var i = 0; i < neighbors.length; i++) {
        var e = neighbors[i];
        if (visited[e.to]) {
          continue;
        }
        q.push(e.to);
        visited[e.to] = true;
      }
    }
    step++;
  }
}

// 图结构的 BFS 遍历，从节点 s 开始进行 BFS，且记录遍历步数（从起点 s 到当前节点的边的条数）
// 每个节点自行维护 State 类，记录从 s 走来的遍历步数
class State {
  constructor(node, step) {
    // 当前节点 ID
    this.node = node;
    // 从起点 s 到当前节点的遍历步数
    this.step = step;
  }
}

var bfs3 = function (graph, s) {
  var visited = new Array(graph.size()).fill(false), q = [new State(s, 0)];
  visited[s] = true;
  while (q.length !== 0) {
    var state = q.shift();
    var cur = state.node, step = state.step;
    console.log("visit " + cur + " with step " + step);
    var neighbors = graph.neighbors(cur);
    for (var i = 0; i < neighbors.length; i++) {
      var e = neighbors[i];
      if (visited[e.to]) {
        continue;
      }
      q.push(new State(e.to, step + 1));
      visited[e.to] = true;
    }
  }
}