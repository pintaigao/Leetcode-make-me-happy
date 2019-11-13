/*
 * @lc app=leetcode id=543 lang=javascript
 *
 * [543] Diameter of Binary Tree
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
var diameterOfBinaryTree = function (root) {
  let result = 1;
  dfs(root)

  function dfs(root) {
    if (!root) {
      return 0;
    }
    let l = dfs(root.left);
    let r = dfs(root.right);
    result = Math.max(result, l + r + 1);
    return Math.max(l, r) + 1;
  }

  return result - 1;
};

