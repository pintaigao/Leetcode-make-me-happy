/*
 * @lc app=leetcode id=300 lang=javascript
 *
 * [300] Longest Increasing Subsequence
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  if (nums.length == 0) {
    return 0;
  }
  let dp = new Array(nums.length);
  dp[0] = 1;
  let maxans = 1;
  for (let i = 1; i < dp.length; i++) {
    let maxval = 0;
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        maxval = Math.max(maxval, dp[j]);
      }
    }
    dp[i] = maxval + 1;
    maxans = Math.max(maxans, dp[i]);
    console.log("For now dp array is: " + `[${dp}]`);
    console.log("Max value is:" + maxans);
  }
  return maxans;
};
// @lc code=end

lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]);
