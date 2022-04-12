/*
 * @lc app=leetcode id=965 lang=javascript
 *
 * [965] Univalued Binary Tree
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isUnivalTree = function (root) {
  if (root == null) return true;

  if (root.left != null) if (root.val != root.left.val) return false;

  if (root.right != null) if (root.val != root.right.val) return false;

  return isUnivalTree(root.left) && isUnivalTree(root.right);
};
// @lc code=end
