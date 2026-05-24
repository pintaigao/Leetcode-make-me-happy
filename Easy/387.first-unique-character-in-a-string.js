/*
 * @lc app=leetcode id=387 lang=javascript
 *
 * [387] First Unique Character in a String
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function (s) {
  let count = {}, n = s.length;

  // 记录每个字符出现的次数
  for (let i = 0; i < n; i++) {
    count[s[i]] = (count[s[i]] || 0) + 1;
  }

  // 找
  for (let i = 0; i < n; i++) {
    if (count[s[i]] == 1) return i;
  }
  return -1;
};

// @lc code=end

// Leetcode 快的解法
var firstUniqChar = function (s) {
  const len = s.length, a1 = new Array(26).fill(0);
  for (let i = 0; i < len; i++) {
    a1[s.charCodeAt(i) - "a".charCodeAt(0)] += 1;
  }
  for (let i = 0; i < len; i++) {
    if (a1[s.charCodeAt(i) - "a".charCodeAt(0)] === 1) {
      return i;
    }
  }
  return -1;
};

