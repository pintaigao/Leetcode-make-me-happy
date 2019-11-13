/*
 * @lc app=leetcode id=98 lang=javascript
 *
 * [98] Validate Binary Search Tree
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
 * @return {boolean}
 */
var isValidBST = function (root) {
  return isValidBSTImpl(root);
};

function isValidBSTImpl(root, small = null, big = null) {
  if (!root) {
    return true;
  }
  if (small !== null && root.val <= small ||  big !== null && root.val >= big) {
    return false;
  }
  return isValidBSTImpl(root.left, small, root.val) &&
    isValidBSTImpl(root.right, root.val, big);
}

