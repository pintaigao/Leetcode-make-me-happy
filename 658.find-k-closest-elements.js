/*
 * @lc app=leetcode id=658 lang=javascript
 *
 * [658] Find K Closest Elements
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
var findClosestElements = function (arr, k, x) {
  let left = 0,
    right = arr.length - k;
  while (left < right) {
    let mid = parseInt((left + right) / 2);
    if (x - arr[mid] > arr[mid + k] - x) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  let result = arr.slice(left, left + k);
  return result;
};

findClosestElements([1, 2, 3, 4, 5], 4, 3);
// @lc code=end
