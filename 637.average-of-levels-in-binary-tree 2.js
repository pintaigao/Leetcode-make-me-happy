/*
 * @lc app=leetcode id=637 lang=javascript
 *
 * [637] Average of Levels in Binary Tree
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
var averageOfLevels = function(root) {
  let result = [];
  if (!root) return result;
  let queue = [root];
  while (queue.length) {
    let size = queue.length;
    let sum = 0;
    for (let i = 0; i < size; i++) {
      let node = queue.shift();
      sum += node.val
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right)
    }

    let average = sum/size;
    result.push(average);

  }
  return result; 
};

