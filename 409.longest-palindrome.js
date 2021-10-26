/*
 * @lc app=leetcode id=409 lang=javascript
 *
 * [409] Longest Palindrome
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */

// O(n) O(n)
var longestPalindrome = function (s) {
  if (s == null || s.length < 1) return 0;
  let set = new Set();
  for (let i = 0; i < s.length; i++) {
    if (set.has(s[i])) set.delete(s[i]);
    else set.add(s[i]);
  }
  if (set.size <= 1) return s.length;
  return s.length - set.size + 1;
};
// @lc code=end
