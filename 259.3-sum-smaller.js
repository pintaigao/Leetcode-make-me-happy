/*
 * @lc app=leetcode id=259 lang=javascript
 *
 * [259] 3Sum Smaller
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumSmaller = function (nums, target) {
  let result = 0;
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length; i++) {
    let j = i + 1;
    let k = nums.length - 1;
    while (j < k) {
      if (nums[i] + nums[j] + nums[k] < target) {
        result += k - j;
        j++;
      } else {
        k--;
      }
    }
  }
  return result;
};
// @lc code=end
