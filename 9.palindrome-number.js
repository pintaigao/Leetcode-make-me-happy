/*
 * @lc app=leetcode id=9 lang=javascript
 *
 * [9] Palindrome Number
 */

// @lc code=start
/**
 * @param {number} x
 * @return {boolean}
 */
/* 一：数学的方法 */
var isPalindrome = function (x) {
  //边界判断
  if (x < 0) return false;
  let div = 1;
  //
  while (x / div >= 10) div *= 10;
  while (x > 0) {
    let left = x / div;
    let right = x % 10;
    if (left != right) return false;
    x = (x % div) / 10;
    div /= 100;
  }
  return true;
};
// @lc code=end
