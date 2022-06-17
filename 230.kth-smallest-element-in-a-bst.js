/*
 * @lc app=leetcode id=230 lang=javascript
 *
 * [230] Kth Smallest Element in a BST
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
 * @param {number} k
 * @return {number}
 */

// Approach 1: 中序遍历
var kthSmallest = function (root, k) {
  let inorder = function (root, arr) {
    if (root == null) return arr;
    inorder(root.left, arr);
    arr.push(root.val);
    inorder(root.right, arr);
    return arr;
  };

  let nums = inorder(root, []);
  return nums[k - 1];
};

// Approach 2: Iterative Inorder Traversal
var kthSmallest2 = function (root, k) {
  let stack = [];

  while (true) {
    while (root != null) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();
    if (k - 1 == 0) return root.val;
    k -= 1;
    root = root.right;
  }
};

// Approach 3: 中序不用Stack
var kthSmallest3 = function (root, k) {
  let result;
  let inorder = function (root) {
    if (root != null) {
      inorder(root.left);
      if (--k == 0) {
        result = root;
      }
      if (result == null) {
        inorder(root.right);
      }
    }
  };

  inorder(root);
  return result.val;
};
// @lc code=end
