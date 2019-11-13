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
  explore(root, path, allPaths);
  return allPaths;
};

function explore(node, path, allPaths) {
  path.push(node.val);
  if (node.left) explore(node.left, path, allPaths);
  if (node.right) explore(node.right, path, allPaths);
  if (!node.left && !node.right) allPaths.push(path.join('->'));
  path.pop();
}

