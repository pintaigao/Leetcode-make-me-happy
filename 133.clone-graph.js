/*
 * @lc app=leetcode id=133 lang=javascript
 *
 * [133] Clone Graph
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
/* DFS */
var cloneGraph = function (node) {
  let visited = new Map();
  function dfs(node) {
    if (node === null) return node;
    if (visited.has(node)) return visited.get(node);
    let cloneNode = new Node(node.val, []);
    visited.set(node, cloneNode);
    for (const n of node.neighbors) {
      cloneNode.neighbors.push(dfs(n));
    }
    return cloneNode;
  }
  return dfs(node);
};

/* BFS */
var cloneGraph = function (node) {
  if (!node) {
    return null;
  }

  const visited = new Map();
  const queue = [node];
  visited.set(node, new Node(node.val));

  while (queue.length > 0) {
    const current = queue.shift();
    for (let n of current.neighbors) {
      if (!visited.has(n)) {
        visited.set(n, new Node(n.val));
        queue.push(n);
      }
      visited.get(current).neighbors.push(visited.get(n));
    }
  }
  return visited.get(node);
};
// @lc code=end
