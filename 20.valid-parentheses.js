/*
 * @lc app=leetcode id=20 lang=javascript
 *
 * [20] Valid Parentheses
 */
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  let charArray = s.split("");
  let stack = [];
  for (let c of charArray) {
    if (c === "(" || c === "[" || c === "{") stack.push(c);
    else {
      if (stack.length == 0) return false;
      top = stack.pop();
      if (top == "(" && c != ")") return false;
      if (top == "{" && c != "}") return false;
      if (top == "[" && c != "]") return false;
    }
  }

  return stack.length === 0;
};
