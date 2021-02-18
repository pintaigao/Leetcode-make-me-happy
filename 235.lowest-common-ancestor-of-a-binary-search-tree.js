/*
 * @lc app=leetcode id=235 lang=javascript
 *
 * [235] Lowest Common Ancestor of a Binary Search Tree
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

// Approach 1: Recursive Approach
var lowestCommonAncestor = function (root, p, q) {
  // Value of current node or parent node.
  let parentVal = root.val;

  // Value of p
  let pVal = p.val;

  // Value of q;
  let qVal = q.val;

  if (pVal > parentVal && qVal > parentVal) {
    // If both p and q are greater than parent
    return lowestCommonAncestor(root.right, p, q);
  } else if (pVal < parentVal && qVal < parentVal) {
    // If both p and q are lesser than parent
    return lowestCommonAncestor(root.left, p, q);
  } else {
    // We have found the split point, i.e. the LCA node.
    return root;
  }
};

// Approach 2: Iterative Approach
var lowestCommonAncestor2 = function (root, p, q) {
  // Value of p
  let pVal = p.val;

  // Value of q;
  let qVal = q.val;

  // Start from the root node of the tree
  let node = root;

  // Traverse the tree
  while (node != null) {
    // Value of ancestor/parent node.
    let parentVal = node.val;

    if (pVal > parentVal && qVal > parentVal) {
      // If both p and q are greater than parent
      node = node.right;
    } else if (pVal < parentVal && qVal < parentVal) {
      // If both p and q are lesser than parent
      node = node.left;
    } else {
      // We have found the split point, i.e. the LCA node.
      return node;
    }
  }
  return null;
};
// @lc code=end
