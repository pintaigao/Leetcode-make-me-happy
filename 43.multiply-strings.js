/*
 * @lc app=leetcode id=43 lang=javascript
 *
 * [43] Multiply Strings
 */

// @lc code=start
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
  if (num1 == "0" || num2 == "0") return "0";
  var result = new Array(num1.length + num2.length - 1).fill(0);
  for (let i = num1.length - 1; i >= 0; i--) {
    for (let j = num2.length - 1; j >= 0; j--) {
      let product = Number(num1[i]) * Number(num2[j]);
      result[i + j] += product;
    }
  }
  for (let i = result.length - 1; i > 0; i--) {
    if (result[i] >= 10) {
      result[i - 1] = result[i - 1] + parseInt(result[i] / 10);
      result[i] = result[i] % 10;
    }
  }
  return result.join("");
};
// @lc code=end
