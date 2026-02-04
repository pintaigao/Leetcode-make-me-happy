/*
 * @lc app=leetcode id=20 lang=javascript
 *
 * [20] Valid Parentheses
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  // 栈
  let stack = [];
  for (let c of s.split("")) {
    if (c === "(" || c === "[" || c === "{") stack.push(c);
    else {
      // 不是任何左括号，进入 else
      // 等于任何右括号
      if (stack.length == 0) return false;
      top = stack.pop();
      if ((c == ")" && top != "(") || (c == "}" && top != "{") || (c == "]" && top != "[")) return false;
    }
  }

  return stack.length === 0;
};

// Map
var isValid = function (s) {
  const stack = [];

  const map = {
    ')': '(',
    ']': '[',
    '}': '{',
  };

  for (let ch of s) {
    if (map[ch]) {
      if (stack.pop() !== map[ch]) return false;
    } else {
      stack.push(ch);
    }
  }

  return stack.length === 0;
};
// @lc code=end
