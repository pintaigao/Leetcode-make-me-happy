/*
 * @lc app=leetcode id=306 lang=javascript
 *
 * [306] Additive Number
 */

// @lc code=start
/**
 * @param {string} num
 * @return {boolean}
 */
var isAdditiveNumber = function (num) {
  let isValid = function (i, j, num) {
    if (num[0] == "0" && i > 1) return false;
    if (num[i] == "0" && j > 1) return false;
    let sum = 0;
    let x1 = parseInt(num.substring(0, i));
    let x2 = parseInt(num.substring(i, i + j));
    for (let start = i + j; start != num.length; start += sum.length) {
      x2 = x2 + x1;
      x1 = x2 - x1;
      sum = x2.toString();
      if (!num.startsWith(sum, start)) return false;
    }
    return true;
  };

  let n = num.length;
  // i表示substring从0到i
  for (let i = 1; i <= parseInt(n / 2); ++i) {
    // j表示substring从i到i+j,即后面接数的长度从1开始
    // 而且因为后面substring的长度是j,所以j的最大值是n-i（i+j<=n）
    for (let j = 1; Math.max(j, i) <= n - i - j; ++j) {
      if (isValid(i, j, num)) return true;
    }
  }
  return false;
};
// @lc code=end
