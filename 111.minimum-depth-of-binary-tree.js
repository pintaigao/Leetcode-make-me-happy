/*
 * @lc app=leetcode id=111 lang=javascript
 *
 * [111] Minimum Depth of Binary Tree
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
 * @return {number}
 */
var minDepth = function (root) {
  if (root == null) {
    return 0;
  }

  if (root.left == null && root.right == null) {
    return 1;
  }

  let min_depth = Number.MAX_VALUE;
  if (root.left != null) {
    min_depth = Math.min(minDepth(root.left), min_depth);
  }
  if (root.right != null) {
    min_depth = Math.min(minDepth(root.right), min_depth);
  }

  return min_depth + 1;
};

let minDepth2 = function (root) {
  if (root == null) {
    return 0;
  }
  if (root.left == null) {
    return minDepth(root.right) + 1;
  }
  if (root.right == null) {
    return minDepth(root.left) + 1;
  }
  return Math.min(minDepth(root.left), minDepth(root.right)) + 1;
};
// @lc code=end
