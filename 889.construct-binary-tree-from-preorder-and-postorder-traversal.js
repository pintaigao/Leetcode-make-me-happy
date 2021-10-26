/*
 * @lc app=leetcode id=889 lang=javascript
 *
 * [889] Construct Binary Tree from Preorder and Postorder Traversal
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} pre
 * @param {number[]} post
 * @return {TreeNode}
 */

var constructFromPrePost = function (pre, post) {
  let preIndex = 0,
    posIndex = 0;

  let helper = function () {
    let root = new TreeNode(pre[preIndex]);
    preIndex += 1;
    if (root.val != post[posIndex]) root.left = helper();
    if (root.val != post[posIndex]) root.right = helper();
    posIndex += 1;
    return root;
  };

  return helper();
};
// @lc code=end
