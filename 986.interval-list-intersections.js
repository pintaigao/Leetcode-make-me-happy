/*
 * @lc app=leetcode id=986 lang=javascript
 *
 * [986] Interval List Intersections
 */
/**
 * @param {number[][]} A
 * @param {number[][]} B
 * @return {number[][]}
 */

// Approach 1: Merge Intervals O(M+N) O(M+N)
var intervalIntersection = function (A, B) {
  let ans = [];
  let i = 0,
    j = 0;
  while (i < A.length && j < B.length) {
    let lo = Math.max(A[i][0], B[j][0]);
    let hi = Math.min(A[i][1], B[j][1]);
    if (lo <= hi) {
      ans.push([lo, hi]);
    }

    if (A[i][1] < B[j][1]) i++;
    else j++;
  }

  return ans;
};

// intervalIntersection(
//   [
//     [0, 2],
//     [5, 10],
//     [13, 23],
//     [24, 25],
//   ],
//   [
//     [1, 5],
//     [8, 12],
//     [15, 24],
//     [25, 26],
//   ]
// );
