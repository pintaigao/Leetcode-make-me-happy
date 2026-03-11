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
/* DFS */
var numIslands = function (grid) {
  if (grid == null || grid.length == 0) {
    return 0;
  }

  let num_islands = 0;
  let dfs = function (r, c) {
    if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] == "0") {
      return;
    }

    grid[r][c] = "0";
    dfs(r - 1, c);
    dfs(r + 1, c);
    dfs(r, c - 1);
    dfs(r, c + 1);
  };

  for (let r = 0; r < grid.length; ++r) {
    for (let c = 0; c < grid[0].length; ++c) {
      if (grid[r][c] == "1") {
        ++num_islands;
        dfs(r, c);
      }
    }
  }

  return num_islands;
};

/* BFS */
let numIslands = function (grid) {
  if (grid == null || grid.length == 0) {
    return 0;
  }

  let count = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] == "1") {
        // 用BFS把所有相邻的都变为visited
        let list = [];
        list.push([i, j]);
        while (list.length) {
          let cur = list.shift();
          let [row, col] = [cur[0], cur[1]];
          if (0 <= row && row < grid.length && 0 <= col && col < grid[0].length && grid[row][col] == "1") {
            grid[row][col] = "0";
            list.push([row + 1, col]);
            list.push([row - 1, col]);
            list.push([row, col + 1]);
            list.push([row, col - 1]);
          }
        }

        count++;
      }
    }
  }
  return count;
};

// @lc code=end
