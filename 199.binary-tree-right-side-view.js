/*
 * @lc app=leetcode id=199 lang=javascript
 *
 * [199] Binary Tree Right Side View
 */

// @lc code=start
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

// 1. DFS
var rightSideView = function (root) {
  this.rightside = [];

  if (root == null) return rightside;

  helper(root, 0);
  return rightside;
};

let helper = function (node, level) {
  if (level == rightside.size()) {
    this.rightside.push(node.val);
  }

  if (node.right != null) helper(node.right, level + 1);
  if (node.left != null) helper(node.left, level + 1);
};

// 2. BFS
var rightSideView2 = function (root) {
  if (root == null) return [];

  let nextLevel = [root];
  let currLevel = [];
  let rightside = [];

  let node = null;
  while (nextLevel.length !== 0) {
    // prepare for the next level
    currLevel = [...nextLevel];
    nextLevel = [];

    while (currLevel.length !== 0) {
      node = currLevel.shift();
      // add child nodes of the current level
      // in the queue for the next level
      if (node.left != null) nextLevel.push(node.left);
      if (node.right != null) nextLevel.push(node.right);
    }

    // The current level is finished.
    // Its last element is the rightmost one.
    if (currLevel.length == 0) rightside.push(node.val);
  }
  return rightside;
};

// @lc code=end
