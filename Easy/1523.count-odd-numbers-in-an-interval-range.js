/*
 * @lc app=leetcode id=1523 lang=javascript
 *
 * [1523] Count Odd Numbers in an Interval Range
 */

// @lc code=start
/**
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var countOdds = function (low, high) {
  return Math.floor(high / 2) - Math.floor(low / 2) + (high % 2);
};
// @lc code=end
