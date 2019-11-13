/*
 * @lc app=leetcode id=129 lang=javascript
 *
 * [129] Sum Root to Leaf Numbers
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
var sumNumbers = function (root) {
  if(!root) {
    return 0;
  }
  let result = dfs(root, 0);

  function dfs(root, value) {
    if (!root.left && !root.right) {
      return value * 10 + root.val;
    }
    let result = 0;
    if (root.left) {
      result += dfs(root.left, value * 10 + root.val);
    }
    if (root.right) {
      result += dfs(root.right, value * 10 + root.val)
    }
    return result;
  }

  return result;
};

