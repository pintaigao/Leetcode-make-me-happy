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
  // 如果target node有node.right，那么比他大的一定是他的右边子树最左边的那个
  if (node.right != null) {
    node = node.right;
    while (node.left != null) node = node.left;
    return node;
  }

  // 如果上面没有找到 ，比他大的在upper，先看看node.parent，如果它是它parent的右边，说明它的parent比它小，否则它parent比它大，向上找，
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
