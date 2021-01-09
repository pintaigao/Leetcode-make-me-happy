/*
 * @lc app=leetcode id=680 lang=javascript
 *
 * [680] Valid Palindrome II
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function (s) {
  for (let i = 0; i < parseInt(s.length / 2); i++) {
    if (s.charCodeAt(i) != s.charCodeAt(s.length - 1 - i)) {
      let j = s.length - 1 - i;
      return isPalindromeRange(s, i + 1, j) || isPalindromeRange(s, i, j - 1);
    }
  }
  return true;
};

let isPalindromeRange = function (s, i, j) {
  for (let k = i; k <= parseInt(i + (j - i) / 2); k++) {
    if (s.charCodeAt(k) != s.charCodeAt(j - k + i)) return false;
  }
  return true;
};

// @lc code=end
