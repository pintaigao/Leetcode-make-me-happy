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
  let count = new Map();
  let n = s.length;

  // 记录每个字符出现的次数
  for (let i = 0; i < n; i++) {
    count.set(s[i], count.get(s[i]) + 1 || 1);
  }

  // 找
  for (let i = 0; i < n; i++) {
    if (count.get(s[i]) == 1) return i;
  }
  return -1;
};
// @lc code=end
