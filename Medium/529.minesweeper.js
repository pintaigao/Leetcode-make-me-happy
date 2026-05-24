/*
 * @lc app=leetcode id=529 lang=javascript
 *
 * [529] Minesweeper
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @param {number[]} click
 * @return {character[][]}
 */
var updateBoard = function (board, click) {
  let m = board.length, n = board[0].length, directions = [[1, 1], [1, 0], [1, -1], [-1, 0], [-1, 1], [-1, -1], [0, 1], [0, -1]], [cX, cY] = click, inBound = (x, y) => x >= 0 && x < m && y >= 0 && y < n; // 辅助函数

  const update = (x, y) => {
    // 方案 A
    // if (!inBound(x, y) || board[x][y] != "E") return; // 不在界内或不是E，直接返回
    let count = 0;

    // 先统计周围雷的个数
    for (let [nx, ny] of directions) if (inBound(x + nx, y + ny) && board[x + nx][y + ny] == "M") count += 1;

    if (count == 0) {
      // 如果周围没有雷，标记 B，dfs周围的点
      board[x][y] = "B";
      // 方案 A
      // for (let [nx, ny] of directions) update(x + nx, y + ny);
      // 方案 B
      for (let [nx, ny] of direction) {
        if (inBound(x + nx, y + ny) && board[x + nx][y + ny] == "E") {
          board[x + nx][y + ny] = "B"; // 相当于 visited 作用，说明这个将来的点已经放过 queue 了，不会被重复放
          update(x + nx, y + ny)
        }
      }
    } else {
      board[x][y] = String(count);
    }
  };

  // 正体
  // 第一下就踩雷了
  board[cX][cY] == "M" ? board[cX][cY] = "X" : update(cX, cY); // 开启dfs

  return board;
};

/* BFS */
const updateBoard = (board, click) => {
  let m = board.length, n = board[0].length, directions = [[1, 1], [1, 0], [1, -1], [-1, 0], [-1, 1], [-1, -1], [0, 1], [0, -1]], [cX, cY] = click, inBound = (x, y) => x >= 0 && x < m && y >= 0 && y < n, queue = [[cX, cY]] // 辅助函数

  if (board[cX][cY] == "M") {
    board[cX][cY] = "X";
  } else {
    while (queue.length) {
      let [x, y] = queue.shift(), count = 0;

      // 先统计周围雷的个数
      for (let [nx, ny] of directions) if (inBound(x + nx, y + ny) && board[x + nx][y + ny] == "M") count += 1;

      // 如果周围没有雷，标记 B，BFS周围的点
      if (count == 0) {
        board[x][y] = "B";
        for (let direction of directions) {
          if (inBound(x + direction[0], y + direction[1]) && board[x + direction[0]][y + direction[1]] == "E") {
            board[x + direction[0]][y + direction[1]] = "B"; // 相当于 visited 作用，说明这个将来的点已经放过 queue 了，不会被重复放
            queue.push([x + direction[0], y + direction[1]]);
          }
        }
      } else {
        // 如果 board[x][y] 已经等于 B 了也没关系，这一步也会变成 count
        board[x][y] = String(count);
      }
    }
  }
  return board;
};
// @lc code=end
