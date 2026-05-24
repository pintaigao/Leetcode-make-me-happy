using System;
using System.Collections.Generic;

public class Solution {
  public IList<IList<string>> SolveNQueens(int n) {
    IList<IList<string>> res = new List<IList<string>>();
    List<string> board = new List<string>();

    // 生成 ["....", "....", "....", "...."]
    for (int i = 0; i < n; i++) {
      board.Add(new string('.', n));
    }

    void Backtrack(int row) {
      // 触发结束条件
      if (row == board.Count) {
        res.Add(new List<string>(board));
        return;
      }

      for (int col = 0; col < board[row].Length; col++) {
        // 检查是否可以放这里
        if (IsValid(row, col)) {
          // 做选择
          char[] newRow = board[row].ToCharArray();
          newRow[col] = 'Q';
          board[row] = new string(newRow);

          // 进入下一行决策
          Backtrack(row + 1);

          // 撤销选择
          newRow[col] = '.';
          board[row] = new string(newRow);
        }
      }
    }

    bool IsValid(int row, int col) {
      // 检查列是否有皇后互相冲突
      for (int i = 0; i < row; i++) {
        if (board[i][col] == 'Q') {
          return false;
        }
      }

      // 检查右上方是否有皇后互相冲突
      for (int i = row - 1, j = col + 1; i >= 0 && j < board.Count; i--, j++) {
        if (board[i][j] == 'Q') {
          return false;
        }
      }

      // 检查左上方是否有皇后互相冲突
      for (int i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] == 'Q') {
          return false;
        }
      }

      return true;
    }

    Backtrack(0);
    return res;
  }
}