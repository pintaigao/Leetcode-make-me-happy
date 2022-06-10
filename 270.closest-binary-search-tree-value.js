/*
 * @lc app=leetcode id=270 lang=javascript
 *
 * [270] Closest Binary Search Tree Value
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
 * @param {number} target
 * @return {number}
 */
var closestValue = function (root, target) {
  if (!root.left && !root.right) {
    return root.val;
  }
  let result = root;
  while (root) {
    if (Math.abs(result.val - target) > Math.abs(root.val - target)) {
      result = root;
    }
    // 这个是二叉搜索树
    if (target < root.val) {
      root = root.left;
    } else {
      root = root.right;
    }
  }

  return result.val;
};
// @lc code=end
