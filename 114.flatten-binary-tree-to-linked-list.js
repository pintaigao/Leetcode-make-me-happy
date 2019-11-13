/*
 * @lc app=leetcode id=114 lang=javascript
 *
 * [114] Flatten Binary Tree to Linked List
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
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function (root) {
  if (!root) return;

  let left = null;
  let right = null;

  if (root.left) {
    left = root.left
    root.left = null;
    flatten(left);
  }
  if (root.right) {
    right = root.right;
    flatten(right);
  }

  if (left) {
    root.right = left;
    while(root.right) {
      root = root.right;
    }
    root.right = right;
  }
  root.lastIndex = root;
};

