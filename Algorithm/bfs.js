// 第一种写法是不记录遍历步数的。
// BFS 1: 多叉树的层序遍历写法是这样
var levelOrderTraverse = function (root) {
  if (root === null) {
    return;
  }
  var q = [];
  q.push(root);
  while (q.length !== 0) {
    var cur = q.shift();
    // 访问 cur 节点
    console.log(cur.val);

    // 把 cur 的所有子节点加入队列
    for (var child of cur.children) {
      q.push(child);
    }
  }
}

// BFS 2: 图结构的 BFS 遍历是类似的
// 图结构的 BFS 遍历，从节点 s 开始进行 BFS
var bfs = function (graph, s) {
  var visited = new Array(graph.size()).fill(false);
  var q = [];
  q.push(s);
  visited[s] = true;

  while (q.length !== 0) {
    var cur = q.shift();
    console.log("visit " + cur);
    var neighbors = graph.neighbors(cur);
    for (var i = 0; i < neighbors.length; i++) {
      var e = neighbors[i];
      if (visited[e.to]) { // [!code highlight:5]
        continue;
      }
      q.push(e.to);
      visited[e.to] = true;
    }
  }
}

// 第二种能够记录遍历步数的写法。
var levelOrderTraverse = function (root) {
  if (root === null) {
    return;
  }
  var q = [];
  q.push(root);
  // 记录当前遍历到的层数（根节点视为第 1 层）
  var depth = 1;

  while (q.length !== 0) {
    var sz = q.length;
    for (var i = 0; i < sz; i++) {
      var cur = q.shift();
      // 访问 cur 节点，同时知道它所在的层数
      console.log("depth = " + depth + ", val = " + cur.val);

      for (var j = 0; j < cur.children.length; j++) {
        q.push(cur.children[j]);
      }
    }
    depth++;
  }
}

// 从 s 开始 BFS 遍历图的所有节点，且记录遍历的步数
var bfs = function (graph, s) {
  var visited = new Array(graph.size()).fill(false); // [!code highlight]
  var q = [];
  q.push(s);
  visited[s] = true; // [!code highlight]
  // 记录从 s 开始走到当前节点的步数
  var step = 0;

  while (q.length !== 0) {
    var sz = q.length;
    for (var i = 0; i < sz; i++) {
      var cur = q.shift();
      // 访问当前节点
      console.log("visit " + cur + " at step " + step);
      var neighbors = graph.neighbors(cur);
      for (var i = 0; i < neighbors.length; i++) {
        var e = neighbors[i];
        if (visited[e.to]) { // [!code highlight:5]
          continue;
        }
        q.push(e.to);
        visited[e.to] = true;
      }
    }
    step++;
  }
}

//写法三 第三种能够适配不同权重边的写法。
// 多叉树的层序遍历
// 每个节点自行维护 State 类，记录深度等信息
function State(node, depth) {
  this.node = node;
  this.depth = depth;
}

var levelOrderTraverse = function (root) {
  if (root === null) {
    return;
  }
  var q = [];
  // 记录当前遍历到的层数（根节点视为第 1 层）
  q.push(new State(root, 1));

  while (q.length !== 0) {
    var state = q.shift();
    var cur = state.node;
    var depth = state.depth;
    // 访问 cur 节点，同时知道它所在的层数
    console.log("depth = " + depth + ", val = " + cur.val);

    for (var i = 0; i < cur.children.length; i++) {
      q.push(new State(cur.children[i], depth + 1));
    }
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

var bfs = function (graph, s) {
  var visited = new Array(graph.size()).fill(false);
  var q = [new State(s, 0)];
  visited[s] = true;
  while (q.length !== 0) {
    var state = q.shift();
    var cur = state.node;
    var step = state.step;
    console.log("visit " + cur + " with step " + step);
    var neighbors = graph.neighbors(cur);
    for (var i = 0; i < neighbors.length; i++) {
      var e = neighbors[i];
      if (visited[e.to]) { // [!code highlight:5]
        continue;
      }
      q.push(new State(e.to, step + 1));
      visited[e.to] = true;
    }
  }
}