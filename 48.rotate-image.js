/*
 * @lc app=leetcode id=48 lang=javascript
 *
 * [48] Rotate Image
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  let map = {};
  for (var row = 0; row < matrix.length; row++) {
    map[row] = [];

    for (var col = matrix.length - 1; col >= 0; col--) {
      map[row].push(matrix[col][row]);
    }
  }

  for (var row in map) {
    for (var i = 0; i < map[row].length; i++) {
      matrix[row][i] = map[row][i];
    }
  }
};

/* 分层平移 */
var rotate = function (matrix) {
  let add = 0;
  let temp = 0;
  let pos1 = 0;
  let pos2 = matrix[0].length - 1;
  while (pos1 < pos2) {
    add = 0;
    while (add < pos2 - pos1) {
      temp = matrix[pos1][pos1 + add];
      matrix[pos1][pos1 + add] = matrix[pos2 - add][pos1];
      matrix[pos2 - add][pos1] = matrix[pos2][pos2 - add];
      matrix[pos2][pos2 - add] = matrix[pos1 + add][pos2];
      matrix[pos1 + add][pos2] = temp;
      add++;
    }
    pos1++;
    pos2--;
  }
};
// @lc code=end
