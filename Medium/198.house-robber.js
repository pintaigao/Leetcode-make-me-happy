/*
 * @lc app=leetcode id=198 lang=javascript
 *
 * [198] House Robber
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  // if length 0 or 1
  if (nums.length <= 1) return nums.length == 0 ? 0 : nums[0];

  let dp = [];
  // house0 我们只能rob house0
  dp[0] = nums[0];
  // 对于house1，我们：1.可以选择rob house1，则不能rob house0；2.可以不选择rob house1，而rob house0，至于选择哪一个，则看看rob 哪一个house的收益大
  dp[1] = Math.max(nums[0], nums[1]);

  for (let i = 2; i < nums.length; i++) {
    // 至于从后面开始的房子，有两种方式，rob它和不rob它
    // 如果rob它，则可能的最大值为 它+它前两个
    // 如果不rob它，则可能的最大值为，它的前一个（已经优化为最大值）
    // 所以这个位置的最大值为：上两种方式的比较
    dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
  }

  return dp[dp.length - 1];
};
// @lc code=end

// 练习
var rob10 = function (nums) {
  let result = Array.from({ length: nums.length }, () => new Array(2));

  for (let i = 0; i < nums.length; i++) {
    // base case
    if (i == 0) {
      result[i][0] = 0, result[i][1] = nums[i]
    } else {
      // position 1: no rob, value could be rob or no rob
      result[i][0] = Math.max(result[i - 1][1], result[i - 1][0])
      // position 2: rob
      result[i][1] = result[i - 1][0] + nums[i];
    }
  }

  return Math.max(result[nums.length - 1][0], result[nums.length - 1][1]);
}