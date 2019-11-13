/*
 * @lc app=leetcode id=107 lang=javascript
 *
 * [107] Binary Tree Level Order Traversal II
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
 * @return {number[][]}
 */
// var levelOrderBottom = function (root) {
//   let result = [];
//   if (!root) return result;
//   function helper(root, level) {
//     if (!root) return;
//     helper(root.left, level + 1);
//     helper(root.right, level + 1);
//     if (!result[level]) {
//       result[level] = new Array();
//     }
//     result[level].push(root.val);
//   }

//   helper(root, 0);
//   return result.reverse();
// };


// BFS 来做可能会比较好
var levelOrderBottom = function (root) {
  let result = [];
  if (!root) return result;
  let queue = [root];
  while (queue.length) {
    let size = queue.length;
    let temp = new Array();
    for (let i = 0; i < size; i++) {
      let node = queue.shift();
      temp.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right)
    }
    result.unshift(temp);

  }
  return result;
};

