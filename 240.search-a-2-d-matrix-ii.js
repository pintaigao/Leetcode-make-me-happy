/*
 * @lc app=leetcode id=240 lang=javascript
 *
 * [240] Search a 2D Matrix II
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
/* 1. Trick的方法*/
var searchMatrix = function (matrix, target) {
  // 起始指针指向左下角
  let [row, col] = [matrix.length - 1, 0];

  while (row >= 0 && col < matrix[0].length) {
    // 现在这个位置的值大于target，在上面
    if (matrix[row][col] > target) {
      row--;
    } else if (matrix[row][col] < target) {
      // 现在这个位置的值小于target，在右面
      col++;
    } else {
      // found it
      return true;
    }
  }

  return false;
};

// 2. Divide and Conquer
var searchMatrix2 = function (matrix, target) {
  let matrix;
  let target;

  let searchRec = function (left, up, right, down) {
    if (left > right || up > down) {
      return false;
      // `target` is already larger than the largest element or smaller
      // than the smallest element in this submatrix.
    } else if (target < matrix[up][left] || target > matrix[down][right]) {
      return false;
    }

    let mid = parseInt((right + left) / 2);

    // Locate `row` such that matrix[row-1][mid] < target < matrix[row][mid]
    let row = up;
    while (row <= down && matrix[row][mid] <= target) {
      if (matrix[row][mid] == target) {
        return true;
      }
      row += 1;
    }

    return searchRec(left, row, mid - 1, down) || searchRec(mid + 1, up, right, row - 1);
  };

  matrix = mat;
  target = targ;

  // an empty matrix obviously does not contain `target`
  if (matrix == null || matrix.length == 0) {
    return false;
  }
  // 从第一行第一个和最后一行最后一个开始搜索，双指针
  return searchRec(0, 0, matrix[0].length - 1, matrix.length - 1);
};
// @lc code=end
