/*
 * @lc app=leetcode id=1020 lang=javascript
 *
 * [1020] Number of Enclaves
 */
/**
 * @param {number[][]} A
 * @return {number}
 */

var numEnclaves = function (matrix) {
  var lastRow = matrix.length - 1;
  var lastCol = matrix[0].length - 1;
  for (var r = 0; r < matrix.length; r++) {
    clearRecursive(matrix, r, 0);
    clearRecursive(matrix, r, lastCol);
  }
  for (var c = 0; c < matrix[0].length; c++) {
    clearRecursive(matrix, 0, c);
    clearRecursive(matrix, lastRow, c);
  }
  var count = 0;
  for (var r = 0; r < matrix.length; r++) {
    for (var c = 0; c < matrix[0].length; c++) {
      if (matrix[r][c] === 1) count++;
    }
  }
  return count;
};
//+++++++++++++++++++++++++
// recursive
//+++++++++++++++++++++++++
function clearRecursive(matrix, r, c) {
  if (r < 0 || c < 0 || r >= matrix.length || c >= matrix[0].length ||
    matrix[r][c] === 0) {
    return;
  }
  matrix[r][c] = 0;
  clearRecursive(matrix, r - 1, c);
  clearRecursive(matrix, r + 1, c);
  clearRecursive(matrix, r, c - 1);
  clearRecursive(matrix, r, c + 1);
}

