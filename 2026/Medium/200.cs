using System;

public class Solution {
  public int NumIslands(char[][] grid) {
    if (grid == null || grid.Length == 0) {
      return 0;
    }

    int numIslands = 0;

    void Dfs(int r, int c) {
      if (r < 0 || c < 0 || r >= grid.Length || c >= grid[0].Length || grid[r][c] == '0') {
        return;
      }

      grid[r][c] = '0';

      Dfs(r - 1, c);
      Dfs(r + 1, c);
      Dfs(r, c - 1);
      Dfs(r, c + 1);
    }

    for (int r = 0; r < grid.Length; r++) {
      for (int c = 0; c < grid[0].Length; c++) {
        if (grid[r][c] == '1') {
          numIslands++;
          Dfs(r, c);
        }
      }
    }

    return numIslands;
  }
}