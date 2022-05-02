/*
 * @lc app=leetcode id=572 lang=javascript
 *
 * [572] Subtree of Another Tree
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
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
/* DFS */
var isSubtree = function (root, subRoot) {
  return root != null && (isIdentical(root, subRoot) || isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot));

  function isIdentical(t1, t2) {
    if (t1 == null && t2 == null) return true;

    if (t1 == null || t2 == null || t1.val != t2.val) return false;

    return isIdentical(t1.left, t2.left) && isIdentical(t1.right, t2.right);
  }
};
// @lc code=end
