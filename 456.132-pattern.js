/*
 * @lc app=leetcode id=456 lang=javascript
 *
 * [456] 132 Pattern
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var find132pattern = function (nums) {
  const stack = [];
  const n = nums.length;
  let k = Number.NEGATIVE_INFINITY;

  for (let i = n - 1; i >= 0; --i) {
    if (nums[i] < k) {
      return true;
    }
    while (stack && stack[stack.length - 1] < nums[i]) {
      k = Math.max(k, stack.pop());
    }
    stack.push(nums[i]);
  }

  return false;
};
// @lc code=end
