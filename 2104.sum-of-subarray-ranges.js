/*
 * @lc app=leetcode id=2104 lang=javascript
 *
 * [2104] Sum of Subarray Ranges
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
/* 枚举 */
var subArrayRanges = function (nums) {
  let n = nums.length;
  let ans = 0;
  for (let i = 0; i < n; i++) {
    let [min, max] = [nums[i], nums[i]];
    for (let j = i + 1; j < n; j++) {
      min = Math.min(min, nums[j]);
      max = Math.max(max, nums[j]);
      ans += max - min;
    }
  }
  return ans;
};

/* 单调栈 */
var subArrayRanges = function (nums) {
  const n = nums.length;
  let stack = new Array(),
    ans = 0n;
  for (let i = 0; i <= n; i++) {
    while (stack.length > 0 && (i == n || nums[stack[stack.length - 1]] < nums[i])) {
      const j = BigInt(stack.pop());
      ans += BigInt(nums[j]) * (BigInt(i) - j) * (j - (stack.length > 0 ? BigInt(stack[stack.length - 1]) : -1n));
    }
    stack.push(i);
  }
  stack = new Array();
  for (let i = 0; i <= n; i++) {
    while (stack.length > 0 && (i == n || nums[stack[stack.length - 1]] > nums[i])) {
      const j = BigInt(stack.pop());
      ans -= BigInt(nums[j]) * (BigInt(i) - j) * (j - (stack.length > 0 ? BigInt(stack[stack.length - 1]) : -1n));
    }
    stack.push(i);
  }
  return ans;
};

// @lc code=end
