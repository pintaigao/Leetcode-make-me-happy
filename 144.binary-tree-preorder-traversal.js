/*
 * @lc app=leetcode id=144 lang=javascript
 *
 * [144] Binary Tree Preorder Traversal
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
 * @return {number[]}
 */
var preorderTraversal = function(root) {
    let stack = new Array();
    let result = new Array();
    if(!root) {
      return result;
    }

    stack.push(root);

    while(stack.length) {
      let node = stack.pop();
      result.unshift(node.val);
      if(node.right){
        stack.push(node.right);
      }

      if(node.left){
        stack.push(node.left);
      }
    }

    return result;
};

