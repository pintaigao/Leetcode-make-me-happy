/*
 * @lc app=leetcode id=572 lang=javascript
 *
 * [572] Subtree of Another Tree
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} s
 * @param {TreeNode} t
 * @return {boolean}
 */

// 1. DFS
var isSubtree = function (s, t) {
  return (
    s != null &&
    (isIdentical(s, t) || isSubtree(s.left, t) || isSubtree(s.right, t))
  );

  function isIdentical(t1, t2) {
    if (t1 == null && t2 == null) return true;

    if (t1 == null || t2 == null) return false;

    // 这个只能放这里因为t1 or t2有可能是空
    if (t1.val != t2.val) return false;

    return isIdentical(t1.left, t2.left) && isIdentical(t1.right, t2.right);
  }
};
