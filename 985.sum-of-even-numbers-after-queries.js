/*
 * @lc app=leetcode id=985 lang=javascript
 *
 * [985] Sum of Even Numbers After Queries
 */
/**
 * @param {number[]} A
 * @param {number[][]} queries
 * @return {number[]}
 */
var sumEvenAfterQueries = function (A, queries) {
  let S = 0;
  for (let x of A) {
    if (x % 2 == 0) {
      S += x;
    }
  }

  let ans = new Array(queries.length);

  for (let i = 0; i < queries.length; ++i) {
    let val = queries[i][0],
      index = queries[i][1];
    if (A[index] % 2 == 0) S -= A[index];
    A[index] += val;
    if (A[index] % 2 == 0) S += A[index];
    ans[i] = S;
  }

  return ans;
};
