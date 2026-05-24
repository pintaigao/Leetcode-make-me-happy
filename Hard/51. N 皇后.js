/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  // '.' 表示空，'Q' 表示皇后，初始化空棋盘。
  let res = [], board = [];
  // 输入棋盘边长 n，返回所有合法的放置
  // 生成[[....],[....],[....],[....]]
  for (let i = 0; i < n; i++) {
    board.push(".".repeat(n));
  }
  // 路径：board 中小于 row 的那些行都已经成功放置了皇后
  // 选择列表：第 row 行的所有列都是放置皇后的选择
  // 结束条件：row 超过 board 的最后一行
  var backtrack = function (row) {
    // 触发结束条件
    if (row === board.length) {
      res.push([...board]);
      return;
    }

    for (let col = 0; col < board[row].length; col++) {
      // 排除不合法选择
      if (isValid(row, col)) {
        // 做选择
        let newRow = board[row].split('');
        newRow[col] = 'Q';
        board[row] = newRow.join('');
        // 进入下一行决策
        backtrack(row + 1);
        // 撤销选择
        newRow[col] = '.';
        board[row] = newRow.join('');
      }
    }
  };

  // 是否可以在 board[row][col] 放置皇后？
  var isValid = function (row, col) {
    // 检查列是否有皇后互相冲突
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 'Q') return false;
    }
    // 检查 右上方 和 左上方 是否有皇后互相冲突
    for (let i = row - 1, j = col + 1; i >= 0 && j < board.length; i--, j++) {
      if (board[i][j] === 'Q') return false;
    }
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 'Q') return false;
    }
    return true;
  };

  backtrack(0);

  return res;
};



// 练习
var solveNQueens10 = function (n) {
  let res = [], board = [];
  // 1. 先 生成棋盘
  for (let i = 0; i < n; i++) {
    board.push(".".repeat(n));
  }


}
