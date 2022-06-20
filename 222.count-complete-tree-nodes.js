/*
 * @lc app=leetcode id=222 lang=javascript
 *
 * [222] Count Complete Tree Nodes
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
/* Solution 1：Linear Time */
var countNodes = function (root) {
  return root != null ? 1 + countNodes(root.right) + countNodes(root.left) : 0;
};

/* Solution 2: count level */
var countNodes = function (root) {
  if (root == null) {
    return 0;
  }
  let left = countLevel(root.left);
  let right = countLevel(root.right);
  if (left == right) {
    return countNodes(root.right) + Math.pow(2, left);
  } else {
    return countNodes(root.left) + Math.pow(2, right);
  }
};

let countLevel = function (root) {
  let level = 0;
  while (root != null) {
    level++;
    root = root.left;
  }
  return level;
};

// @lc code=end
