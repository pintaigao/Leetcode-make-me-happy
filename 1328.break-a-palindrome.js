/*
 * @lc app=leetcode id=1328 lang=javascript
 *
 * [1328] Break a Palindrome
 */

// @lc code=start
/**
 * @param {string} palindrome
 * @return {string}
 */

// O(n) O(n)
var breakPalindrome = function (palindrome) {
  let s = palindrome.split("");
  let n = s.length;

  for (let i = 0; i < parseInt(n / 2); i++) {
    if (s[i] != "a") {
      s[i] = "a";
      return s.join("");
    }
  }
  s[n - 1] = "b"; //if all 'a'
  return n < 2 ? "" : s.join("");
};
// @lc code=end
