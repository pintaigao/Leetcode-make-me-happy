/*
 * @lc app=leetcode id=678 lang=javascript
 *
 * [678] Valid Parenthesis String
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */

// 这个方法没有看懂
var checkValidString = function (s) {
  let low = 0;
  let high = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] == "(") {
      low += 1;
      high += 1;
    } else if (s[i] == ")") {
      if (low > 0) {
        low -= 1;
      }
      high -= 1;
    } else {
      if (low > 0) {
        low -= 1;
      }
      high += 1;
    }
    if (high < 0) {
      return false;
    }
  }
  return low == 0;
};

checkValidString("(*))");

// Appraoch 2:
let checkValidString2 = function (s) {
  let cmin = 0,
    cmax = 0; // open parentheses count in range [cmin, cmax]
  for (let c of s.split()) {
    if (c == "(") {
      cmax++;
      cmin++;
    } else if (c == ")") {
      cmax--;
      cmin--;
    } else if (c == "*") {
      cmax++; // if `*` become `(` then openCount++
      cmin--; // if `*` become `)` then openCount--
      // if `*` become `` then nothing happens
      // So openCount will be in new range [cmin-1, cmax+1]
    }
    if (cmax < 0) return false; // Currently, don't have enough open parentheses to match close parentheses-> Invalid
    // For example: ())(
    cmin = Math.max(cmin, 0); // It's invalid if open parentheses count < 0 that's why cmin can't be negative
  }

  return cmin == 0; // Return true if can found `openCount == 0` in range [cmin, cmax]
};

// 人类的方法 both O(n)
let checkValidString3 = function (s) {
  let leftID = [];
  let starID = [];
  for (let i = 0; i < s.length; i++) {
    let ch = s[i];
    if (ch === "(") leftID.unshift(i);
    else if (ch == "*") starID.unshift(i);
    else {
      if (leftID.length == 0 && starID.length == 0) return false;
      if (leftID.length !== 0) leftID.shift();
      else starID.shift();
    }
  }
  while (leftID.length !== 0 && starID.length !== 0) {
    if (leftID.shift() > starID.shift()) return false;
  }
  return leftID.length == 0;
};

// @lc code=end
