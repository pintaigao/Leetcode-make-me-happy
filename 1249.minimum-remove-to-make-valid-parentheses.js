/*
 * @lc app=leetcode id=1249 lang=javascript
 *
 * [1249] Minimum Remove to Make Valid Parentheses
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var minRemoveToMakeValid = function (s) {
  let [bracketIndex, invalidIndex, result] = [[], new Array(s.length), []];
  for (let i = 0; i < s.length; i++) {
    // 如果遇到左括号
    if (s[i] == "(") {
      bracketIndex.push(i);
      invalidIndex[i] = true;
    }
    // 如果遇到右括号
    if (s[i] == ")") {
      if (!bracketIndex.length) {
        invalidIndex[i] = true;
      } else {
        // 说明找到匹配的了
        invalidIndex[bracketIndex.pop()] = false;
      }
    }
  }

  for (let i = 0; i < s.length; i++) {
    if (!invalidIndex[i]) {
      result.push(s[i]);
    }
  }
  return result.join();
};
// @lc code=end
