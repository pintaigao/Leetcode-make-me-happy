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
/* 两个Stack */
var checkValidString = function (s) {
  let leftID = [];
  let starID = [];
  for (let i = 0; i < s.length; i++) {
    let ch = s[i];
    if (ch === "(") leftID.unshift(i);
    else if (ch == "*") starID.unshift(i);
    else {
      // 碰到“)”, 如果leftID和starID为空，则返回false，说明多了“)”，否则，leftID或starID移除一个元素
      if (leftID.length == 0 && starID.length == 0) return false;
      if (leftID.length !== 0) leftID.shift();
      else starID.shift();
    }
  }
  // 如果leftID和starID都不为空，如果leftID的长度大于starID，则返回false，说明没有足够的*来匹配“(”
  while (leftID.length !== 0 && starID.length !== 0) {
    if (leftID.shift() > starID.shift()) return false;
  }
  // 如果leftID不为空，说明多了“(”，返回false，否则true
  return leftID.length == 0;
};

/* Appraoch 2: Space O(1)的做法，Greedy*/
let checkValidString2 = function (s) {
  // min和max表示未匹配的左括号数量可能的最小值和最大值
  let [cmin, cmax] = [0, 0];
  for (let c of s.split("")) {
    if (c === "(") {
      cmax++;
      cmin++;
    } else if (c === ")") {
      cmin = Math.max(cmin - 1, 0);
      cmax--;
      if (cmax < 0) return false;
    } else if (c === "*") {
      /* 如果遇到星号，由于星号可以看成左括号、右括号或空字符串，因此未匹配的左括号数量可能加1、减1或不变。*/
      cmin = Math.max(cmin - 1, 0);
      cmax++;
    }
  }

  return cmin == 0;
};

// @lc code=end
