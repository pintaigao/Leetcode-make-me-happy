/*
 * @lc app=leetcode id=419 lang=javascript
 *
 * [419] Battleships in a Board
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @return {number}
 */

/* DFS */
var countBattleships = function (board) {
  let [m, n, count] = [board.length, board[0].length, 0];
  if (m == 0) return 0;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] == ".") continue;
      if (i > 0 && board[i - 1][j] == "X") continue;
      if (j > 0 && board[i][j - 1] == "X") continue;
      count++;
    }
  }

  return count;
};
// @lc code=end
