/*
 * @lc app=leetcode id=257 lang=javascript
 *
 * [257] Binary Tree Paths
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
 * @return {string[]}
 */
function binaryTreePaths(root) {
  if (!root) return [];
  let allPaths = [];
  let path = [];

  let explore = function (node) {
    path.push(node.val);
    if (node.left) explore(node.left);
    if (node.right) explore(node.right);
    if (!node.left && !node.right) {
      allPaths.push(path.join("->"));
    }
    path.pop();
  };

  explore(root);
  return allPaths;
}
