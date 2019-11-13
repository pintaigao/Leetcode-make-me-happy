/*
 * @lc app=leetcode id=337 lang=javascript
 *
 * [337] House Robber III
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
var rob = function (root) {
  let money = helper(root);

  return Math.max(money[0], money[1]);
};

var helper = function (root) {
  if (!root) { return [0, 0]; }

  let left = helper(root.left);
  let right = helper(root.right);
  let res = [0, 0];
  res[0] = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
  res[1] = root.val + left[0] + right[0];

  return res;
};

