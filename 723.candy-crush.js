/*
 * @lc app=leetcode id=723 lang=javascript
 *
 * [723] Candy Crush
 */

// @lc code=start
/**
 * @param {number[][]} board
 * @return {number[][]}
 */
var candyCrush = function (board) {
  let N = board.length,
    M = board[0].length;
  let found = true;
  while (found) {
    found = false;

    // board loop 一遍
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        let val = Math.abs(board[i][j]);
        if (val == 0) continue;

        // 向右的三个一样吗?
        if (
          j < M - 2 &&
          Math.abs(board[i][j + 1]) == val &&
          Math.abs(board[i][j + 2]) == val
        ) {
          found = true;
          let ind = j;
          while (ind < M && Math.abs(board[i][ind]) == val) {
            board[i][ind++] = -val;
          }
        }

        // 向下三个一样吗？
        if (
          i < N - 2 &&
          Math.abs(board[i + 1][j]) == val &&
          Math.abs(board[i + 2][j]) == val
        ) {
          found = true;
          let ind = i;
          while (ind < N && Math.abs(board[ind][j]) == val) {
            board[ind++][j] = -val;
          }
        }
      }
    }

    console.log(board);
    console.log();

    if (found) {
      // move positive values to the bottom, then set the rest to 0
      // 从左至右（从底部往上）
      for (let j = 0; j < M; j++) {
        let storeInd = N - 1;
        for (let i = N - 1; i >= 0; i--) {
          if (board[i][j] > 0) {
            board[storeInd][j] = board[i][j];
            storeInd -= 1;
          }
        }
        for (let k = storeInd; k >= 0; k--) board[k][j] = 0;
      }
    }
  }
  return board;
};

let flatternBoard = function (board) {
  let newBoard = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if ((board[i][j] + "").length === 1) {
        board[i][j] += "   ";
      }
      if ((board[i][j] + "").length === 2) {
        board[i][j] += "  ";
      }
      if ((board[i][j] + "").length === 3) {
        board[i][j] += " ";
      }
    }
  }
};

candyCrush([
  [110, 5, 112, 113, 114],
  [210, 211, 5, 213, 214],
  [310, 311, 3, 313, 314],
  [410, 411, 412, 5, 414],
  [5, 1, 512, 3, 3],
  [610, 4, 1, 613, 614],
  [710, 1, 2, 713, 714],
  [810, 1, 2, 1, 1],
  [1, 1, 2, 2, 2],
  [4, 1, 4, 4, 1014],
]);

// @lc code=end
