/*
 * @lc app=leetcode id=168 lang=javascript
 *
 * [168] Excel Sheet Column Title
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string}
 */
var convertToTitle = function (n) {
  if (n < 27) {
    return String.fromCharCode(((n - 1) % 26) + 65);
  }
  return (
    convertToTitle(Math.floor((n - 1) / 26)) +
    String.fromCharCode(((n - 1) % 26) + 65)
  );
};
// @lc code=end
