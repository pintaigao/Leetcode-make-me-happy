/*
 * @lc app=leetcode id=1262 lang=javascript
 *
 * [1262] Greatest Sum Divisible by Three
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

// 人类想不到的方法
var maxSumDivThree = function (nums) {
  let dp = new Array(3).fill(0);
  for (let a of nums) {
    let temp_dp = dp.slice();
    for (let e of temp_dp) {
      dp[(e + a) % 3] = Math.max(dp[(e + a) % 3], e + a);
    }
  }

  return dp[0];
};
// @lc code=end
