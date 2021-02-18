/*
 * @lc app=leetcode id=113 lang=javascript
 *
 * [113] Path Sum II
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
 * @param {number} sum
 * @return {number[][]}
 */

// Depth First Traversal | Recursion (BFS的方法不好)
const pathSum = (root, sum) => {
  const ret = [];
  const temp = [];

  const findPath = (root, sum) => {
    if (root === null) {
      return;
    }

    temp.push(root.val);

    if (root.left === null && root.right === null && root.val === sum) {
      ret.push(temp.slice());
    } else {
      findPath(root.left, sum - root.val);
      findPath(root.right, sum - root.val);
    }

    temp.pop();
  };

  findPath(root, sum);
  return ret;
};
