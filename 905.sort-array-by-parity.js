/*
 * @lc app=leetcode id=905 lang=javascript
 *
 * [905] Sort Array By Parity
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArrayByParity = function (A) {
  // mod后值小的在前面，也就是等于0的在前面
  A.sort((a, b) => {
    return (a % 2) - (b % 2);
  });

  return A;
};
// @lc code=end
