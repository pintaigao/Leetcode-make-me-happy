/*
 * @lc app=leetcode id=366 lang=javascript
 *
 * [366] Find Leaves of Binary Tree
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
 * @return {number[][]}
 */
var findLeaves = function (root) {
  let res = [];
  dfs = (node) => {
    if (node === null) return -1;
    let level = Math.max(dfs(node.left), dfs(node.right)) + 1;
    if (!res[level]) res.push([]);
    res[level].push(node.val);
    return level;
  };

  dfs(root);
  return res;
};
// @lc code=end
