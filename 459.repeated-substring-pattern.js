/*
 * @lc app=leetcode id=459 lang=javascript
 *
 * [459] Repeated Substring Pattern
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
/* 传统的做法 */
var repeatedSubstringPattern = function (s) {
  let l = s.length;
  for (let i = parseInt(l / 2); i >= 1; i--) {
    if (l % i == 0) {
      // 倍数
      let m = l / i;
      let subS = s.substring(0, i);
      let sb = "";
      // 子字符 * 倍数
      for (let j = 0; j < m; j++) {
        sb += subS;
      }
      if (sb === s) return true;
    }
  }
  return false;
};
// @lc code=end
