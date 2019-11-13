/*
 * @lc app=leetcode id=559 lang=javascript
 *
 * [559] Maximum Depth of N-ary Tree
 */
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */
/**
 * @param {Node} root
 * @return {number}
 */
var maxDepth = function (root) {
  let res = 0;
  if (!root) {
    return res;
  }
  

  let dfs = (root, depth)  => {
    if (root == null) {
      return;
    }
    res = Math.max(res, ++depth);
    for (let i = 0; i < root.children.length; i++) {
      dfs(root.children[i], depth);
    }
  }

  dfs(root, 0);

  return res;
};




