/*
 * @lc app=leetcode id=404 lang=javascript
 *
 * [404] Sum of Left Leaves
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

/* BFS的方法 */
var sumOfLeftLeaves = function (root) {
  let isLeaf = function (node) {
    return node != null && node.left == null && node.right == null;
  };

  if (root == null) {
    return 0;
  }

  let total = 0;
  let stack = [root];

  while (stack.length) {
    let subRoot = stack.shift();
    // Check if the left node is a leaf node.
    if (isLeaf(subRoot.left)) {
      total += subRoot.left.val;
    }

    // If the left node exists, put it on the stack.
    if (subRoot.left != null) {
      stack.unshift(subRoot.left);
    }

    // If the right node exists, put it on the stack.
    if (subRoot.right != null) {
      stack.unshift(subRoot.right);
    }
  }

  return total;
};

/* 传统的遍历方法 */
var sumOfLeftLeaves = function (root) {
  if (root == null) {
    return 0;
  }

  let total = 0;

  let processSubtree = function (subtree, isLeft) {
    // Base case: This is a leaf node.
    if (subtree.left == null && subtree.right == null) {
      total += isLeft ? subtree.val : 0;
    }

    if (subtree.left != null) {
      processSubtree(subtree.left, true);
    }

    if (subtree.right != null) {
      processSubtree(subtree.right, false);
    }
  };

  processSubtree(root, false);

  return total;
};
// @lc code=end
