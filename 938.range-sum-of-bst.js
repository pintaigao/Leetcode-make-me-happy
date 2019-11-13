/*
 * @lc app=leetcode id=938 lang=javascript
 *
 * [938] Range Sum of BST
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
 * @param {number} L
 * @param {number} R
 * @return {number}
 */
const rangeSumBST = (root, L, R) => {
  if (root === null) {
    return 0;
  }

  return (root.val >= L && root.val <= R ? root.val : 0) + rangeSumBST(root.left, L, R) + rangeSumBST(root.right, L, R);
}


