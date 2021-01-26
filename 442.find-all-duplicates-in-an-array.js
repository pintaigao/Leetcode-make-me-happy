/*
 * @lc app=leetcode id=442 lang=javascript
 *
 * [442] Find All Duplicates in an Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDuplicates = function (nums) {
  let ans = [];
  for (let num of nums) {
    if (nums[Math.abs(num) - 1] < 0) {
      // seen before
      ans.push(Math.abs(num));
    }
    nums[Math.abs(num) - 1] *= -1;
  }

  return ans;
};

// Using Map
var findDuplicates = function (nums) {
  let ans = [];
  let seen = new Set();

  for (let num of nums) {
    if (seen.has(num)) {
      ans.push(num);
    } else {
      seen.add(num);
    }
  }

  return ans;
};

// @lc code=end
