/*
 * @lc app=leetcode id=485 lang=javascript
 *
 * [485] Max Consecutive Ones
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function (nums) {
  let count = 0;
  let maxCount = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] == 1) {
      // Increment the count of 1's by one.
      count += 1;
    } else {
      // Find the maximum till now.
      maxCount = Math.max(maxCount, count);
      // Reset count of 1.
      count = 0;
    }
  }
  return Math.max(maxCount, count);
};
// @lc code=end
