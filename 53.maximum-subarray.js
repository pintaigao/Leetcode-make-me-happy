/*
 * @lc app=leetcode id=53 lang=javascript
 *
 * [53] Maximum Subarray
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

// Greedy的做法
var maxSubArray = function (nums) {
  let n = nums.length;
  let currSum = nums[0],
    maxSum = nums[0];
  for (let i = 1; i < n; i++) {
    currSum = Math.max(nums[i], currSum + nums[i]);
    maxSum = Math.max(maxSum, currSum);
  }

  return maxSum;
};

// DP 的做法
let maxSubArray2 = function (nums) {
  let n = nums.length,
    maxSum = nums[0];
  for (let i = 1; i < n; ++i) {
    if (nums[i - 1] > 0) nums[i] += nums[i - 1];
    maxSum = Math.max(nums[i], maxSum);
  }
  return maxSum;
};
// @lc code=end
