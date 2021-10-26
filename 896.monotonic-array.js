/*
 * @lc app=leetcode id=896 lang=javascript
 *
 * [896] Monotonic Array
 */

// @lc code=start
/**
 * @param {number[]} A
 * @return {boolean}
 */
var isMonotonic = function (A) {
  let increasing = function (A) {
    for (let i = 0; i < A.length - 1; ++i) if (A[i] > A[i + 1]) return false;
    return true;
  };

  let decreasing = function (A) {
    for (let i = 0; i < A.length - 1; ++i) if (A[i] < A[i + 1]) return false;
    return true;
  };
  return increasing(A) || decreasing(A);
};

// 2. One Pass
let isMonotonic = function (A) {
  let increasing = true;
  let decreasing = true;
  for (let i = 0; i < A.length - 1; ++i) {
    if (A[i] > A[i + 1]) increasing = false;
    if (A[wi] < A[i + 1]) decreasing = false;
  }

  return increasing || decreasing;
};
// @lc code=end
