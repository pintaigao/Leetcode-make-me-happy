using System;
using System.Collections.Generic;

public class Solution {
  public void Solve(char[][] board) {
    int rows = board.Length;
    int cols = board[0].Length;
    int[][] directions = new int[][] { new int[] { 1, 0 }, new int[] { -1, 0 }, new int[] { 0, 1 }, new int[] { 0, -1 } };
    // 1. 定义 DFS 函数
    void Dfs(int r, int c) {
      if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] != 'O') {
        return;
      }
      board[r][c] = 'E';
      foreach (int[] dir in directions) {
        Dfs(r + dir[0], c + dir[1]);
      }
    }
    // 2. 先处理边界上的 O
    // 从边界上的 'O' 开始 DFS，将其及其相连的 'O' 标记为 'E'
    // 目的是怕后面遍历的时候误将这些 'O' 变为 'X'
    for (int r = 0; r < rows; r++) {
      for (int c = 0; c < cols; c++) {
        if (r == 0 || r == rows - 1 || c == 0 || c == cols - 1) {
          if (board[r][c] == 'O') {
            Dfs(r, c);
          }
        }
      }
    }
    // 3. 遍历整个 board
    // 将未被标记的 'O' 变为 'X'
    // 将 'E' 还原为 'O'
    for (int r = 0; r < rows; r++) {
      for (int c = 0; c < cols; c++) {
        if (board[r][c] == 'O') {
          board[r][c] = 'X';
        }
        else if (board[r][c] == 'E') {
          board[r][c] = 'O';
        }
      }
    }
  }
  public void SolveBFS(char[][] board) {
    int rows = board.Length;
    int cols = board[0].Length;

    int[][] directions = new int[][] { new int[] { 1, 0 }, new int[] { -1, 0 }, new int[] { 0, 1 }, new int[] { 0, -1 } };

    // 先处理边界上的 O
    // 从边界上的 'O' 开始 BFS，将其及其相连的 'O' 标记为 'E'
    for (int r = 0; r < rows; r++) {
      for (int c = 0; c < cols; c++) {
        if (r == 0 || r == rows - 1 || c == 0 || c == cols - 1) {
          if (board[r][c] == 'O') {
            Queue<(int row, int col)> queue = new Queue<(int row, int col)>();
            queue.Enqueue((r, c));
            board[r][c] = 'E';

            while (queue.Count > 0) {
              var cur = queue.Dequeue();
              int curR = cur.row;
              int curC = cur.col;

              foreach (int[] dir in directions) {
                int newR = curR + dir[0];
                int newC = curC + dir[1];

                if (newR >= 0 && newR < rows && newC >= 0 && newC < cols && board[newR][newC] == 'O') {
                  queue.Enqueue((newR, newC));
                  board[newR][newC] = 'E';
                }
              }
            }
          }
        }
      }
    }

    // 遍历整个 board
    // 将未被标记的 'O' 变为 'X'
    // 将 'E' 还原为 'O'
    for (int r = 0; r < rows; r++) {
      for (int c = 0; c < cols; c++) {
        if (board[r][c] == 'O') {
          board[r][c] = 'X';
        }
        else if (board[r][c] == 'E') {
          board[r][c] = 'O';
        }
      }
    }
  }
}