/*
 * @lc app=leetcode id=1091 lang=javascript
 *
 * [1091] Shortest Path in Binary Matrix
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */

var shortestPathBinaryMatrix = function (grid) {
  if (grid[0][0] === 1) return -1;
  const POINT = [
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
  ];
  let [m, n, queue] = [grid.length, grid[0].length, [[0, 0]]];
  // BFS是在尝试所有的可能路径，哪个最快到达终点，哪个就是最短
  while (queue.length) {
    let [i, j] = queue.shift();
    if (i === m - 1 && j === n - 1) return grid[i][j] + 1; // 总单元格数
    POINT.forEach((p) => {
      let [x, y] = [i + p[0], j + p[1]];
      if (x < 0 || x >= m || y < 0 || y >= n || grid[x][y] !== 0) return;
      grid[x][y] = grid[i][j] + 1; // 记录单元格数量
      queue.push([x, y]);
    });
  }
  return -1;
};
// @lc code=end
