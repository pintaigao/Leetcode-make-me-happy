/*
 * @lc app=leetcode id=1026 lang=javascript
 *
 * [1026] Maximum Difference Between Node and Ancestor
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
var maxAncestorDiff = function (root) {
  if (root == null) { return 0; }

  let result = 0;
  helper(root, root.val, root.val);

  function helper(root, max, min) {
    if (root == null) {
      result = Math.max(result, max - min);
      return;
    }

    max = Math.max(max, root.val);
    min = Math.min(min, root.val);

    helper(root.left, max, min);
    helper(root.right, max, min);
  }

  return result;
};

