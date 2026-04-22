/*
 * @lc app=leetcode id=104 lang=javascript
 *
 * [104] Maximum Depth of Binary Tree
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
var maxDepth = function (root) {
  if (!root) return 0;
  let left = maxDepth(root.left);
  let right = maxDepth(root.right);
  return Math.max(left, right) + 1;
};

var maxDepth = function (root) {
  let res = 0;

  // 遍历二叉树
  var traverse = function (root, depth) {
    if (root === null) {
      return;
    }

    // 前序遍历位置 // 遍历的过程中记录最大深度
    res = Math.max(res, depth);
    traverse(root.left, depth + 1);
    traverse(root.right, depth + 1);
  };

  traverse(root, 1);
  return res;
};

// **** 解法二，动态规划思路 ****
var maxDepthDP = function (root) {
  // 定义：输入一个节点，返回以该节点为根的二叉树的最大深度
  if (root === null) {
    return 0;
  }
  let leftMax = maxDepthDP(root.left);
  let rightMax = maxDepthDP(root.right);
  // 根据左右子树的最大深度推出原二叉树的最大深度
  return 1 + Math.max(leftMax, rightMax);
};