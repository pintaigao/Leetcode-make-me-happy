/*
 * @lc app=leetcode id=171 lang=javascript
 *
 * [171] Excel Sheet Column Number
 */

// @lc code=start
/**
 * @param {string} columnTitle
 * @return {number}
 */
var titleToNumber = function (columnTitle) {
  let result = 0;
  let n = s.length;
  for (let i = 0; i < n; i++) {
    result = result * 26;
    // In Java, subtracting characters is subtracting ASCII values of characters
    result += s.charCodeAt(i) - "A".charCodeAt(0) + 1;
  }
  return result;
};
// @lc code=end
