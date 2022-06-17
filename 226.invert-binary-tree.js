/*
 * @lc app=leetcode id=226 lang=javascript
 *
 * [226] Invert Binary Tree
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
 * @return {TreeNode}
 */

/* DFS 后序遍历 */
var invertTree = function (root) {
  if (!root) {
    return root;
  }

  let helper = function (root) {
    if (!root) {
      return;
    }
    helper(root.left);
    helper(root.right);
    let left = root.left;
    let right = root.right;
    root.left = right;
    root.right = left;
  };

  helper(root);
  return root;
};

/* BFS*/
// 2. Queue BFS Solution
let invertTree2 = function (root) {
  if (!root) {
    return null;
  }

  let queue = [];
  queue.push(root);

  while (queue.length) {
    let node = queue.shift();
    let left = node.left;
    node.left = node.right;
    node.right = left;

    if (node.left != null) {
      queue.push(node.left);
    }
    if (node.right != null) {
      queue.push(node.right);
    }
  }
  return root;
};
// @lc code=end
