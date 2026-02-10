/*
 * @lc app=leetcode id=704 lang=javascript
 *
 * [704] Binary Search
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let [mid, left, right] = [0, 0, nums.length - 1];
  while (left <= right) {
    mid = left + parseInt((right - left) / 2);
    if (nums[mid] == target) return mid;
    if (target < nums[mid]) right = mid - 1;
    else left = mid + 1;
  }
  return -1;
};
// @lc code=end
