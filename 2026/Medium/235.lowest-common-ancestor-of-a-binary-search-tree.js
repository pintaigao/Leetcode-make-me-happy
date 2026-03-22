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
// @lc code=end
