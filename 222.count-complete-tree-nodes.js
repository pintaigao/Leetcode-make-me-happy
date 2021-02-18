/*
 * @lc app=leetcode id=222 lang=javascript
 *
 * [222] Count Complete Tree Nodes
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
 * @return {number}
 */

// Approach 1: Linear Time
var countNodes = function (root) {
  return root != null ? 1 + countNodes(root.right) + countNodes(root.left) : 0;
};

// Approach 2: Binary search O(d^2) = O(log^2 N) d is a tree depth, O(1)
var countNodes2 = function (root) {};
// @lc code=end
