import { UF } from '../Algorithm/union-find.js';
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */

var countComponents = function (n, edges) {
  // 1. 先 Build 图
  const graph = new Array(n).fill(0).map(() => []);
  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  // 2. DFS 遍历图
  const visited = new Array(n).fill(false);
  let count = 0;

  const dfs = (node) => {
    visited[node] = true;
    for (const neighbor of graph[node]) {
      if (!visited[neighbor]) {
        dfs(neighbor);
      }
    }
  };

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      count++;
      dfs(i);
    }
  }

  return count;
};

// BFS 方法
var countComponents1 = function (n, edges) {
  // 1. 先 Build 图
  const graph = new Array(n).fill(0).map(() => []);
  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  // 2. BFS 遍历图
  const visited = new Array(n).fill(false);
  let count = 0;
  const queue = [];

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      count++;
      queue.push(i);
      visited[i] = true;
      while (queue.length > 0) {
        const node = queue.shift();
        for (const neighbor of graph[node]) {
          if (!visited[neighbor]) {
            visited[neighbor] = true;
            queue.push(neighbor);
          }
        }
      }
    }
  }

  return count;
};

// Union Find 方法
var countComponents2 = function (n, edges) {
  let uf = new UF(n);
  // 将每个节点进行连通
  for (let e of edges) {
    uf.union(e[0], e[1]);
  }
  // 返回连通分量的个数
  return uf.count_();
}

console.log(countComponents2(5, [[0, 1], [1, 2], [3, 4]]));
