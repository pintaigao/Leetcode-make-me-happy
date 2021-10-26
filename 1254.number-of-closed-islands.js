/*
 * @lc app=leetcode id=1254 lang=javascript
 *
 * [1254] Number of Closed Islands
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */

// 只有一种情况会失败，就是这个岛碰到edge了
var closedIsland = function (grid) {
  //count the number
  let count = 0;

  let dfs = function (row, col) {
    if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
      return 0; //if we meet the edge return 0;
    }
    if (grid[row][col] == 1) {
      return 1; //if we meet 1 return 1;
    }
    grid[row][col] = 1;
    let up = dfs(row - 1, col);
    let down = dfs(row + 1, col);
    let left = dfs(row, col - 1);
    let right = dfs(row, col + 1);
    if (up === 0 || down == 0 || left == 0 || right == 0) {
      return 0;
    } else {
      return 1;
    }
    // return up & down & left & right; //any of the side meet the edge,is not a island;
  };

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] == 0) {
        count += dfs(i, j);
      }
    }
  }
  return count;
};

// 还有一个BFS的方法
// @lc code=end
