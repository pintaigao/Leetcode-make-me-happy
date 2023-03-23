/*
 * @lc app=leetcode id=120 lang=javascript
 *
 * [120] Triangle
 */

// @lc code=start
/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {
  let maxReach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i <= maxReach) {
      maxReach = Math.max(maxReach, i + nums[i]);
    }
    if (maxReach >= nums.length - 1) {
      return true;
    }
  }
  return false;
};
// @lc code=end

