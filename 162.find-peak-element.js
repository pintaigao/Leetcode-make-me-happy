/*
 * @lc app=leetcode id=162 lang=javascript
 *
 * [162] Find Peak Element
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
/* Binary Search */
var findPeakElement = function (nums) {
  let left = 0,
    right = nums.length - 1;
  while (left < right) {
    let mid = left + (right - left) / 2;
    if (nums[mid] > nums[mid + 1]) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left;
};
// @lc code=end
