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
  function helper(root) {
    if(!root) {
      return;
    }
    invertTree(root.left);
    invertTree(root.right);
    let left = root.left;
    let right = root.right;
    root.left = right;
    root.right = left;
  }

  helper(root);
  return root;
};


