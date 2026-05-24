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
  let flag = n == edges.length + 1 ? true : false, mark = new Array(n).fill(false), grid = new Array(n).fill(0).map(() => []);
  // flag判断是否满足节点和边数量的关系,如果不满足条件，直接返回False
  if (!flag) {
    return false;
  }

  // mark用来记录是否访问过，grid是邻接矩阵
  for (let [x, y] of edges) {
    grid[x].push(y);
    grid[y].push(x);
  }

  let dfs = (root) => {
    for (let node of grid[root]) {
      if (!mark[node]) {
        // 访问过的都在mark中进行标记
        mark[node] = true;
        dfs(node);
      }
    }
  };

  dfs(0);
  mark[0] = true;
  // 通过计算mark列表中的和是否等于它的长度来判断连通分量是否是1，如果连通分量为1，mark列表中所有元素都应为1
  return sum(mark) == len(mark);
};

/* BFS 带 Visited 二维数组的方法 */
var validTree2 = function (n, edges) {
  //构建邻接矩阵//进行BFS,从第一个节点开始搜索，这样就不会漏掉无边图的情况
  let graph = new Array(n).fill(0).map(() => new Array(n).fill(0)), queue = [0], visited = new Array(n).fill(false);
  //有边的元素设置为1，没有边的元素设置为0
  for (let [u, v] of edges) {
    graph[u][v] = 1;
    graph[v][u] = 1;
  }

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

/* BFS 带 Visited 双向图的方法 */
var validTree3 = function (n, edges) {
  if (n !== edges.length + 1) return false;
  //从第一个节点开始搜索，这样就不会漏掉无边图的情况
  let adjacencyList = new Array(n).fill(0).map(() => []), queue = [0], visited = new Set([0]), count = 0
  // 构建邻接表,adjacencyList[i]表示第i个节点, 值表示和它相接的节点
  for (let [u, v] of edges) {
    adjacencyList[u].push(v);
    adjacencyList[v].push(u);
  }

  while (queue.length) {
    let cur = queue.shift();
    //获取邻接点
    for (let node of adjacencyList[cur]) {
      if (!visited.has(node)) {
        visited.add(node);
        queue.push(node);
        count += 1;
      }
    }
  }

  // return visited.size == n; // 通过计算visited集合的大小是否等于n来判断连通分量是否是1，如果连通分量为1，visited集合中所有元素都应为n
  return count == n - 1; // 防止[[0,1],[2,3]]这种情况, 边数应该等于节点数-1
};

/* BFS 带 Visited 双向图的方法2 */
var validTree3 = function (n, edges) {
  // if (n !== edges.length + 1) return false;
  //从第一个节点开始搜索，这样就不会漏掉无边图的情况
  let adjacencyList = new Array(n).fill(0).map(() => []), queue = [0], visited = new Set([0]), count = 0;
  // 构建邻接表,adjacencyList[i]表示第i个节点, 值表示和它相接的节点
  for (let [u, v] of edges) {
    adjacencyList[u].push(v);
    adjacencyList[v].push(u);
  }

  while (queue.length) {
    let cur = queue.shift();
    //获取邻接点
    for (let node of adjacencyList[cur]) {

      if (visited.has(node)) {
        return false;
      }
      // 去除双向连接
      adjacencyList[node] = adjacencyList[node].filter((x) => x !== cur);
      adjacencyList[cur] = adjacencyList[cur].filter((x) => x !== node);

      if (!visited.has(node)) {
        visited.add(node);
        queue.push(node);
        count += 1;
      }
    }
  }

  return count == n - 1; // 防止[[0,1],[2,3]]这种情况, 边数应该等于节点数-1
};

/* BFS的方法, map<key, value>, value表示父节点,key表示value的子节点，来看 */
var validTree4 = function (n, edges) {
  let adjacencyList = new Array(n).fill(0).map(() => []);
  // 构建邻接表,adjacencyList[i]表示第i个节点, 值表示和它相接的节点
  for (let [u, v] of edges) {
    adjacencyList[u].push(v);
    adjacencyList[v].push(u);
  }

  // parent的规则，从key(edge[1])到value(edge[0])， key是子节点，value是父节点
  // 根据题目要求，0总是树的根节点，所以0没有父节点，parent[0] = -1
  let parent = { 0: -1 }, queue = [0], edgeCount = 0;

  while (queue.length !== 0) {
    let node = queue.shift();
    for (let neighbour of adjacencyList[node]) {
      //跳过双向连接的父节点
      if (parent[node] == neighbour) {
        continue;
      }
      // 成环条件：两个节点之间只有一个 root，所以如果能通过子节点访问到 root，说明这个子节点已经被访问过了，说明成环了
      // 因为parent上的key相当于子节点，只能对应一个父节点，如果已经有了，说明已经从value父节点访问过key子节点了
      if (parent[neighbour] !== undefined) {
        return false;
      }
      queue.push(neighbour);
      parent[neighbour] = node;
      edgeCount++;
    }
  }
  return edgeCount == n - 1; // 防止[[0,1],[2,3]]这种情况, 边数应该等于节点数-1
};

// Union Find的方法
import { UF } from '../../Algorithm/图/union-find';
var validTree6 = function (n, edges) {
  // 初始化 0...n-1 共 n 个节点
  const uf = new UF(n);
  // 遍历所有边，将组成边的两个节点进行连接
  for (let edge of edges) {
    let u = edge[0], v = edge[1];
    // 若两个节点已经在同一连通分量中，会产生环
    if (uf.connected(u, v)) {
      return false;
    }
    // 这条边不会产生环，可以是树的一部分
    uf.union(u, v);
  }
  // 要保证最后只形成了一棵树，即只有一个连通分量
  return uf.getCount() === 1;
};

// @lc code=end