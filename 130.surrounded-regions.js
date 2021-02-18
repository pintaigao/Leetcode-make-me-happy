/*
 * @lc app=leetcode id=130 lang=javascript
 *
 * [130] Surrounded Regions
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */

// Approach 1: DFS (Depth-First Search)
let ROWS;
let COLS;

var solve = function (board) {
  let DFS = function (board, row, col) {
    if (board[row][col] != "O") return;

    board[row][col] = "E";
    if (col < COLS - 1) DFS(board, row, col + 1);
    if (row < ROWS - 1) DFS(board, row + 1, col);
    if (col > 0) DFS(board, row, col - 1);
    if (row > 0) DFS(board, row - 1, col);
  };

  if (board == null || board.length == 0) {
    return;
  }
  ROWS = board.length;
  COLS = board[0].length;
  borders = [];
  // Step 1). construct the list of border cells
  for (let r = 0; r < ROWS; ++r) {
    if (board[r][0] === "O") borders.push([r, 0]);
    if (board[r][COLS - 1] === "O") borders.push([r, COLS - 1]);
  }

  for (let c = 0; c < COLS; ++c) {
    if (board[0][c] === "O") borders.push([0, c]);
    if (board[ROWS - 1][c] === "O") borders.push([ROWS - 1, c]);
  }

  // Step 2). mark the escaped cells
  for (let pair of borders) {
    DFS(board, pair[0], pair[1]);
  }

  // Step 3). flip the cells to their correct final states
  for (let r = 0; r < ROWS; ++r) {
    for (let c = 0; c < COLS; ++c) {
      if (board[r][c] == "O") board[r][c] = "X";
      if (board[r][c] == "E") board[r][c] = "O";
    }
  }
};

// Approach 2: BFS (Breadth-First Search) O(N) O(N)
let ROWS2;
let COLS2;

let solve2 = function (board) {
  let BFS = function (board, r, c) {
    let queue = [];
    queue.push([r, c]);

    while (queue.length !== 0) {
      let pair = queue.shift();
      let row = pair[0],
        col = pair[1];
      if (board[row][col] != "O") continue;

      board[row][col] = "E";
      if (col < COLS2 - 1) queue.push([row, col + 1]);
      if (row < ROWS2 - 1) queue.push([row + 1, col]);
      if (col > 0) queue.push([row, col - 1]);
      if (row > 0) queue.push([row - 1, col]);
    }
  };

  if (board == null || board.length == 0) {
    return;
  }
  ROWS2 = board.length;
  COLS2 = board[0].length;

  let borders = [];
  // Step 1). construct the list of border cells
  for (let r = 0; r < ROWS2; ++r) {
    borders.add([r, 0]);
    borders.add([r, COLS2 - 1]);
  }
  for (let c = 0; c < COLS2; ++c) {
    borders.add([0, c]);
    borders.add([ROWS2 - 1, c]);
  }

  // Step 2). mark the escaped cells
  for (let pair of borders) {
    BFS(board, pair[0], pair[1]);
  }

  // Step 3). flip the cells to their correct final states
  for (let r = 0; r < ROWS2; ++r) {
    for (let c = 0; c < COLS2; ++c) {
      if (board[r][c] == "O") board[r][c] = "X";
      if (board[r][c] == "E") board[r][c] = "O";
    }
  }
};

// solve([
//   ["X", "X", "X", "X"],
//   ["X", "O", "O", "X"],
//   ["X", "X", "O", "X"],
//   ["X", "O", "X", "X"],
// ]);
// @lc code=end
