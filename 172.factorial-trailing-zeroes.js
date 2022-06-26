/*
 * @lc app=leetcode id=172 lang=javascript
 *
 * [172] Factorial Trailing Zeroes
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */

/* Count Factors of 5 */
var reverseWords = function (s) {
  let zeroCount = 0;
  for (let i = 5; i <= n; i += 5) {
    let currentFactor = i;
    while (currentFactor % 5 == 0) {
      zeroCount++;
      currentFactor /= 5;
    }
  }
  return zeroCount;
};

// 最原始的做法
var trailingZeroes = function (n) {
  let fb = function (num) {
    if (num === 1) {
      return 1;
    }

    return num * fb(num - 1);
  };

  let result = fb(n) + "";
  let count = 0;
  for (let i = result.length - 1; i >= 0; i--) {
    if (i === result.length - 1 && result[i] !== "0") {
      break;
    }
    if (result[i] === "0") {
      count += 1;
    }
  }

  return count;
};
// @lc code=end
