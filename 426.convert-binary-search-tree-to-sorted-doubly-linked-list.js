/*
 * @lc app=leetcode id=426 lang=javascript
 *
 * [426] Convert Binary Search Tree to Sorted Doubly Linked List
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, left, right) {
 *      this.val = val;
 *      this.left = left;
 *      this.right = right;
 *  };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
var treeToDoublyList = function (root) {
  // the smallest (first) and the largest (last) nodes
  let first = null;
  let last = null;

  let helper = function (node) {
    if (node != null) {
      // left
      helper(node.left);
      // node
      if (last != null) {
        // link the previous node (last)
        // with the current one (node)
        last.right = node;
        node.left = last;
      } else {
        // keep the smallest node
        // to close DLL later on
        first = node;
      }
      last = node;
      // right
      helper(node.right);
    }
  };

  if (root == null) return null;

  helper(root);
  // close DLL
  last.right = first;
  first.left = last;
  return first;
};
