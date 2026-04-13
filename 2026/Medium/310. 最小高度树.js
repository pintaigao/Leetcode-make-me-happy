/**
 * @param {number} n - 节点的数量
 * @param {number[][]} edges - 图的边
 * @return {number[]} - 最小高度树的根节点列表
 */
var findMinHeightTrees = function (n, edges) {
  const ans = []; // 最终结果数组
  if (n === 1) { // 如果只有一个节点
    ans.push(0); // 该节点就是唯一的最小高度树
    return ans;
  }

  // 构建图的邻接表
  const adj = new Array(n).fill(0).map(() => new Array());
  for (const edge of edges) { // 遍历所有边
    adj[edge[0]].push(edge[1]); // 添加无向边 (edge[0], edge[1])
    adj[edge[1]].push(edge[0]); // 添加无向边 (edge[1], edge[0])
  }

  const parent = new Array(n).fill(-1); // 用于记录 BFS 的路径
  const x = findLongestNode(0, parent, adj); // 找到与节点 0 最远的节点 x
  let y = findLongestNode(x, parent, adj); // 找到与节点 x 最远的节点 y
  // 这样 x 到 y 之间的路径就是最长路径

  // 求出节点 x 到节点 y 的路径
  const path = [];
  parent[x] = -1; // 确保路径中 x 是起点
  while (y !== -1) { // 追踪父节点找到路径
    path.push(y); // 将路径上的节点加入数组
    y = parent[y]; // 移动到下一个父节点
  }

  const m = path.length; // 路径的长度
  if (m % 2 === 0) { // 如果路径长度是偶数
    ans.push(path[Math.floor(m / 2) - 1]); // 添加中间节点的前一个节点
  }
  ans.push(path[Math.floor(m / 2)]); // 添加中间节点

  return ans; // 返回结果
};

/**
 * @param {number} u - 起始节点
 * @param {number[]} parent - 记录路径的父节点数组
 * @param {Array[]} adj - 图的邻接表
 * @return {number} - 最远的节点
 */
const findLongestNode = (u, parent, adj) => {
  const n = adj.length; // 节点数量
  const queue = []; // 队列用于 BFS
  const visit = new Array(n).fill(false); // 记录是否访问过节点
  queue.push(u); // 从起始节点开始
  visit[u] = true; // 标记起始节点为已访问
  let node = -1; // 最远节点的变量初始化

  while (queue.length) { // 当队列不为空时
    const curr = queue.shift(); // 从队列中取出当前节点
    node = curr; // 更新最远节点
    for (const v of adj[curr]) { // 遍历当前节点的邻居
      if (!visit[v]) { // 如果邻居节点未被访问
        visit[v] = true; // 标记邻居节点为已访问
        parent[v] = curr; // 记录邻居节点的父节点
        queue.push(v); // 将邻居节点加入队列
      }
    }
  }

  return node; // 返回最远节点
};

var findMinHeightTrees = function (n, edges) {
  if (n === 1) {
    // base case，只有一个节点 0 的话，无法形成边，所以直接返回节点 0
    return [0];
  }

  // 1、构建邻接表
  const graph = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    // 无向图，等同于双向图
    graph[u].push(v);
    graph[v].push(u);
  }

  // 2、找到所有的叶子节点
  const q = [];
  for (let i = 0; i < n; i++) {
    if (graph[i].length === 1) {
      q.push(i);
    }
  }

  // 3、不断删除叶子节点，直到剩下的节点数小于等于 2 个
  let nodeCount = n;
  while (nodeCount > 2) {
    const sz = q.length;
    nodeCount -= sz;
    for (let i = 0; i < sz; i++) {
      // 删除当前叶子节点
      const cur = q.shift();

      // 找到与当前叶子节点相连的节点
      for (const neighbor of graph[cur]) {
        // 将被删除的叶子节点的邻接节点的度减 1
        graph[neighbor] = graph[neighbor].filter(n => n !== cur);
        // 如果删除后，相连节点的度为 1，说明它也变成了叶子节点
        if (graph[neighbor].length === 1) {
          q.push(neighbor);
        }
      }
    }
  }

  // 4、最后剩下的节点就是根节点
  return q;
};
