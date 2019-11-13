/*
 * @lc app=leetcode id=298 lang=javascript
 *
 * [298] Binary Tree Longest Consecutive Sequence
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
var longestConsecutive = function (root) {

  if (!root) return 0;
  let max = 0;

  const helper = function (node, target, length) {

    if (node === null) return;

    if (node.val === target) {
      length++;
      max = length > max ? length : max;

    } else {
      length = 1;
    }

    if (node.left) { helper(node.left, node.val + 1, length) };
    if (node.right) { helper(node.right, node.val + 1, length) };
  }

  helper(root, root.val, max);

  return max;
};

