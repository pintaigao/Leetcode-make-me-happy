/*
 * @lc app=leetcode id=102 lang=javascript
 *
 * [102] Binary Tree Level Order Traversal
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
 * @return {number[][]}
 */

//  Using Level to archieve
var levelOrder = function (root) {
  let result = [];
  if (!root) return result;
  function helper(root, level) {
    if (!root) return;
    helper(root.left, level + 1);
    helper(root.right, level + 1);
    if (!result[level]) {
      result[level] = new Array();
    }
    result[level].push(root.val);
  }

  helper(root, 0);
  return result;
};



