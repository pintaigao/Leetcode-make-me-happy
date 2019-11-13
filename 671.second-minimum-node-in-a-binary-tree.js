/*
 * @lc app=leetcode id=671 lang=javascript
 *
 * [671] Second Minimum Node In a Binary Tree
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
 * @return {number}
 */
var findSecondMinimumValue = function (root) {
  var min1 = root.val, min2 = -1;
  var nodes = [root];
  while (nodes && nodes.length > 0) {
    var node = nodes.pop();
    if (node.val > min1 && (node.val < min2 || min2 < 0)) {
      min2 = node.val;
    }
    if (node.left != null) {
      nodes.push(node.left);
    }

    if (node.right != null) {
      nodes.push(node.right);
    }

  }

  return min2 > min1 ? min2 : -1;

};

