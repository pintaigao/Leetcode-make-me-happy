/*
 * @lc app=leetcode id=95 lang=javascript
 *
 * [95] Unique Binary Search Trees II
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function (n) {
  if (n === 0) { return []; }
  //     recursion:
  // takeing in?
  //     output:array of trees, each sub array has a tree.
  let matrix = Array.from({ length: n + 2 }).map((arr) => new Array(n + 2));
  function connectingTrees(start, end) {
    if (matrix[start][end]) { return matrix[start][end]; }
    let subtrees = [];
    if (start > end) {
      matrix[start][end] = [null];
      return [null];
    }
    if (start === end) {
      matrix[start][end] = [new TreeNode(start)];
      return matrix[start][end];
    }
    for (let i = start; i <= end; i++) {
      let leftArr = connectingTrees(start, i - 1);
      let rightArr = connectingTrees(i + 1, end);
      for (let ele of leftArr) {
        for (let node of rightArr) {
          let root = new TreeNode(i);
          root.left = ele;
          root.right = node;
          subtrees.push(root);
        }
      }
    }
    matrix[start][end] = subtrees;
    return subtrees;
  }
  return connectingTrees(1, n);
}
