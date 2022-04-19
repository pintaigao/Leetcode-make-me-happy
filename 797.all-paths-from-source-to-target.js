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
/* Solution 1: DFS */
var allPathsSourceTarget = function (graph) {
  const adj = new Map();
  const N = graph.length - 1;
  const res = [];
  let path = [];

  // map中的key是节点label，value是与该节点相连的节点Set
  for (let i = 0; i < graph.length; i++) {
    adj.set(i, new Set(graph[i]));
  }

  function dfs(label) {
    // 先访问这个label
    path.push(label);
    if (label === N) {
      // path.slice() 深拷贝
      res.push(path.slice());
      path.pop();
      return;
    }
    // 再访问这个label的所有相连节点，从map中取出
    adj.get(label).forEach((v) => {
      dfs(v);
    });

    // 删除这个label
    path.pop();
  }

  // 从0开始深度优先遍历
  dfs(0);
  return res;
};

// Solution 2: BFS
var allPathsSourceTarget = function (graph) {
  const adj = new Map();
  const N = graph.length - 1;
  const res = [];
  for (let i = 0; i < graph.length; i++) {
    adj.set(i, new Set(graph[i]));
  }

  const queue = [[0, new Set()]];
  while (queue.length) {
    const [node, set] = queue.shift();
    // 先访问这个label,路径 += label
    set.add(node);
    // 如果到头了，把路径放入res
    if (node === N) {
      res.push([...set]);
    }
    // 再看这个label的所有相连节点，一个一个放入queue，发散来看
    for (let k of adj.get(node)) {
      queue.push([k, new Set(set)]);
    }
  }
  return res;
};
// @lc code=end
