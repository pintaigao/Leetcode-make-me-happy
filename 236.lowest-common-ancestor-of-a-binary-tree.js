/*
 * @lc app=leetcode id=236 lang=javascript
 *
 * [236] Lowest Common Ancestor of a Binary Tree
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
// Approach 1: Recursive Approach O(N)
function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;
  var resL = lowestCommonAncestor(root.left, p, q);
  var resR = lowestCommonAncestor(root.right, p, q);
  return resL && resR ? root : resL || resR;
}

// Approach 2: Iterative using parent pointers

let lowestCommonAncestor2 = function (root, p, q) {
  // Stack for tree traversal
  let stack = [];

  // HashMap for parent pointers
  let parent = {};

  parent[root] = null;
  stack.unshift(root);

  // Iterate until we find both the nodes p and q
  while (!parent.hasOwnProperty(p) || !parent.hasOwnProperty(q)) {
    let node = stack.shift();

    // While traversing the tree, keep saving the parent pointers.
    if (node.left != null) {
      parent[node.left] = node;
      stack.unshift(node.left);
    }
    if (node.right != null) {
      parent[node.right] = node;
      stack.unshift(node.right);
    }
  }

  // Ancestors set() for node p.
  let ancestors = new Set();

  // Process all ancestors for node p using parent pointers.
  while (p != null) {
    ancestors.add(p);
    p = parent[p];
  }

  // The first ancestor of q which appears in
  // p's ancestor set() is their lowest common ancestor.
  while (!ancestors.has(q)) q = parent[q];
  return q;
};
