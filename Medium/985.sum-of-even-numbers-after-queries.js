/*
 * @lc app=leetcode id=985 lang=javascript
 *
 * [985] Sum of Even Numbers After Queries
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number[]}
 */
var sumEvenAfterQueries = function (A, queries) {
  let S = 0;
  // 先求出A中偶数的和
  for (let x of A) {
    if (x % 2 == 0) {
      S += x;
    }
  }

  let ans = new Array(queries.length);

  // 对每一个query
  for (let i = 0; i < queries.length; ++i) {
    let val = queries[i][0],
      index = queries[i][1];
    // 如果原来的值是偶数，那么就要从S减掉原来的值
    if (A[index] % 2 == 0) S -= A[index];
    A[index] += val;
    // 如果新的值是偶数，那么就要加上新的值
    if (A[index] % 2 == 0) S += A[index];
    ans[i] = S;
  }

  return ans;
};
// @lc code=end
