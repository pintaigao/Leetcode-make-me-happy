/*
 * @lc app=leetcode id=74 lang=javascript
 *
 * [74] Search a 2D Matrix
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */

// 面试官想要看到的做法：Binary Search
var searchMatrix = function (matrix, target) {
  let m = matrix.length;
  if (m == 0) return false;
  let n = matrix[0].length;

  // binary search
  let left = 0,
    right = m * n - 1;
  let pivotIdx, pivotElement;
  while (left <= right) {
    pivotIdx = parseInt((left + right) / 2);
    pivotElement = matrix[parseInt(pivotIdx / n)][pivotIdx % n];
    if (target == pivotElement) return true;
    else {
      if (target < pivotElement) right = pivotIdx - 1;
      else left = pivotIdx + 1;
    }
  }
  return false;
};

searchMatrix(
  [
    [1, 3, 5, 7],
    [10, 11, 16, 20],
    [23, 30, 34, 60],
  ],
  3
);

// @lc code=end
