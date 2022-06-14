/*
 * @lc app=leetcode id=250 lang=javascript
 *
 * [250] Count Univalue Subtrees
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
 * @return {number}
 */
/* DFS 从下往上看 */
var countUnivalSubtrees = function (root) {
  let count = 0;
  let is_uni = function (node) {
    // 叶子算相同子树
    if (node.left == null && node.right == null) {
      count += 1;
      return true;
    }

    let is_unival = true;

    // 如果这个node的左边有，
    if (node.left != null) {
      is_unival = is_uni(node.left) && is_unival && node.left.val == node.val;
    }

    if (node.right != null) {
      is_unival = is_uni(node.right) && is_unival && node.right.val == node.val;
    }

    if (!is_unival) return false;
    count += 1;
    return true;
  };

  if (root == null) return 0;
  is_uni(root);
  return count;
};
// @lc code=end
