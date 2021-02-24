/*
 * @lc app=leetcode id=258 lang=javascript
 *
 * [258] Add Digits
 */

// @lc code=start
/**
 * @param {number} num
 * @return {number}
 */
var addDigits = function (num) {
  let digitalRoot = 0;
  while (num > 0) {
    digitalRoot += num % 10;
    num = parseInt(num / 10);

    if (num == 0 && digitalRoot > 9) {
      num = digitalRoot;
      digitalRoot = 0;
    }
  }
  return digitalRoot;
};
// @lc code=end
