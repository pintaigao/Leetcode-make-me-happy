/*
 * @lc app=leetcode id=103 lang=javascript
 *
 * [103] Binary Tree Zigzag Level Order Traversal
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
 * @return {number[][]}
 */

// 1. BFS 的方法
var zigzagLevelOrder = function (root) {
  if (root == null) {
    return [];
  }

  let results = [];

  // add the root element with a delimiter to kick off the BFS loop
  let node_queue = [];
  node_queue.push(root);
  node_queue.push(null);

  let level_list = [];
  let is_order_left = true;

  while (node_queue.length > 0) {
    let curr_node = node_queue.shift();
    if (curr_node != null) {
      if (is_order_left) level_list.push(curr_node.val);
      else level_list.unshift(curr_node.val);

      if (curr_node.left != null) node_queue.push(curr_node.left);
      if (curr_node.right != null) node_queue.push(curr_node.right);
    } else {
      // we finish the scan of one level
      results.push(level_list);
      level_list = [];
      // prepare for the next level
      if (node_queue.length > 0) node_queue.push(null);
      is_order_left = !is_order_left;
    }
  }
  return results;
};

// 2. DFS 的方法
var zigzagLevelOrder = function (root) {
  if (root == null) {
    return [];
  }
  let results = [];
  DFS(root, 0, results);
  return results;
};

let DFS = function (node, level, results) {
  if (level >= results.length) {
    let newLevel = [];
    newLevel.push(node.val);
    results.push(newLevel);
  } else {
    if (level % 2 == 0) results[level].push(node.val);
    else results[level].unshift(node.val);
  }

  if (node.left != null) DFS(node.left, level + 1, results);
  if (node.right != null) DFS(node.right, level + 1, results);
};
// @lc code=end
