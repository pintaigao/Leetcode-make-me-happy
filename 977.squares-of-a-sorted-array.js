/*
 * @lc app=leetcode id=977 lang=javascript
 *
 * [977] Squares of a Sorted Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */

// 最简单的Sort
var sortedSquares = function (nums) {
  let ans = [];
  for (let i = 0; i < nums.length; i++) {
    ans[i] = nums[i] * nums[i];
  }
  return ans.sort((a, b) => a - b);
};

// Two Pointers 一个在指在数组前面，一个指在在数组后面
var sortedSquares = function (nums) {
  let res = [];
  let i = 0;
  let j = nums.length - 1;
  while (i <= j) {
    // 大的先放进去
    if (Math.abs(nums[i]) > Math.abs(nums[j])) {
      res.unshift(nums[i] * nums[i]);
      i++;
    } else {
      res.unshift(nums[j] * nums[j]);
      j--;
    }
  }
  return res;
};
// @lc code=end
