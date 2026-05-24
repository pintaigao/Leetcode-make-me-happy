/*
 * @lc app=leetcode id=236 lang=javascript
 *
 * [236] Lowest Common Ancestor of a Binary Tree
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
/* DFS */
var lowestCommonAncestor = function (root, p, q) {
  if (!root || root === p || root === q) return root;
  var resL = lowestCommonAncestor(root.left, p, q);
  var resR = lowestCommonAncestor(root.right, p, q);
  return resL && resR ? root : resL || resR;
};

/* BFS */
let lowestCommonAncestor = function (root, p, q) {
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

// @lc code=end

// DFS
var lowestCommonAncestor = function (root, p, q) {
  // 用一个外部变量来记录是否已经找到 LCA 节点
  let lca = null; // [!code ++]

  let find = function (root, val1, val2) {
    if (root == null) {
      return null;
    }
    // 如果已经找到 LCA 节点，直接返回
    if (lca != null) {
      return null;
    }

    if (root.val == val1 || root.val == val2) {
      return root;
    }
    let left = find(root.left, val1, val2), right = find(root.right, val1, val2);
    if (left != null && right != null) {
      // 当前节点是 LCA 节点，记录下来
      lca = root; // [!code ++]
      return root;
    }

    // 为什么要是 left ！= null 就返回 left 而不是返回 right？为什么不先看 right？
    // 因为：1.上面如果 left和 right 都有，则找到了，返回 lca，
    // 2.有一个没有，说明 left 或者 right 有一个没有
    return left != null ? left : right;
  }

  return find(root, p.val, q.val);
}
