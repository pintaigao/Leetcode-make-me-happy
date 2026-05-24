/*
 * @lc app=leetcode id=986 lang=javascript
 *
 * [986] Interval List Intersections
 */

// @lc code=start
/**
 * @param {number[][]} firstList
 * @param {number[][]} secondList
 * @return {number[][]}
 */
// Approach 1: Merge Intervals O(M+N) O(M+N)
var intervalIntersection = function (A, B) {
  let ans = [], i = 0, j = 0;
  while (i < A.length && j < B.length) {
    let start = Math.max(A[i][0], B[j][0]);
    let end = Math.min(A[i][1], B[j][1]);
    if (start <= end) {
      ans.push([start, end]);
    }

    // 如果A[i]的结尾小于B[j]的结尾，移动A的指针，否则移动B的指针，因为A[i]的下一个A[i+1]还有可能与B[i]相交
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
// @lc code=end


// 暴力的解法
let intervalIntersection10 = function (A, B) {
  let lastDay = A[A.length - 1][1], ans = [];
  let days = new Array(lastDay + 1).fill(0);
  for (let [start, end] of A) {
    for (let i = start; i <= end; i++) {
      days[i] = 1
    }
  }

  for (let [start, end] of B) {
    if (start > lastDay) {
      break;
    }

    let s = start, e = start;
    while (s <= end && e <= end) {
      while (days[s] === 0 && s <= end) {
        s += 1;
      }
      e = s;
      while (days[e] === 1 && e <= end) {
        e += 1;
      }
      ans.push([s, e - 1]);
      s = e;
      e += 1;
    }
  }

  return ans;
};

intervalIntersection10(
  [
    [0, 2],
    [5, 10],
    [13, 23],
    [24, 25],
  ],
  [
    [1, 5],
    [8, 12],
    [15, 24],
    [25, 26],
  ]
);

