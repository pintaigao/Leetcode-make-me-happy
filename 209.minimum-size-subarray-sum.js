/*
 * @lc app=leetcode id=209 lang=javascript
 *
 * [209] Minimum Size Subarray Sum
 */
/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(s, nums) {
  let left = 0;
  let sum = 0;
  let min = Infinity;
  
  for (let right = 0; right < nums.length; right++) {
      sum += nums[right];
      while (sum >= s) {
          min = Math.min(min, right + 1 - left);
          sum -= nums[left];
          left++;
      }
  }
  
  return (min === Infinity) ? 0 : min;
};

