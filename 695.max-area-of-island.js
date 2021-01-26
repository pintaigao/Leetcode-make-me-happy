/*
 * @lc app=leetcode id=695 lang=javascript
 *
 * [695] Max Area of Island
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */

var maxAreaOfIsland = function (grid) {
  let ans = 0;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === 1) {
        ans = Math.max(ans, area(r, c, grid));
      }
    }
  }
  return ans;
};

let area = function (r, c, grid) {
  if (
    r < 0 ||
    r >= grid.length ||
    c < 0 ||
    c >= grid[0].length ||
    grid[r][c] == 2 ||
    grid[r][c] == 0
  )
    return 0;
  grid[r][c] = 2;
  return (
    1 +
    area(r + 1, c, grid) +
    area(r - 1, c, grid) +
    area(r, c - 1, grid) +
    area(r, c + 1, grid)
  );
};

// @lc code=end
