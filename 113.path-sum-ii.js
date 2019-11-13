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
const findPath = (ret, temp, root, sum) => {
  if (root === null) {
      return;
  }
  
  temp.push(root.val);
  
  if (root.left === null && root.right === null && root.val === sum) {
      ret.push(temp.slice());
  } else {
      findPath(ret, temp, root.left, sum - root.val);
      findPath(ret, temp, root.right, sum - root.val);
  }
  
  temp.pop();
};

const pathSum = (root, sum) => {
  const ret = [];
  findPath(ret, [], root, sum);
  return ret;
};

