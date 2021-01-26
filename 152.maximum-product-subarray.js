/*
 * @lc app=leetcode id=152 lang=javascript
 *
 * [152] Maximum Product Subarray
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  if (nums.length == 0) return 0;

  let max_so_far = nums[0];
  let min_so_far = nums[0];
  let result = max_so_far;

  for (let i = 1; i < nums.length; i++) {
    let curr = nums[i];
    let temp_max = Math.max(
      curr,
      Math.max(max_so_far * curr, min_so_far * curr)
    );
    min_so_far = Math.min(curr, Math.min(max_so_far * curr, min_so_far * curr));

    max_so_far = temp_max;

    result = Math.max(max_so_far, result);
  }

  return result;
};
// @lc code=end

maxProduct([2, 3, -2, 4]);
