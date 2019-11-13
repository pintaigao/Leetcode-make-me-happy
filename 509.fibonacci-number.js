/*
 * @lc app=leetcode id=509 lang=javascript
 *
 * [509] Fibonacci Number
 */
/**
 * @param {number} N
 * @return {number}
 */
var fib = function (num) {
  if (num === 0) { return 0 };
  if (num === 1 || num === 2) { return 1 };
  var prev1 = 1;
  var prev2 = 1;
  while (num > 2) {
    var sum = prev1 + prev2;
    prev1 = prev2
    prev2 = sum;
    num--
  }
  return prev2
}

