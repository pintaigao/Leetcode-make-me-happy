/*
 * @lc app=leetcode id=110 lang=javascript
 *
 * [110] Balanced Binary Tree
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
// var isBalanced = function (root) {
//   if(!root) {
//     return true;
//   }


//   let left = isBalancedHelper(root.left);
//   let right = isBalancedHelper(root.right);
//   return Math.abs(left - right) > 1 ? false : true;
// };

// isBalancedHelper = (root) => {
//   if (!root) {
//     return 0;
//   }
//   let left = isBalancedHelper(root.left);
//   let right = isBalancedHelper(root.right);
//   return Math.max(left, right) + 1;
// }


var isBalanced = function (root) {
  return isBalancedHelper(root) != -1;
};

isBalancedHelper = (root) => {
  if (!root) {
    return 0;
  }
  let left = isBalancedHelper(root.left);
  let right = isBalancedHelper(root.right);
  if(left == -1 || right == -1  ||  Math.abs(left - right) > 1) {
    return -1;
  } 
  return Math.max(left, right) + 1;
}

