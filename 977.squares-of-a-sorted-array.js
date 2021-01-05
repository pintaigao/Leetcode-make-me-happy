/*
 * @lc app=leetcode id=977 lang=javascript
 *
 * [977] Squares of a Sorted Array
 */

// @lc code=start
/**
 * @param {number[]} A
 * @return {number[]}
 */
var sortedSquares = function (A) {
  let N = A.length;
  let j = 0;
  while (j < N && A[j] < 0) j++;
  let i = j - 1;

  let ans = new Array(N);
  let t = 0;

  while (i >= 0 && j < N) {
    if (A[i] * A[i] < A[j] * A[j]) {
      ans[t++] = A[i] * A[i];
      i--;
    } else {
      ans[t++] = A[j] * A[j];
      j++;
    }
  }

  while (i >= 0) {
    ans[t++] = A[i] * A[i];
    i--;
  }
  while (j < N) {
    ans[t++] = A[j] * A[j];
    j++;
  }

  return ans;
};
// @lc code=end
