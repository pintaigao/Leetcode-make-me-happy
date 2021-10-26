/*
 * @lc app=leetcode id=35 lang=javascript
 *
 * [35] Search Insert Position
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

// Binary Search O(logN) O(1)
var searchInsert = function (nums, target) {
  let pivot,
    left = 0,
    right = nums.length - 1;
  while (left <= right) {
    pivot = left + parseInt((right - left) / 2);
    if (nums[pivot] == target) return pivot;
    if (target < nums[pivot]) right = pivot - 1;
    else left = pivot + 1;
  }

  return left;
};
// @lc code=end
