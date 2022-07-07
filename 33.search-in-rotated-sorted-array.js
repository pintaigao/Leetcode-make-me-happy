/*
 * @lc app=leetcode id=33 lang=javascript
 *
 * [33] Search in Rotated Sorted Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  if (nums.length === 0) return -1;

  var [head, tail, mid] = [0, nums.length - 1, 0];

  while (head <= tail) {
    mid = parseInt((head + tail) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if ((nums[head] <= target && target < nums[mid]) || (nums[head] > nums[mid] && (nums[head] <= target || target < nums[mid]))) {
      tail = mid - 1;
    } else {
      head = mid + 1;
    }
  }

  return -1;
};
// @lc code=end
