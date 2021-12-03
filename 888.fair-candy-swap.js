/*
 * @lc app=leetcode id=888 lang=javascript
 *
 * [888] Fair Candy Swap
 */

// @lc code=start
/**
 * @param {number[]} aliceSizes
 * @param {number[]} bobSizes
 * @return {number[]}
 */

// 1. Solve the Equation
var fairCandySwap = function (aliceSizes, bobSizes) {
  let sa = 0,
    sb = 0; // sum of A, B respectively
  for (let x of aliceSizes) sa += x;
  for (let x of bobSizes) sb += x;
  let delta = parseInt((sb - sa) / 2);
  // If Alice gives x, she expects to receive x + delta

  let setB = new Set();
  for (let x of bobSizes) setB.add(x);

  for (let x of aliceSizes) {
    if (setB.has(x + delta)) return [x, x + delta];
  }
};
// @lc code=end
