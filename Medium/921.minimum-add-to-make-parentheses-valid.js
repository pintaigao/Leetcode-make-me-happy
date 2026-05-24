/*
 * @lc app=leetcode id=921 lang=javascript
 *
 * [921] Minimum Add to Make Parentheses Valid
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var minAddToMakeValid = function (s) {
  // res 记录插入次数
  let res = 0;
  // need 变量记录右括号的需求量
  let need = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] == "(") {
      // 对右括号的需求 + 1
      need++;
    }

    if (s[i] == ")") {
      // 对右括号的需求 - 1
      need--;

      // need 不能是负值，因为它代表需要右括号的数量
      if (need == -1) {
        need = 0;
        // 需插入一个左括号
        res++;
      }
    }
  }

  return res + need;
};

/* 栈 */
var minAddToMakeValid = function (s) {
  let stack = [];
  for (let c of s.split("")) {
    if (c == "(") {
      stack.unshift(c);
    } else {
      if (stack.length > 0 && stack[0] == "(") {
        stack.shift();
      } else {
        stack.unshift(c);
      }
    }
  }
  return stack.length;
};

// @lc code=end
