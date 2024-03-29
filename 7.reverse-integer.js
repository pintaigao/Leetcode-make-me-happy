/*
 * @lc app=leetcode id=7 lang=javascript
 *
 * [7] Reverse Integer
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  let res = 0;
  while (x != 0) {
    //每次取末尾数字
    let tmp = x % 10;
    //判断是否 大于 最大32位整数
    if (res > 214748364 || (res == 214748364 && tmp > 7)) {
      return 0;
    }
    //判断是否 小于 最小32位整数
    if (res < -214748364 || (res == -214748364 && tmp < -8)) {
      return 0;
    }
    res = res * 10 + tmp;
    x = parseInt(x / 10);
  }
  return res;
};
// @lc code=end
