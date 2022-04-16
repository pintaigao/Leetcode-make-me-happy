/*
 * @lc app=leetcode id=892 lang=javascript
 *
 * [892] Surface Area of 3D Shapes
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var surfaceArea = function (grid) {
  let res = 0,
    n = grid.length;
  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < n; ++j) {
      // 如果这个位置有方块，他们的总表面积 grid[i][j] * 4 + 2
      if (grid[i][j] > 0) res += grid[i][j] * 4 + 2;
      // 上下相邻的方块，减掉和上面相比最矮的面的面积
      if (i > 0) res -= Math.min(grid[i][j], grid[i - 1][j]) * 2;
      // 左右相邻的方块，减掉和左面相比最矮的面的面积
      if (j > 0) res -= Math.min(grid[i][j], grid[i][j - 1]) * 2;
    }
  }
  return res;
};
// @lc code=end
