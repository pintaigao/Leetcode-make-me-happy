/*
 * @lc app=leetcode id=259 lang=javascript
 *
 * [259] 3Sum Smaller
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

// Approach #3 (Two Pointers) O(n^2) O(1)
var threeSumSmaller = function (nums, target) {
  let result = 0;
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length; i++) {
    let j = i + 1;
    let k = nums.length - 1;
    while (j < k) {
      if (nums[i] + nums[j] + nums[k] < target) {
        result = result + k - j;
        // console.log(i + ' ' + result);
        j++;
      } else {
        k--;
      }
    }
  }
  return result;
};
