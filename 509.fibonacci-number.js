/*
 * @lc app=leetcode id=509 lang=javascript
 *
 * [509] Fibonacci Number
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
  if (num === 0) {
    return 0;
  }
  if (num === 1 || num === 2) {
    return 1;
  }
  var prev1 = 1;
  var prev2 = 1;
  while (num > 2) {
    var sum = prev1 + prev2;
    prev1 = prev2;
    prev2 = sum;
    num--;
  }
  return prev2;
};

/* 切合题意的方法 */
var fib = function (n) {
  if (n <= 1) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
};

// @lc code=end
