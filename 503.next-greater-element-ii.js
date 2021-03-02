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

// Approach #3 Using Stack
var nextGreaterElements = function (nums) {
  let res = new Array(nums.length).fill(0);
  let stack = [];
  // 为什么是2 * nums.length
  for (let i = 2 * nums.length - 1; i >= 0; --i) {
    console.log(stack);
    while (stack.length !== 0 && nums[stack[0]] <= nums[i % nums.length]) {
      stack.shift();
    }
    res[i % nums.length] = stack.length === 0 ? -1 : nums[stack[0]];
    console.log(res);
    stack.unshift(i % nums.length);
  }

  return res;
};

nextGreaterElements([4, 1, 2, 3]);

// [1,2,1,1,2,1]
// @lc code=end
