/*
 * @lc app=leetcode id=366 lang=javascript
 *
 * [366] Find Leaves of Binary Tree
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
const findLeaves=(root)=> {
  let res = [];
  dfs(root, res);
  return res; 
}
const dfs=(node, res)=>{
  if(node === null)  return -1;
  let level = Math.max(dfs(node.left, res), dfs(node.right, res)) + 1;
  if(!res[level])  res.push([]);
  res[level].push(node.val);
  return level;
}
