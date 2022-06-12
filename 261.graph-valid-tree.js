/*
 * @lc app=leetcode id=261 lang=javascript
 *
 * [261] Graph Valid Tree
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
/* DFS */
var validTree = function (n, edges) {
  let flag = n == edges.length + 1 ? true : false;
  // flag判断是否满足节点和边数量的关系,如果不满足条件，直接返回False
  if (!flag) {
    return false;
  }
  let mark = new Array(n).fill(false);
  let grid = new Array(n).fill(0).map(() => []);

  // mark用来记录是否访问过，grid是邻接矩阵
  for (let [x, y] in edges) {
    grid[x].push(y);
    grid[y].push(x);
  }

  let dfs = (root) => {
    for (let node in grid[root]) {
      if (!mark[node]) {
        // 访问过的都在mark中进行标记
        mark[node] = true;
        dfs(node);
      }
    }
  };

  mark[0] = true;
  dfs(0);
  // 通过计算mark列表中的和是否等于它的长度来判断连通分量是否是1，如果连通分量为1，mark列表中所有元素都应为1
  return sum(mark) == len(mark);
};

/* BFS的方法 */
var validTree = function (n, edges) {
  let adjacencyList = new Array(n).fill(0).map(() => []);
  // 构建邻接表,adjacencyList[i]表示第i个节点, 值表示和它相接的节点
  for (let [u, v] of edges) {
    adjacencyList[u].push(v);
    adjacencyList[v].push(u);
  }

  // parent的规则，从key(edge[1])到value(edge[0])
  let parent = { 0: -1 };
  let stack = [0];

  while (stack.length !== 0) {
    let node = stack.shift();
    for (let neighbour of adjacencyList[node]) {
      if (parent[node] == neighbour) {
        continue;
      }

      // 因为parent上的key相当于子节点，只能对应一个父节点，如果已经有了，说明已经从value父节点访问过key子节点了
      if (parent.hasOwnProperty(neighbour)) {
        return false;
      }
      stack.push(neighbour);
      parent[neighbour] = node;
    }
  }
  return Object.keys(parent).length == n; // 不直接返回true，防止[[0,1],[2,3]]这种情况
};

/* BFS */
var validTree = function (n, edges) {
  //构建邻接矩阵
  let graph = new Array(n).fill(0).map(() => new Array(n).fill(0));
  //有边的元素设置为1，没有边的元素设置为0
  for (let [u, v] of edges) {
    graph[u][v] = 1;
    graph[v][u] = 1;
  }
  //进行BFS
  let queue = [];
  //从第一个节点开始搜索，这样就不会漏掉无边图的情况
  queue.push(0);
  let visited = new Array(n).fill(false);
  while (queue.length) {
    let cur = queue.shift();
    visited[cur] = true;
    //获取邻接点
    for (let i = 0; i < n; i++) {
      //查看当前节点的邻接点
      if (graph[cur][i] == 1) {
        //如果访问过，则返回false
        if (visited[i]) return false;

        //标记邻接点，入队列
        visited[i] = true;
        //涂黑访问过的节点
        graph[cur][i] = 0;
        graph[i][cur] = 0;
        queue.push(i);
      }
    }
  }

  //判断是否为单连通分量
  for (let i = 0; i < n; i++) {
    if (!visited[i]) return false;
  }
  return true;
};

// @lc code=end
