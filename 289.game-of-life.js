/*
 * @lc app=leetcode id=289 lang=javascript
 *
 * [289] Game of Life
 */

// @lc code=start
/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */

/* 方法一：复制原数组进行模拟 */
var gameOfLife = function (board) {
  let neighbors = [0, 1, -1];

  let rows = board.length;
  let cols = board[0].length;

  // 从board，创建复制数组 copyBoard
  let copyBoard = board.map((arr) => {
    return arr.slice();
  });

  // 遍历面板每一个格子里的细胞
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // 对于每一个细胞统计其八个相邻位置里的活细胞数量
      let liveNeighbors = 0;

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (!(neighbors[i] == 0 && neighbors[j] == 0)) {
            let r = row + neighbors[i];
            let c = col + neighbors[j];

            // 查看相邻的细胞是否是活细胞
            if (r < rows && r >= 0 && c < cols && c >= 0 && copyBoard[r][c] == 1) {
              liveNeighbors += 1;
            }
          }
        }
      }

      // 规则 1 或规则 3
      if (copyBoard[row][col] == 1 && (liveNeighbors < 2 || liveNeighbors > 3)) {
        board[row][col] = 0;
      }
      // 规则 4
      if (copyBoard[row][col] == 0 && liveNeighbors == 3) {
        board[row][col] = 1;
      }
    }
  }
};

/* 方法二：使用额外的状态 */
var gameOfLife = function (board) {
  let neighbors = [0, 1, -1];

  let [rows, cols] = [board.length, board[0].length];

  // 遍历面板每一个格子里的细胞
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // 对于每一个细胞统计其八个相邻位置里的活细胞数量
      let liveNeighbors = 0;

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (!(neighbors[i] == 0 && neighbors[j] == 0)) {
            // 相邻位置的坐标
            let r = row + neighbors[i];
            let c = col + neighbors[j];

            // 查看相邻的细胞是否是活细胞
            if (r < rows && r >= 0 && c < cols && c >= 0 && Math.abs(board[r][c]) == 1) {
              liveNeighbors += 1;
            }
          }
        }
      }

      // 规则 1 或规则 3
      if (board[row][col] == 1 && (liveNeighbors < 2 || liveNeighbors > 3)) {
        // -1 代表这个细胞过去是活的现在死了
        board[row][col] = -1;
      }
      // 规则 4
      if (board[row][col] == 0 && liveNeighbors == 3) {
        // 2 代表这个细胞过去是死的现在活了
        board[row][col] = 2;
      }
    }
  }

  // 遍历 board 得到一次更新后的状态
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (board[row][col] > 0) {
        board[row][col] = 1;
      } else {
        board[row][col] = 0;
      }
    }
  }
};

// @lc code=end
