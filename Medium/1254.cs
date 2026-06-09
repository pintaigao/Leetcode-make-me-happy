using System;
using System.Collections.Generic;

public class Solution {
  public int ClosedIsland(int[][] grid) {
    int count = 0;
    int[][] directions = new int[][] { new int[] { 0, 1 }, new int[] { 0, -1 }, new int[] { -1, 0 }, new int[] { 1, 0 } };

    // First we will define a dfs function that takes the current cell's coordinates as parameters.
    void Dfs(int i, int j) {
      // First we define a termination condition for the DFS.
      // If the current cell is out of bounds or is water (1), we will return immediately.
      if (i < 0 || i >= grid.Length || j < 0 || j >= grid[0].Length || grid[i][j] == 1) {
        return;
      }

      // After the termination condition, we will mark the current cell as visited
      // by changing its value to 1 (water).
      grid[i][j] = 1;

      // Then we will recursively call the DFS function for the four adjacent cells.
      foreach (int[] dir in directions) {
        Dfs(i + dir[0], j + dir[1]);
      }
    }

    // If we meet the edge, we will flood fill it to water,
    // so that we can exclude those islands connected to the edge.
    for (int i = 0; i < grid.Length; i++) {
      for (int j = 0; j < grid[0].Length; j++) {
        // If the current cell is in the first or last row,
        // or in the first or last column, and the value is 0
        if ((i == 0 || i == grid.Length - 1 || j == 0 || j == grid[0].Length - 1) && grid[i][j] == 0) {
          // We will flood fill it to water.
          Dfs(i, j);
        }
      }
    }

    // After excluding those islands connected to the edge,
    // count the number of closed islands.
    for (int i = 1; i < grid.Length - 1; i++) {
      for (int j = 1; j < grid[0].Length - 1; j++) {
        if (grid[i][j] == 0) {
          count++;
          Dfs(i, j);
        }
      }
    }

    return count;
  }
}