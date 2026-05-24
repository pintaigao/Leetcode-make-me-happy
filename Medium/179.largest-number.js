/*
 * @lc app=leetcode id=179 lang=javascript
 *
 * [179] Largest Number
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {string}
 */
var largestNumber = function (nums) {
  // Sort Array, 相邻的两个字符串组合，组合的较大的排在前面
  var sorted = nums.sort(function (a, b) {
    var ab = a.toString() + b.toString();
    var ba = b.toString() + a.toString();
    return ba - ab;
  });

  var joined = sorted.join("");
  if (parseInt(joined) === 0) {
    return "0";
  } else {
    return joined;
  }
};
// @lc code=end
