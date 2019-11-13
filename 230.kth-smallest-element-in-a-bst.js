/*
 * @lc app=leetcode id=230 lang=javascript
 *
 * [230] Kth Smallest Element in a BST
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
 * @param {number} k
 * @return {number}
 */
// var kthSmallest = function (root, k) {
//   let stack = [];
//   // stack.push(root);
//   // let result = [];
//   while (root != null || stack.length > 0) {
//     while (root != null) {
//       stack.push(root);
//       root = root.left;
//     }
//     k--;
//     let node = stack.pop();
//     if (k == 0) {
//       return node.val;
//     }
//     root = node.right;
//   }
// };

var kthSmallest = function (root, k) {
  if (root) {
    kthSmallest(root.left, k);
    k -= 1;
    if (k === 0) {
      return root;
    }
    kthSmallest(root.right, k);
  }
}

