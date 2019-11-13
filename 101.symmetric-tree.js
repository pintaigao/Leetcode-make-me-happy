/*
 * @lc app=leetcode id=101 lang=javascript
 *
 * [101] Symmetric Tree
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
var isSymmetric = function (root) {
  if (!root) {
    return true;
  }
  return isSymmetricHelper(root.left, root.right);
};


isSymmetricHelper = (left, right) => {
  if (!left && !right) {
    return true;
  }

  if (!left || !right) {
    return false;
  }

  if (left.val == right.val) {
    return isSymmetricHelper(left.left, right.right) && isSymmetricHelper(left.right, right.left)
  } else {
    return false;
  }

};


