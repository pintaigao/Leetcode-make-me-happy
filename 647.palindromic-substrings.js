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

/* 双指针 */
var countSubstrings = function (s) {
  let ans = 0;
  // 每一个位置都可以是回文串的中心，看左右两边是否相等
  for (let i = 0; i < s.length; ++i) {
    ans += countPalindromesAroundCenter(s, i, i);
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

/* DP */
var countSubstrings = function (s) {
  // create a 2D array of size s.length * s.length
  let dp = new Array(s.length).fill(0).map(() => new Array(s.length).fill(0));
  let ans = 0;

  for (let j = 0; j < s.length; j++) {
    for (let i = 0; i <= j; i++) {
      if (s.charAt(i) == s.charAt(j) && (j - i < 2 || dp[i + 1][j - 1])) {
        dp[i][j] = true;
        ans++;
      }
    }
  }

  return ans;
};
// @lc code=end
