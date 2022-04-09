/*
 * @lc app=leetcode id=1005 lang=javascript
 *
 * [1005] Maximize Sum Of Array After K Negations
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var largestSumAfterKNegations = function (A, K) {
  for (let i = 0; i < K; i++) {
    //find index of min value
    let i = A.indexOf(Math.min(...A));
    A[i] = A[i] * -1;
  }

  return A.reduce((a, b) => a + b, 0);
};

// @lc code=end
