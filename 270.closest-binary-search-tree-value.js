/*
 * @lc app=leetcode id=270 lang=javascript
 *
 * [270] Closest Binary Search Tree Value
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
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
  let potential = root;
  while (root) {
    if (Math.abs(potential.val - target) > Math.abs(root.val - target)) {
      potential = root;
    }
    if (target < root.val) {
      root = root.left;
    } else {
      root = root.right;
    }
  }

  return potential.val;
};
// @lc code=end
