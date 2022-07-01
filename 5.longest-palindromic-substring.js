/*
 * @lc app=leetcode id=5 lang=javascript
 *
 * [5] Longest Palindromic Substring
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (str) {
  function helper(start, end) {
    while (start >= 0 && end < str.length && str[start] == str[end]) {
      start--;
      end++;
    }
    if (maxLen < end - start - 1) {
      lo = start + 1;
      maxLen = end - start - 1;
    }
  }

  let [lo, maxLen] = [0, 0];
  if (str.length < 2) return str;
  for (let i = 0; i < str.length - 1; i++) {
    helper(i, i);
    helper(i, i + 1);
  }

  return str.substring(lo, lo + maxLen);
};
// @lc code=end
