/*
 * @lc app=leetcode id=200 lang=javascript
 *
 * [200] Number of Islands
 */

// @lc code=start
/**
 * @param {character[][]} grid
 * @return {number}
 */

// 1. DFS O(M×N) O(M×N)
var numIslands = function (grid) {
  if (grid == null || grid.length == 0) {
    return 0;
  }

  let nr = grid.length;
  let nc = grid[0].length;
  let num_islands = 0;
  for (let r = 0; r < nr; ++r) {
    for (let c = 0; c < nc; ++c) {
      if (grid[r][c] == "1") {
        ++num_islands;
        dfs(grid, r, c);
      }
    }
  }

  return num_islands;
};

let dfs = function (grid, r, c) {
  let nr = grid.length;
  let nc = grid[0].length;

  if (r < 0 || c < 0 || r >= nr || c >= nc || grid[r][c] == "0") {
    return;
  }

  grid[r][c] = "0";
  dfs(grid, r - 1, c);
  dfs(grid, r + 1, c);
  dfs(grid, r, c - 1);
  dfs(grid, r, c + 1);
};

// 2.BFS O(M×N) O(min(M, N))[the size of queue can grow up to min(M,NM,N)]
let numIslands2 = function (grid) {
  if (grid == null || grid.length == 0) {
    return 0;
  }

  let nr = grid.length;
  let nc = grid[0].length;
  let num_islands = 0;

  for (let r = 0; r < nr; ++r) {
    for (let c = 0; c < nc; ++c) {
      if (grid[r][c] == "1") {
        ++num_islands;
        grid[r][c] = "0"; // mark as visited
        let neighbors = [];
        neighbors.add(r * nc + c);
        while (neighbors.length !== 0) {
          let id = neighbors.shift();
          let row = id / nc;
          let col = id % nc;
          if (row - 1 >= 0 && grid[row - 1][col] == "1") {
            neighbors.push((row - 1) * nc + col);
            grid[row - 1][col] = "0";
          }
          if (row + 1 < nr && grid[row + 1][col] == "1") {
            neighbors.push((row + 1) * nc + col);
            grid[row + 1][col] = "0";
          }
          if (col - 1 >= 0 && grid[row][col - 1] == "1") {
            neighbors.push(row * nc + col - 1);
            grid[row][col - 1] = "0";
          }
          if (col + 1 < nc && grid[row][col + 1] == "1") {
            neighbors.push(row * nc + col + 1);
            grid[row][col + 1] = "0";
          }
        }
      }
    }
  }

  return num_islands;
};

// Solution 3: Union Find Next Time

// @lc code=end
