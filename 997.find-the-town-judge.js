/*
 * @lc app=leetcode id=997 lang=javascript
 *
 * [997] Find the Town Judge
 */
/**
 * @param {number} N
 * @param {number[][]} trust
 * @return {number}
 */
var sortedSquares = function(A) {
  let result = [];
  let l = 0;
  let r = A.length - 1;
  let p = r;

  while (l <= r) {
      if (A[l] ** 2 > A[r] ** 2) {
          result[p--] = A[l++] ** 2;
      } else {
          result[p--] = A[r--] ** 2;
      }
  }
  
  return result;
};

