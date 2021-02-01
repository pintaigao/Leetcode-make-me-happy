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
/* 不管怎样都要一个HashMap来存储 */
// 1. DFS 的方法
const visited = new Map();
var cloneGraph = function (node, memo = new Map()) {
  if (!node) return null;

  if (visited.has(node.val)) {
    return visited.get(node.val);
  }
  const cloned = new Node(node.val);
  visited.set(node.val, cloned);

  for (let n of node.neighbors) {
    cloned.neighbors.push(cloneGraph(n));
  }

  return cloned;
};

// 2. BFS 的方法
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
