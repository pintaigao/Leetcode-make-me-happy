/*
 * @lc app=leetcode id=1413 lang=javascript
 *
 * [1413] Minimum Value to Get Positive Step by Step Sum
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var minStartValue = function (nums) {
  let sums = [nums[0]],
    min = nums[0];
  for (let i = 1; i < nums.length; i++) {
    sums[i] = nums[i] + sums[i - 1];
    if (sums[i] < min) min = sums[i];
  }

  if (min > 0) return 1;
  return 1 - min;
};
// @lc code=end
