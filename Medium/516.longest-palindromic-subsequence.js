/*
 * @lc app=leetcode id=516 lang=javascript
 *
 * [516] Longest Palindromic Subsequence
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
/* Solution 1：二维动态规划 出处：https://leetcode.cn/problems/longest-palindromic-subsequence/solution/zi-xu-lie-wen-ti-tong-yong-si-lu-zui-chang-hui-wen/*/
var longestPalindromeSubseq = function (s) {
  // create a 2D array to store the results
  let dp = Array.from({ length: s.length }, (_) => new Array(s.length).fill(0));
  // 反着遍历保证正确的状态转移
  // 从尾开始
  // 先保持头不变
  for (let i = s.length - 1; i >= 0; i--) {
    // 尾一直在变，从头向后
    for (let j = i; j < s.length; j++) {
      if (s[i] == s[j]) {
        // +2 表示加 2个字符长度
        // dp[i + 1][j - 1] 表示 当s[i] == s[j]，即我们要看看i，j 之间，即 i-1 到 j+1的最大回文长度，即dp[i + 1][j - 1]
        // 或者 i == j 的时候，即字母自己是一个回文，dp[i][j] = 1
        dp[i][j] = i == j ? 1 : dp[i + 1][j - 1] + 2;
      } else {
        // 如果s[i] !== s[j], 那么dp[i][j] 的最大长度为从 i+1 到 j 或者从 i 到j-1 的最大长度
        // 如果它俩不相等，说明它俩不可能同时出现在 s[i..j] 的最长回文子序列中，那么把它俩分别加入 s[i+1..j-1] 中，看看哪个子串产生的回文子序列更长即可
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[0][s.length - 1];
};

//
// create a 2D array to store the results
let longestPalindromeSubseq2 = function (s) {
  let dp = Array.from({ length: s.length }, (_) => new Array(s.length).fill(0));

  // 正着遍历从头开始，
  // 保持尾不变
  // 头一直在变，头从尾向前
  for (let j = 0; j < s.length; j++) {
    for (let i = j; i >= 0; i--) {
      if (s[j] == s[i]) {
        // +2 表示加 2个字符长度
        // dp[i + 1][j - 1] 表示 当s[i] == s[j]，即我们要看看i，j 之间，即 i-1 到 j+1的最大回文长度，即dp[i + 1][j - 1]
        dp[i][j] = i == j ? 1 : dp[i + 1][j - 1] + 2;
      } else {
        // 如果s[i] !== s[j], 那么dp[i][j] 的最大长度为从 i+1 到 j 或者从 i 到j-1 的最大长度
        // 如果它俩不相等，说明它俩不可能同时出现在 s[i..j] 的最长回文子序列中，那么把它俩分别加入 s[i+1..j-1] 中，看看哪个子串产生的回文子序列更长即可
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
      }
    }
  }

  console.log(dp);
  return dp[0][s.length - 1];
}

longestPalindromeSubseq2("bbbab")