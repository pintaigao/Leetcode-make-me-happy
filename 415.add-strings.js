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
  let res = [];
  let carry = 0;
  let p1 = num1.length - 1;
  let p2 = num2.length - 1;
  while (p1 >= 0 || p2 >= 0) {
    let x1 = p1 >= 0 ? num1.charCodeAt(p1) - "0".charCodeAt(0) : 0;
    console.log(x1);
    let x2 = p2 >= 0 ? num2.charCodeAt(p2) - "0".charCodeAt(0) : 0;
    console.log(x2);
    let value = (x1 + x2 + carry) % 10;
    carry = parseInt((x1 + x2 + carry) / 10);
    res.unshift(value);
    p1--;
    p2--;
  }

  if (carry != 0) res.unshift(carry);

  return res.join("");
};
// @lc code=end
