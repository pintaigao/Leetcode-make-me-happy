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

  var index = -1,
    head = 0,
    tail = nums.length - 1,
    mid;

  while (head <= tail) {
    mid = Math.floor((head + tail) / 2);
    console.log(`Now mid is: ${mid}`);
    if (nums[mid] === target) {
      index = mid;
      break;
    } else if (
      (nums[head] <= target && target < nums[mid]) ||
      (nums[head] > nums[mid] && (nums[head] <= target || target < nums[mid]))
    ) {
      tail = mid - 1;
    } else {
      head = mid + 1;
    }
  }

  return index;
};

search([4, 5, 6, 7, 0, 1, 2], 0);
// @lc code=end
