/*
 * @lc app=leetcode id=167 lang=javascript
 *
 * [167] Two Sum II - Input array is sorted
 */

// @lc code=start
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
  let low = 0,
    high = numbers.length - 1;
  while (low < high) {
    let sum = numbers[low] + numbers[high];
    if (sum == target) {
      return [low + 1, high + 1];
    } else if (sum < target) {
      low += 1;
    } else {
      high -= 1;
    }
  }
  return [-1, -1];
};
// @lc code=end
