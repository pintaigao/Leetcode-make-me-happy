/*
 * @lc app=leetcode id=503 lang=javascript
 *
 * [503] Next Greater Element II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
/* Solution 1: Stack */
/* 共识：如果两遍循环后都还没有找出来，就不用再找了 */
var nextGreaterElements = function (nums) {
  let n = nums.length;
  let res = new Array(nums.length).fill(-1);
  let stack = [];

  // Stack 里面放入的是暂时没有遇到比它们大的元素的index
  for (let i = 0; i < n * 2 - 1; i++) {
    while (stack.length && nums[stack[stack.length - 1]] < nums[i % n]) {
      res[stack[stack.length - 1]] = nums[i % n];
      stack.pop();
    }
    stack.push(i % n);
  }

  return res;
};
// @lc code=end
