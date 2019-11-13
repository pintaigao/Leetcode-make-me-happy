/*
 * @lc app=leetcode id=538 lang=javascript
 *
 * [538] Convert BST to Greater Tree
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
var convertBST = function (root) {
  if (root === null) return root;
  let curSum = 0;
  var dfs = function (node) {
    if (node === null) return;
    dfs(node.right);
    curSum += node.val;
    node.val = curSum;
    dfs(node.left);
  }
  dfs(root);
  return root;
};

