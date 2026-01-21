/*
 * @lc app=leetcode id=515 lang=javascript
 *
 * [515] Find Largest Value in Each Tree Row
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
var largestValues = function (root) {
  var res = [];

  if (!root) { return res; }

  var queue = [];
  queue.push(root);

  while (queue.length > 0) {
    var size = queue.length;
    var max = Number.MIN_SAFE_INTEGER;
    for (var i = 0; i < size; i++) {
      var node = queue.shift();
      if (node.val >= max) { max = node.val; }
      if (node.left) { queue.push(node.left); }
      if (node.right) { queue.push(node.right); }
    }
    res.push(max);
  }

  return res;
};

