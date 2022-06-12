/*
 * @lc app=leetcode id=257 lang=javascript
 *
 * [257] Binary Tree Paths
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
 * @return {string[]}
 */
var binaryTreePaths = function (root) {
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
};
// @lc code=end
