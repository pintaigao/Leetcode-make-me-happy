/*
 * @lc app=leetcode id=724 lang=javascript
 *
 * [724] Find Pivot Index
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

// 1. Prefix Sum
var pivotIndex = function (nums) {
  let sum = 0,
    leftsum = 0;
  for (let x of nums) sum += x;

  for (let i = 0; i < nums.length; ++i) {
    if (leftsum == sum - leftsum - nums[i]) return i;
    leftsum += nums[i];
  }
  return -1;
};
// @lc code=end
