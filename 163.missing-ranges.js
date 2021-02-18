/*
 * @lc app=leetcode id=163 lang=javascript
 *
 * [163] Missing Ranges
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {string[]}
 */
var findMissingRanges = function (nums, lower, upper) {
  let n = nums.length;

  if (n == 0) {
    return [formatRange(lower, upper)];
  }

  let missingRanges = [];

  // Edge case 1) Missing ranges at the beginning
  if (nums[0] > lower) {
    missingRanges.push(formatRange(lower, nums[0] - 1));
  }

  // Missing ranges between array elements
  for (let i = 1; i < n; ++i) {
    if (nums[i] - nums[i - 1] > 1) {
      missingRanges.push(formatRange(nums[i - 1] + 1, nums[i] - 1));
    }
  }

  // Edge case 2) Missing ranges at the end
  if (nums[n - 1] < upper) {
    missingRanges.push(formatRange(nums[n - 1] + 1, upper));
  }

  return missingRanges;
};

// formats range in the requested format
let formatRange = function (lower, upper) {
  if (lower == upper) {
    return lower + "";
  } else {
    return lower + "->" + upper;
  }
};
// @lc code=end
