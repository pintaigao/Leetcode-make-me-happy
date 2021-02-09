/*
 * @lc app=leetcode id=279 lang=javascript
 *
 * [279] Perfect Squares
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */

// 1. DP
var numSquares = function (n) {
  let dp = new Array(n + 1).fill(Number.MAX_VALUE);
  // bottom case
  dp[0] = 0;

  // pre-calculate the square numbers.
  let max_square_index = parseInt(Math.sqrt(n)) + 1;

  let square_nums = new Array(max_square_index).fill(0);

  // 从一开始
  for (let i = 1; i < max_square_index; ++i) {
    square_nums[i] = i * i;
  }

  console.log(square_nums);

  for (let i = 1; i <= n; ++i) {
    for (let s = 1; s < max_square_index; ++s) {
      if (i < square_nums[s]) break;
      dp[i] = Math.min(dp[i], dp[i - square_nums[s]] + 1);
    }
  }
  console.log(dp);
  return dp[n];
};

numSquares(12);
// @lc code=end
