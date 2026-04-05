/*
 * @lc app=leetcode id=209 lang=javascript
 *
 * [209] Minimum Size Subarray Sum
 */

// @lc code=start
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  let left = 0, sum = 0, min = nums.length + 1;

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    while (sum >= target) {
      min = Math.min(min, right - left + 1);
      sum -= nums[left];
      left += 1;
    }
  }

  return min === nums.length + 1 ? 0 : min;
};
// @lc code=end

// 练习
var minSubArrayLen = function (target, nums) {
  let left = 0, right = 0, length = Number.MAX_SAFE_INTEGER, sum = 0;
  while (right < nums.length) {
    sum += nums[right];

    while (sum >= target) {
      length = Math.min(length, right - left + 1);
      sum -= nums[left];
      left += 1;
    }
    right += 1;
  }

  return length === Number.MAX_SAFE_INTEGER ? 0 : length;
}