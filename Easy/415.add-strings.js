/*
 * @lc app=leetcode id=415 lang=javascript
 *
 * [415] Add Strings
 */

// @lc code=start
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function (num1, num2) {
  let res = [], carry = 0, p1 = num1.length - 1, p2 = num2.length - 1;
  while (p1 >= 0 || p2 >= 0) {
    // 获得当前位的数字，如果当前位不存在，则视为 0
    let x1 = p1 >= 0 ? num1.charCodeAt(p1) - "0".charCodeAt(0) : 0, x2 = p2 >= 0 ? num2.charCodeAt(p2) - "0".charCodeAt(0) : 0;
    let value = (x1 + x2 + carry) % 10;
    carry = parseInt((x1 + x2 + carry) / 10);
    res.unshift(value);
    // 指针向前移动一位
    p1--, p2--;
  }

  if (carry != 0) res.unshift(carry);

  return res.join("");
};
// @lc code=end
