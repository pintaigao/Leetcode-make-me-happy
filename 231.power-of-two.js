/*
 * @lc app=leetcode id=231 lang=javascript
 *
 * [231] Power of Two
 */

// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
 */

// 方法1: 不断对2求余
var isPowerOfTwo = function (n) {
  if (n <= 0) return false;
  while (n % 2 === 0) n /= 2;
  return n === 1;
};

// 方法2: 与运算
var isPowerOfTwo2 = function (n) {
  return n > 0 && (n & (n - 1)) === 0;
};
// @lc code=end
