/*
 * @lc app=leetcode id=1413 lang=javascript
 *
 * [1413] Minimum Value to Get Positive Step by Step Sum
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

/* Solution 1 */
/* 
1.利用一次循环找到数组中连续元素的和的最小值
2.判断和的最小值的正负:
如果是正数,说明不管怎么加都不会小于1
如果是负数,返回其相反数+1. 
*/
var minStartValue = function (nums) {
  let sum = 0,
    min = Number.MIN_VALUE;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    min = Math.min(min, sum);
  }

  if (min > 0) return 1;
  return 1 - min;
};
// @lc code=end
