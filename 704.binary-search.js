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

// Solution: Binary Search O(logN)
var search = function (nums, target) {
  let pivot,
    left = 0,
    right = nums.length - 1;
  while (left <= right) {
    pivot = left + parseInt((right - left) / 2);
    if (nums[pivot] == target) return pivot;
    if (target < nums[pivot]) right = pivot - 1;
    else left = pivot + 1;
  }
  return -1;
};
// @lc code=end
