/*
 * @lc app=leetcode id=647 lang=javascript
 *
 * [647] Palindromic Substrings
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */

// Approach 1 Expand Around Possible Center
var countSubstrings = function (s) {
  let ans = 0;
  for (let i = 0; i < s.length; ++i) {
    // odd-length palindromes, single character center
    ans += countPalindromesAroundCenter(s, i, i);
    // even-length palindromes, consecutive characters center
    ans += countPalindromesAroundCenter(s, i, i + 1);
  }
  return ans;
};
let countPalindromesAroundCenter = function (ss, lo, hi) {
  let ans = 0;
  while (lo >= 0 && hi < ss.length) {
    if (ss[lo] != ss[hi]) break; // the first and last characters don't match!
    // expand around the center
    lo--;
    hi++;
    ans++;
  }
  return ans;
};

// 还有DP的做法，日后再说
// @lc code=end
