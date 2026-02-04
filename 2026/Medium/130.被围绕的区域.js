/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
// 1.DFS
var solve = function (board) {
  const rows = board.length, cols = board[0].length, directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  // 1. 定义 DFS 函数
  const dfs = (r, c) => {
    if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== 'O') {
      return;
    }
    board[r][c] = 'E';
    for (const [dr, dc] of directions) {
      dfs(r + dr, c + dc);
    }
  };

  // 2. 先处理边界上的 0（以及和这个 0 相连的其他 0），从边界上的 'O' 开始 DFS，将其及其相连的 'O' 标记为 'E', 目的是怕后面遍历的时候误将这些 'O' 变为 'X'，怕后面被影响到
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

        if (board[r][c] === 'O') {
          let queue = [[r, c]];
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


// 3. 并查集
import { UF } from "../../Algorithm/union-find.js"
var solve3 = function (board) {
  if (board.length === 0) return;

  const m = board.length;
  const n = board[0].length;
  // 给 dummy 留一个额外位置
  const uf = new UF(m * n + 1);
  const dummy = m * n;
  // 将首列和末列的 O 与 dummy 连通
  for (let i = 0; i < m; i++) {
    if (board[i][0] === 'O')
      uf.union(i * n, dummy);
    if (board[i][n - 1] === 'O')
      uf.union(i * n + n - 1, dummy);
  }
  // 将首行和末行的 O 与 dummy 连通
  for (let j = 0; j < n; j++) {
    if (board[0][j] === 'O')
      uf.union(j, dummy);
    if (board[m - 1][j] === 'O')
      uf.union(n * (m - 1) + j, dummy);
  }
  // 方向数组 d 是上下左右搜索的常用手法
  const d = [[1, 0], [0, 1], [0, -1], [-1, 0]];
  for (let i = 1; i < m - 1; i++)
    for (let j = 1; j < n - 1; j++)
      if (board[i][j] === 'O')
        // 将此 O 与上下左右的 O 连通
        for (let k = 0; k < 4; k++) {
          const x = i + d[k][0];
          const y = j + d[k][1];
          if (board[x][y] === 'O')
            uf.union(x * n + y, i * n + j);
        }
  // 所有不和 dummy 连通的 O，都要被替换
  for (let i = 1; i < m - 1; i++)
    for (let j = 1; j < n - 1; j++)
      if (!uf.connected(dummy, i * n + j))
        board[i][j] = 'X';
};


// Main Function
let board = [["X", "X", "X", "X"], ["X", "O", "O", "X"], ["X", "X", "O", "X"], ["X", "O", "X", "X"]];
solve3(board);
console.log(board);


