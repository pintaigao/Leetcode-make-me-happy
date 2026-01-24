/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
// 1.DFS
var solve = function (board) {
  const rows = board.length, cols = board[0].length;
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  const dfs = (r, c) => {
    if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== 'O') {
      return;
    }
    board[r][c] = 'E';
    for (const [dr, dc] of directions) {
      dfs(r + dr, c + dc);
    }
  };

  // 2. 先处理边界上的 0，从边界上的 'O' 开始 DFS，将其及其相连的 'O' 标记为 'E'
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (r === 0 || r === rows - 1 || c === 0 || c === cols - 1) {
        if (board[r][c] === 'O') {
          dfs(r, c);
        }
      }
    }
  }

  // 3. 遍历整个 board，将未被标记的 'O' 变为 'X'，将 'E' 还原为 'O'
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] === 'O') {
        board[r][c] = 'X';
      } else if (board[r][c] === 'E') {
        board[r][c] = 'O';
      }
    }
  }
};

// 2.BFS
var solveBFS = function (board) {
  const rows = board.length, cols = board[0].length, directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  // 先处理边界上的 0，从边界上的 'O' 开始 BFS，将其及其相连的 'O' 标记为 'E'
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (r === 0 || r === rows - 1 || c === 0 || c === cols - 1) {
        let queue = [];

        if (board[r][c] === 'O') {
          queue.push([r, c]);
          board[r][c] = 'E';

          while (queue.length) {
            const [r, c] = queue.shift();
            for (const [dr, dc] of directions) {
              const newR = r + dr, newC = c + dc;
              if (newR >= 0 && newR < rows && newC >= 0 && newC < cols && board[newR][newC] === 'O') {
                queue.push([newR, newC]);
                board[newR][newC] = 'E';
              }
            }
          }
        }
      }
    }
  }

  // 遍历整个 board，将未被标记的 'O' 变为 'X'，将 'E' 还原为 'O'
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] === 'O') {
        board[r][c] = 'X';
      } else if (board[r][c] === 'E') {
        board[r][c] = 'O';
      }
    }
  }
};



// Main Function
solve([["X", "X", "X", "X"], ["X", "O", "O", "X"], ["X", "X", "O", "X"], ["X", "O", "X", "X"]]);
