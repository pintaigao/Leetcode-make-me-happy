/*
 * @lc app=leetcode id=993 lang=javascript
 *
 * [993] Cousins in Binary Tree
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
let recordedDepth = -1;
let isCousin = false;

// DFS Solution
var isCousins = function (root, x, y) {
  dfs(root, 0, x, y);
  return isCousin;
};

var dfs = function (node, depth, x, y) {
  if (node == null) {
    return false;
  }

  // Don't go beyond the depth restricted by the first node found.
  if (recordedDepth != -1 && depth > recordedDepth) {
    return false;
  }

  if (node.val == x || node.val == y) {
    if (recordedDepth == -1) {
      // Save depth for the first node found.
      recordedDepth = depth;
    }
    // Return true, if the second node is found at the same depth.
    return recordedDepth == depth;
  }

  let left = dfs(node.left, depth + 1, x, y);
  let right = dfs(node.right, depth + 1, x, y);

  // this.recordedDepth != depth + 1 would ensure node x and y are not
  // immediate child nodes, otherwise they would become siblings.
  if (left && right && recordedDepth != depth + 1) {
    isCousin = true;
  }
  return left || right;
};

// BFS Solution
var isCousins = function (root, x, y) {
  const bfs = (queue) => {
    while (queue.length > 0) {
      let new_queue = [];
      let { X, Y } = {};
      for (let [node, parent] of queue) {
        if (node.val === x) X = parent;
        if (node.val === y) Y = parent;
        if (X && Y && X !== Y) return true;
        if (node.left) new_queue.push([node.left, node]);
        if (node.right) new_queue.push([node.right, node]);
      }
      queue = new_queue;
    }
    return false;
  };
  return bfs([[root, null]]);
};
// @lc code=end
