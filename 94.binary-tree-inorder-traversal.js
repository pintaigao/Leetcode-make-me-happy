/*
 * @lc app=leetcode id=94 lang=javascript
 *
 * [94] Binary Tree Inorder Traversal
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
 * @return {number[]}
 */

// 1. Recursive Approach
var inorderTraversal = function (root) {
  let result = [];
  helper(root, result);
  return result;
};

let helper = function (root, result) {
  if (root) {
    if (root.left) {
      helper(root.left, result);
    }
    result.push(root.val);
    if (root.right) {
      helper(root.right, result);
    }
  }
};

// 2. Iterating method using Stack O(n) O(n)
var inorderTraversal = function (root) {
  let res = [];
  let stack = [];
  let curr = root;
  while (curr || stack.length) {
    while (curr) {
      stack.push(curr);
      curr = curr.left;
    }
    curr = stack.pop();
    res.push(curr.val);
    curr = curr.right;
  }
  return res;
};
// @lc code=end
