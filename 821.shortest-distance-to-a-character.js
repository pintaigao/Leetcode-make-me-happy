/*
 * @lc app=leetcode id=821 lang=javascript
 *
 * [821] Shortest Distance to a Character
 */

// @lc code=start
/**
 * @param {string} s
 * @param {character} c
 * @return {number[]}
 */

// Approach #1: Min Array [Accepted]
var shortestToChar = function (S, C) {
  let n = S.length,
    pos = -n,
    res = [];

  // 从左往右
  for (let i = 0; i < n; ++i) {
    if (S[i] == C) pos = i;
    res[i] = i - pos;
  }

  // 从右往左
  for (let i = pos - 1; i >= 0; --i) {
    if (S[i] == C) pos = i;
    res[i] = Math.min(res[i], pos - i);
  }
  return res;
};

// Approach 2 : DP
let shortestToChar2 = function (S, C) {
  let n = S.length;
  let res = [];
  for (let i = 0; i < n; ++i) res[i] = S[i] == C ? 0 : n;
  for (let i = 1; i < n; ++i) res[i] = Math.min(res[i], res[i - 1] + 1);
  for (let i = n - 2; i >= 0; --i) res[i] = Math.min(res[i], res[i + 1] + 1);
  return res;
};
// @lc code=end
