/*
 * @lc app=leetcode id=797 lang=javascript
 *
 * [797] All Paths From Source to Target
 */

// @lc code=start
/**
 * @param {number[][]} graph
 * @return {number[][]}
 */

// 1. Javascript 超简短方法
var allPathsSourceTarget = function (graph) {
  const results = [];
  findPaths([0], 0, graph, results);
  return results;
};

function findPaths(current, node, graph, results) {
  if (node == graph.length - 1) {
    results.push(current.slice(0));
    return;
  }

  for (let i = 0; i < graph[node].length; i++) {
    current.push(graph[node][i]);
    findPaths(current, graph[node][i], graph, results);
    current.pop();
  }
}

// 2. DFS
var allPathsSourceTarget2 = function (graph) {
  const adj = new Map();
  const N = graph.length - 1;
  const res = [];
  let path = [];

  for (let i = 0; i < graph.length; i++) {
    adj.set(i, new Set(graph[i]));
  }

  function dfs(idx) {
    path.push(idx);
    if (N === idx) {
      res.push(path.slice());
      path.pop();
      return res;
    }
    adj.get(idx).forEach((v) => {
      dfs(v);
    });
    path.pop();
    return res;
  }

  dfs(0);

  console.log(res);
  return res;
};

// 3. BFS
var allPathsSourceTarget3 = function (graph) {
  const adj = new Map();
  const N = graph.length - 1;
  const res = [];
  for (let i = 0; i < graph.length; i++) {
    adj.set(i, new Set(graph[i]));
  }

  const queue = [[0, new Set()]];
  while (queue.length) {
    const [node, set] = queue.shift();
    set.add(node);
    if (node === N) {
      console.log(set);
      console.log();
      res.push([...set]);
    }
    for (let k of adj.get(node)) {
      queue.push([k, new Set(set)]);
    }
  }

  console.log(res);
  return res;
};
allPathsSourceTarget3([[4, 3, 1], [3, 2, 4], [3], [4], []]);
// @lc code=end
