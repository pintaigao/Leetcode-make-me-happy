/*
 * @lc app=leetcode id=542 lang=javascript
 *
 * [542] 01 Matrix
 */

// @lc code=start
/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
/* BFS的方法 */
var updateMatrix = function (mat) {
  let queue = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] == 0) queue.push([i, j]);
      else matrix[i][j] = -1;
    }
  }
  let dirs = [
    [0, 1],
    [-1, 0],
    [1, 0],
    [0, -1],
  ];
  let length = 0;
  while (queue.length) {
    let size = queue.length;
    length += 1;
    while (size > 0) {
      let cell = queue.shift();
      for (let dir of dirs) {
        let r = cell[0] + dir[0];
        let c = cell[1] + dir[1];
        if (r < 0 || c < 0 || r == matrix.length || c == matrix[0].length || matrix[r][c] >= 0) continue;
        matrix[r][c] = length;
        queue.push([r, c]);
      }

      size -= 1;
    }
  }
  return matrix;
};

/* DP */
let updateMatrix2 = function (matrix) {
  if (matrix.length == 0 || matrix[0].length == 0) {
    return matrix;
  }

  let dis = new Array(matrix.length).fill(null).map((_) => {
    return new Array(matrix[0].length);
  });

  let range = matrix.length * matrix[0].length;

  // 从上往下，左往右
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] == 0) {
        dis[i][j] = 0;
      } else {
        let upCell = i > 0 ? dis[i - 1][j] : range;
        let leftCell = j > 0 ? dis[i][j - 1] : range;
        dis[i][j] = Math.min(upCell, leftCell) + 1;
      }
    }
  }

  // 从下往上，右往左
  for (let i = matrix.length - 1; i >= 0; i--) {
    for (let j = matrix[0].length - 1; j >= 0; j--) {
      if (matrix[i][j] == 0) {
        dis[i][j] = 0;
      } else {
        let downCell = i < matrix.length - 1 ? dis[i + 1][j] : range;
        let rightCell = j < matrix[0].length - 1 ? dis[i][j + 1] : range;
        dis[i][j] = Math.min(downCell + 1, rightCell + 1, dis[i][j]);
      }
    }
  }

  return dis;
};
// @lc code=end
