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

//1.传统的做法
var repeatedSubstringPattern = function (s) {
  let l = s.length;
  for (let i = parseInt(l / 2); i >= 1; i--) {
    if (l % i == 0) {
      let m = l / i;
      let subS = s.substring(0, i);
      let sb = "";
      for (let j = 0; j < m; j++) {
        sb += subS;
      }
      if (sb === s) return true;
    }
  }
  return false;
};

// 2.比较trick的做法
// Remove 1 and last char of S1. Let this be S2
// If S exists in S2 then return true else false
// Let i be index in S2 where S starts then repeated substring length i + 1 and repeated substring S[0: i+1]
let repeatedSubstringPattern2 = function (s) {
  let str = s + s;
  return str.substring(1, str.length - 1).includes(s);
  // return s.repeat(2).slice(1, -1).includes(s);
};
// @lc code=end
