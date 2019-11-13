/*
 * @lc app=leetcode id=124 lang=javascript
 *
 * [124] Binary Tree Maximum Path Sum
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
var maxPathSum = function(root) {
    let max_sum = Number.MIN_SAFE_INTEGER;

    function max_gain(node) {
      if(!node) return 0;

      let left = Math.max(max_gain(node.left), 0);
      let right = Math.max(max_gain(node.right), 0);

      let newValue = node.val + left + right;

      max_sum = Math.max(max_sum, newValue);

      return node.val + Math.max(left, right);
    }


    max_gain(root);
    return max_sum;
};

