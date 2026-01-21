/*
 * @lc app=leetcode id=360 lang=javascript
 *
 * [360] Sort Transformed Array
 */
/**
 * @param {number[]} nums
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {number[]}
 */
var sortTransformedArray = function (nums, a, b, c) {
  let i = 0;
  let j = nums.length - 1;
  let result = [];
  let index = a >= 0 ? nums.length - 1 : 0
  quad = (x, a, b, c) => {
    return a * x * x + b * x + c;
  }
  
  while (i <= j) {
    if (a >= 0) {
      result[index--] = quad(nums[i], a, b, c) >= quad(nums[j], a, b, c) ? quad(nums[i++], a, b, c) : quad(nums[j--], a, b, c);
    } else {
      result[index++] = quad(nums[i], a, b, c) >= quad(nums[j], a, b, c) ? quad(nums[j--], a, b, c) : quad(nums[i++], a, b, c);
    }
  }
  return result;
};

