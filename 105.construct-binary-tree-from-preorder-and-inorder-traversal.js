/*
 * @lc app=leetcode id=105 lang=javascript
 *
 * [105] Construct Binary Tree from Preorder and Inorder Traversal
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  function helper(p1, p2, i1, i2) {
    if (p1 > p2 || i1 > i2) return null; // sanity check

    var value = preorder[p1],           // get the root value
      index = inorder.indexOf(value), // get inorder position
      nLeft = index - i1,             // count nodes in left subtree
      root = new TreeNode(value);    // build the root node

    // build the left and right subtrees recursively
    root.left = helper(p1 + 1, p1 + nLeft, i1, index - 1);
    root.right = helper(p1 + nLeft + 1, p2, index + 1, i2);

    return root;
  }

  return helper(0, preorder.length - 1, 0, inorder.length - 1);
};

