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

// BFS Stack的方法 O(n) O(n)
var sumOfLeftLeaves = function (root) {
  let isLeaf = function (node) {
    return node != null && node.left == null && node.right == null;
  };

  if (root == null) {
    return 0;
  }

  let total = 0;
  let stack = [];
  stack.unshift(root);

  while (stack.length) {
    let subRoot = stack.shift();
    // Check if the left node is a leaf node.
    if (isLeaf(subRoot.left)) {
      total += subRoot.left.val;
    }
    // If the right node exists, put it on the stack.
    if (subRoot.right != null) {
      stack.unshift(subRoot.right);
    }
    // If the left node exists, put it on the stack.
    if (subRoot.left != null) {
      stack.unshift(subRoot.left);
    }
  }

  return total;
};

// Approach 2: Recursive Tree Traversal (Pre-order) O(N) O(N)
let sumOfLeftLeaves2 = function (root) {
  if (root == null) {
    return 0;
  }

  let processSubtree = function (subtree, isLeft) {
    // Base case: This is a leaf node.
    if (subtree.left == null && subtree.right == null) {
      return isLeft ? subtree.val : 0;
    }

    // Recursive case: We need to add and return the results of the
    // left and right subtrees.
    let total = 0;
    if (subtree.left != null) {
      total += processSubtree(subtree.left, true);
    }
    if (subtree.right != null) {
      total += processSubtree(subtree.right, false);
    }
    return total;
  };

  return processSubtree(root, false);
};
// @lc code=end
