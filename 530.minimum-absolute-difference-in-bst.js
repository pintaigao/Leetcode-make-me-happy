/*
 * @lc app=leetcode id=530 lang=javascript
 *
 * [530] Minimum Absolute Difference in BST
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var getMinimumDifference = function (root) {
  let pre = undefined;
  let diff = Infinity;
  function inOrder(root) {
    if (root === null) {
      return;
    }
    inOrder(root.left);
    if (pre !== undefined && diff > root.val - pre) {
      diff = root.val - pre;
    }
    pre = root.val;
    inOrder(root.right);
  }
  inOrder(root);
  return diff;
};

