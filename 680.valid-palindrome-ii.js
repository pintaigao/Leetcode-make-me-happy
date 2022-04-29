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
    // 如果两个指针指的字符不相等，则判断是否为回文
    if (s.charCodeAt(i) != s.charCodeAt(s.length - 1 - i)) {
      let j = s.length - 1 - i;
      // 则要么i+1到j是回文，要么i到j-1是回文
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
