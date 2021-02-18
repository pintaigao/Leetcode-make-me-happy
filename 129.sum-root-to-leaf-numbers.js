/*
 * @lc app=leetcode id=129 lang=javascript
 *
 * [129] Sum Root to Leaf Numbers
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

// 这一题有很多的方法
// 1. Approach 1: Iterative Preorder Traversal. BFS, Stack
let sumNumbers = function (root) {
  let rootToLeaf = 0,
    currNumber = 0;
  let stack = [];
  stack.push([root, 0]);

  while (stack.length !== 0) {
    let p = stack.pop();
    root = p[0];
    currNumber = p[1];

    if (root != null) {
      currNumber = currNumber * 10 + root.val;
      // if it's a leaf, update root-to-leaf sum
      if (root.left == null && root.right == null) {
        rootToLeaf += currNumber;
      } else {
        stack.push([root.right, currNumber]);
        stack.push([root.left, currNumber]);
      }
    }
  }
  return rootToLeaf;
};

// 2. Apprroach 2: Recursive Preorder Traversal.
var sumNumbers = function (root) {
  if (!root) {
    return 0;
  }
  let result = dfs(root, 0);

  function dfs(root, value) {
    if (!root.left && !root.right) {
      return value * 10 + root.val;
    }
    let result = 0;
    if (root.left) {
      result += dfs(root.left, value * 10 + root.val);
    }
    if (root.right) {
      result += dfs(root.right, value * 10 + root.val);
    }
    return result;
  }

  return result;
};
