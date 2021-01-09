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
var isPalindrome = function (x) {
  if (x == 0) {
    return true;
  }
  if (x < 0 || x % 10 == 0) return false;

  let temp = 0;
  let preX = x;
  while (x > temp) {
    let pop = x % 10;
    preX = x;
    x = parseInt(x / 10);

    temp = temp * 10 + pop;
  }
  if (x == temp || preX == temp) return true;
  else return false;
};
// @lc code=end
