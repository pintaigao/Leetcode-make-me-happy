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
  let sum = 0;
  if (root == null) {
    return 0;
  }
  if (root.val >= L && root.val <= R) {
    sum = root.val;
  }

  if (L <= root.val || R <= root.val) {
    sum += rangeSumBST(root.left, L, R);
  }
  if (root.val <= L || root.val <= R) {
    sum += rangeSumBST(root.right, L, R);
  }
  return sum;
};
