/*
 * @lc app=leetcode id=897 lang=javascript
 *
 * [897] Increasing Order Search Tree
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
 * @return {TreeNode}
 */
var increasingBST = function (root) {
  let nodes = []
  dfs(root)
  let treeNode = new TreeNode(0)
  let current = treeNode
  for (let i = 0; i < nodes.length; i++) {
    current.right = new TreeNode(nodes[i])
    current = current.right
  }
  return treeNode.right

  function dfs(root) {
    if (root != null) {
      dfs(root.left)
      nodes.push(root.val)
      dfs(root.right)
    }
  }
};

