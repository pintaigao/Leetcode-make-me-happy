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

// 1. 比较Trick的方法
var searchMatrix = function (matrix, target) {
  // start our "pointer" in the bottom-left
  let row = matrix.length - 1;
  let col = 0;

  while (row >= 0 && col < matrix[0].length) {
    if (matrix[row][col] > target) {
      row--;
    } else if (matrix[row][col] < target) {
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
    // this submatrix has no height or no width.
    if (left > right || up > down) {
      return false;
      // `target` is already larger than the largest element or smaller
      // than the smallest element in this submatrix.
    } else if (target < matrix[up][left] || target > matrix[down][right]) {
      return false;
    }

    let mid = left + parseInt((right - left) / 2);

    // Locate `row` such that matrix[row-1][mid] < target < matrix[row][mid]
    let row = up;
    while (row <= down && matrix[row][mid] <= target) {
      if (matrix[row][mid] == target) {
        return true;
      }
      row++;
    }

    return (
      searchRec(left, row, mid - 1, down) ||
      searchRec(mid + 1, up, right, row - 1)
    );
  };

  matrix = mat;
  target = targ;

  // an empty matrix obviously does not contain `target`
  if (matrix == null || matrix.length == 0) {
    return false;
  }

  return searchRec(0, 0, matrix[0].length - 1, matrix.length - 1);
};

// 3. Binary Search

let binarySearch = function (matrix, target, start, vertical) {
  let lo = start;
  let hi = vertical ? matrix[0].length - 1 : matrix.length - 1;

  while (hi >= lo) {
    let mid = parseInt((lo + hi) / 2);
    if (vertical) {
      // searching a column
      if (matrix[start][mid] < target) {
        lo = mid + 1;
      } else if (matrix[start][mid] > target) {
        hi = mid - 1;
      } else {
        return true;
      }
    } else {
      // searching a row
      if (matrix[mid][start] < target) {
        lo = mid + 1;
      } else if (matrix[mid][start] > target) {
        hi = mid - 1;
      } else {
        return true;
      }
    }
  }

  return false;
};

let searchMatrix3 = function (matrix, target) {
  // an empty matrix obviously does not contain `target`
  if (matrix == null || matrix.length == 0) {
    return false;
  }

  // iterate over matrix diagonals
  let shorterDim = Math.min(matrix.length, matrix[0].length);
  for (let i = 0; i < shorterDim; i++) {
    let verticalFound = binarySearch(matrix, target, i, true);
    let horizontalFound = binarySearch(matrix, target, i, false);
    if (verticalFound || horizontalFound) {
      return true;
    }
  }

  return false;
};

// @lc code=end
