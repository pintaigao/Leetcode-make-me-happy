/*
 * @lc app=leetcode id=79 lang=javascript
 *
 * [79] Word Search
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  if (board.length === 0) return false;
  const [row, column] = [board.length, board[0].length];
  const dirs = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  // 坐标 + 看第哪一个word
  const dfs = (x, y, k) => {
    if (board[x][y] !== word[k]) return false;
    if (k === word.length - 1) return true;

    board[x][y] = "*"; // mark as visited
    for (const [dx, dy] of dirs) {
      const i = x + dx;
      const j = y + dy;
      if (i >= 0 && i < row && j >= 0 && j < column) {
        if (dfs(i, j, k + 1)) return true;
      }
    }

    board[x][y] = word[k]; // reset
    return false;
  };

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      if (board[i][j] === word[0] && dfs(i, j, 0)) return true;
    }
  }

  return false;
};
// @lc code=end
