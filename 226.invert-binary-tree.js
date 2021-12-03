/*
 * @lc app=leetcode id=226 lang=javascript
 *
 * [226] Invert Binary Tree
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
 * @return {TreeNode}
 */

// 1. DFS Solution
var invertTree = function (root) {
  if (!root) {
    return root;
  }

  helper(root);
  return root;
};

let helper = function (root) {
  if (!root) {
    return;
  }
  helper(root.left);
  helper(root.right);
  let left = root.left;
  let right = root.right;
  root.left = right;
  root.right = left;
};

// 2. Queue BFS Solution
let invertTree2 = function (root) {
  if (!root) {
    return null;
  }

  let queue = [];
  queue.push(root);

  while (queue.length) {
    let node = queue.shift();
    let left = node.left;
    node.left = node.right;
    node.right = left;

    if (node.left != null) {
      queue.push(node.left);
    }
    if (node.right != null) {
      queue.push(node.right);
    }
  }
  return root;
};

// 3. Stack Solution
let invertTree3 = function (root) {
  if (!root) {
    return null;
  }

  let stack = [];
  stack.push(root);

  while (stack.length) {
    let node = stack.pop();
    let left = node.left;
    node.left = node.right;
    node.right = left;

    if (node.left != null) {
      stack.push(node.left);
    }
    if (node.right != null) {
      stack.push(node.right);
    }
  }
  return root;
};
