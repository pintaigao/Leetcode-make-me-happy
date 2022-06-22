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
  const [m, n, directions] = [
    board.length,
    board[0].length,
    [
      [1, 1],
      [1, 0],
      [1, -1],
      [-1, 0],
      [-1, 1],
      [-1, -1],
      [0, 1],
      [0, -1],
    ],
  ];

  const inBound = (x, y) => x >= 0 && x < m && y >= 0 && y < n; // 辅助函数

  const update = (x, y) => {
    if (!inBound(x, y) || board[x][y] != "E") return; // 不在界内或不是E，直接返回
    let count = 0;

    for (let direction of directions) {
      // 统计周围雷的个数
      const [nX, nY] = [x + direction[0], y + direction[1]];
      if (inBound(nX, nY) && board[nX][nY] == "M") {
        count += 1;
      }
    }

    if (count == 0) {
      // 如果周围没有雷，标记B，递归周围的点
      board[x][y] = "B";
      for (let direction of directions) {
        update(x + direction[0], y + direction[1]);
      }
    } else {
      board[x][y] = count + "";
    }
  };

  // 正体
  const [cX, cY] = click;
  if (board[cX][cY] == "M") {
    // 第一下就踩雷了
    board[cX][cY] = "X";
  } else {
    update(cX, cY); // 开启dfs
  }
  return board;
};

/* BFS */
const updateBoard = (board, click) => {
  const [m, n, directions] = [
    board.length,
    board[0].length,
    [
      [1, 1],
      [1, 0],
      [1, -1],
      [-1, 0],
      [-1, 1],
      [-1, -1],
      [0, 1],
      [0, -1],
    ],
  ];
  const inBound = (x, y) => x >= 0 && x < m && y >= 0 && y < n;

  const bfs = (x, y) => {
    const queue = [[x, y]];
    while (queue.length) {
      const [x, y] = queue.shift();
      let count = 0;

      for (let direction of directions) {
        const nX = x + direction[0];
        const nY = y + direction[1];
        if (inBound(nX, nY) && board[nX][nY] == "M") {
          count++;
        }
      }

      if (count == 0) {
        for (let direction of directions) {
          const nX = x + direction[0];
          const nY = y + direction[1];
          if (inBound(nX, nY) && board[nX][nY] == "E") {
            board[nX][nY] = "B"; // 变成一个非E字符就行，标记该节点被访问过了
            queue.push([nX, nY]);
          }
        }
      } else {
        board[x][y] = count + "";
      }
    }
  };

  const [cX, cY] = click;
  if (board[cX][cY] == "M") {
    board[cX][cY] = "X";
  } else {
    board[cX][cY] = "B";
    bfs(cX, cY);
  }
  return board;
};
// @lc code=end
