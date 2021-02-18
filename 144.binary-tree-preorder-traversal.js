/*
 * @lc app=leetcode id=144 lang=javascript
 *
 * [144] Binary Tree Preorder Traversal
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
 * @return {number[]}
 */
var preorderTraversal = function (root) {
  let stack = [];
  let result = [];
  if (!root) {
    return result;
  }

  stack.unshift(root);

  while (stack.length) {
    let node = stack.shift();
    result.push(node.val);
    if (node.right) {
      stack.unshift(node.right);
    }

    if (node.left) {
      stack.unshift(node.left);
    }
  }

  return result;
};
