/*
 * @lc app=leetcode id=226 lang=javascript
 *
 * [226] Invert Binary Tree
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
 * @return {TreeNode}
 */
var invertTree = function (root) {
  if (!root) {
    return root;
  }

  helper(root);
  return root;
};

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
