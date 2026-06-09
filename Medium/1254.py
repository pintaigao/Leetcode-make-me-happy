from typing import List

class Solution:
  def closedIsland(self, grid: List[List[int]]) -> int:
    count = 0
    directions = [[0, 1], [0, -1], [-1, 0], [1, 0]]

    # First we will define a dfs function that takes the current cell's coordinates as parameters.
    def dfs(i, j):
      # First we define a termination condition for the DFS.
      # If the current cell is out of bounds or is water (1), we will return immediately.
      if i < 0 or i >= len(grid) or j < 0 or j >= len(grid[0]) or grid[i][j] == 1:
        return

      # After the termination condition, we will mark the current cell as visited
      # by changing its value to 1 (water).
      grid[i][j] = 1

      # Then we will recursively call the DFS function for the four adjacent cells.
      for direction in directions:
        dfs(i + direction[0], j + direction[1])

    # If we meet the edge, we will flood fill it to water,
    # so that we can exclude those islands connected to the edge.
    for i in range(len(grid)):
      for j in range(len(grid[0])):
        # If the current cell is in the first or last row,
        # or in the first or last column, and the value is 0
        if (i == 0 or i == len(grid) - 1 or j == 0 or j == len(grid[0]) - 1) and grid[i][j] == 0:
          # We will flood fill it to water.
          dfs(i, j)

    # After excluding those islands connected to the edge,
    # count the number of closed islands.
    for i in range(1, len(grid) - 1):
      for j in range(1, len(grid[0]) - 1):
        if grid[i][j] == 0:
          count += 1
          dfs(i, j)

    return count