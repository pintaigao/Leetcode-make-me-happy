/*
 * @lc app=leetcode id=172 lang=javascript
 *
 * [172] Factorial Trailing Zeroes
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
/**
 * @param {number} n
 * @return {number}
 */
var trailingZeroes = function (n) {
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

let fb = (num) => {
  if (num === 1) {
    return 1;
  }

  return num * fb(num - 1);
};

// Approach 2: Counting Factors of 5
trailingZeroes2 = function (n) {
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

console.log(trailingZeroes(20));

// @lc code=end
