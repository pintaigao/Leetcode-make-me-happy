/*
 * @lc app=leetcode id=125 lang=javascript
 *
 * [125] Valid Palindrome
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  s = s.toLowerCase();
  var sc = "";
  for (var x in s) {
    if (s[x] >= "a" && s[x] <= "z") sc += s[x];
    else if (s[x] >= "0" && s[x] <= 9) sc += s[x];
  }
  var t = sc.split("").reverse().join("");
  return sc == t;
};

function isLetterOrDigit(char) {}
// @lc code=end
