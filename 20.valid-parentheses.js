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
  let stack = [];
  for (let c of s.split("")) {
    if (c === "(" || c === "[" || c === "{") stack.push(c);
    else {
      // 等于任何右括号
      if (stack.length == 0) return false;
      top = stack.pop();
      if ((top == "(" && c != ")") || (top == "{" && c != "}") || (top == "[" && c != "]")) return false;
    }
  }

  return stack.length === 0;
};
// @lc code=end
