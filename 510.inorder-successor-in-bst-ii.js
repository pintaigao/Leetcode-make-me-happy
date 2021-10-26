/*
 * @lc app=leetcode id=510 lang=javascript
 *
 * [510] Inorder Successor in BST II
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val) {
 *    this.val = val;
 *    this.left = null;
 *    this.right = null;
 *    this.parent = null;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
var inorderSuccessor = function (node) {
  if (node.right != null) {
    node = node.right;
    while (node.left != null) node = node.left;
    return node;
  }

  // the successor is somewhere upper in the tree
  while (node.parent != null && node == node.parent.right) node = node.parent;
  return node.parent;
};

// 另外 recursive 的方法
let inorderSuccessor2 = function (node) {
  function goDown(node) {
    if (!node || !node.left) return node;
    return goDown(node.left);
  }

  function goUp(node, val) {
    if (!node) return null;
    if (node.val > val) return node;
    return goUp(node.parent, val);
  }
  if (node.right) return goDown(node.right);
  return goUp(node.parent, node.val);
};

// @lc code=end
