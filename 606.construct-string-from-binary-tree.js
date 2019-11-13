/*
 * @lc app=leetcode id=606 lang=javascript
 *
 * [606] Construct String from Binary Tree
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} t
 * @return {string}
 */
var tree2str = function (t) {
  if (t === null) {
    return '';
  }
  function traverse(node) {
    let x = `${node.val}`;
    if (node.left !== null) {
      x += `(${traverse(node.left)})`;
    }
    if (node.right !== null) {
      if (node.left === null) {
        x += '()';
      }
      x += `(${traverse(node.right)})`;
    }
    return x;
  }
  return traverse(t);
};

