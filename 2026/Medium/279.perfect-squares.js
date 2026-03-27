/*
 * @lc app=leetcode id=279 lang=javascript
 *
 * [279] Perfect Squares
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string[]}
 */
/* Dynamic Programming */
var binaryTreePaths = function (n) {
  let dp = new Array(n + 1).fill(Number.MAX_VALUE);
  // bottom case
  dp[0] = 0;

  // pre-calculate the square numbers.
  let max_square_index = parseInt(Math.sqrt(n)) + 1;

  let square_nums = new Array(max_square_index).fill(0);

  // 从一开始 [0,1,4,9]
  for (let i = 1; i < max_square_index; ++i) {
    square_nums[i] = i * i;
  }

  for (let i = 1; i <= n; ++i) {
    for (let s = 1; s < max_square_index; ++s) {
      if (i < square_nums[s]) break;
      dp[i] = Math.min(dp[i], dp[i - square_nums[s]] + 1);
    }
  }
  return dp[n];
};
// @lc code=end
