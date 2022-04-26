/*
 * @lc app=leetcode id=724 lang=javascript
 *
 * [724] Find Pivot Index
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// 1. Prefix Sum
var pivotIndex = function (nums) {
  let [sum, leftsum] = [0, 0];
  // 求和
  for (let x of nums) sum += x;

  // 循环nums
  for (let i = 0; i < nums.length; ++i) {
    // 如果leftsum == sum - leftsum - nums[i]，说明这个i是pivot
    if (leftsum == sum - leftsum - nums[i]) return i;
    leftsum += nums[i];
  }
  return -1;
};
// @lc code=end
