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
/* Set的方法 */
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

/* 按题意的方法 */
var findDuplicates = function (nums) {
  let ans = [];
  // loop每一个数字，数字所对应的index上的数字转换为负数，但如果这个位置的数字已经是负数了，说明重复了
  for (let num of nums) {
    if (nums[Math.abs(num) - 1] < 0) {
      // seen before
      ans.push(Math.abs(num));
    }
    nums[Math.abs(num) - 1] *= -1;
  }

  return ans;
};
// @lc code=end
