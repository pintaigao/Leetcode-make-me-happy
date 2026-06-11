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
import { UF } from "../Algorithm/图/union-find.js"
var solve3 = function (board) {
  if (board.length === 0) return;
  // 给 dummy 留一个额外位置
  // 方向数组 d 是上下左右搜索的常用手法
  const m = board.length, n = board[0].length, uf = new UF(m * n + 1), dummy = m * n, direction = [[1, 0], [0, 1], [0, -1], [-1, 0]];

  // 将首列和末列的 O 与 dummy 连通 // 将首行和末行的 O 与 dummy 连通
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // 首行,首列, 末行,末列
      if ((i == 0 || i == m - 1 || j == 0 || j == n - 1) && board[i][j] == 'O') { uf.union(n * i + j, dummy) }
    }
  }

  console.log(uf.parent);


  // 只看场内的
  for (let i = 1; i < m - 1; i++)
    for (let j = 1; j < n - 1; j++)
      if (board[i][j] === 'O') {
        console.log(i, j);
        // 将上下左右的 O 和此 O 相连通 uf.union（从此，接到此 root），相当于像 bfs 一样
        for (let [nx, ny] of direction) {
          const x = i + nx, y = j + ny;
          if (board[x][y] === 'O') {
            console.log(x, y);
            // 我的问题：不用看 visited 没 visited 吗？不会重复 union 吗？答，不会，假设‘O1‘，‘O2‘， 在 O1 将 O2 连接到 O1，然后在 O2 的时候，将 O1 连接到O2，但是前一步 O2 的 root 已经是 O1 了，所以相当于还是 union(O1, O1)
            // 所以这里, 两种写法都可以
            uf.union(x * n + y, i * n + j); // 将下一个“所对应的root“，接到此“所对应的root“，所以当下一个是edge 的时候parent[edge] = dumny dumny 接到了此 即 parent[dumny] = 此，所以感官上parent[dumny] = dumny，语义上不通但是可行
            // uf.union(i * n + j, x * n + y); // 将此“所对应的 root“，接到下一个

            console.log(uf.parent);
          }
        }
      }
  // 所有不和 dummy 连通的 O，都要被替换
  for (let i = 1; i < m - 1; i++)
    for (let j = 1; j < n - 1; j++)
      // 如果上面是“将下一个，接到此“，则 paren[dummy] 不是 dumny，而是board[i][j]的值
      if (!uf.connected(dummy, i * n + j))
        board[i][j] = 'X';
};

// Main Function
let board =
  [["X", "X", "X", "X"],
  ["X", "O", "O", "X"],
  ["X", "X", "O", "X"],
  ["X", "O", "O", "X"]];
solve3(board);
// console.log(board);
