/*
 * @lc app=leetcode id=513 lang=javascript
 *
 * [513] Find Bottom Left Tree Value
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
 * @return {number}
 */
var findBottomLeftValue = function (root) {
  let temp = {
    max: 1,
    leftbottom: root.val
  };
  return helper(root, 1, temp);
};

var helper = function (root, level, temp) {
  if (temp.max < level) {
    temp.max = level;
    temp.leftbottom = root.val;
  }

  if (root.left) {
    helper(root.left, level + 1, temp);
  }
  if (root.right) {
    helper(root.right, level + 1, temp);
  }

  return temp.leftbottom;
};

