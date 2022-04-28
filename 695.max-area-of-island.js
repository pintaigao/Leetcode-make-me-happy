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

/* Solution 1: DFS的做法 */
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
  if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] == 2 || grid[r][c] == 0) return 0;
  // Mark as visited by setting to 2
  grid[r][c] = 2;
  // Recursive call to find the area of the island
  return 1 + area(r + 1, c, grid) + area(r - 1, c, grid) + area(r, c - 1, grid) + area(r, c + 1, grid);
};

// Solution 2: BFS的做法
var maxAreaOfIsland2 = function (grid) {
  let [ans, row, col] = [0, grid.length, grid[0].length];
  let [dx, dy] = [
    [1, -1, 0, 0],
    [0, 0, 1, -1],
  ];
  // 循环数组
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (grid[i][j] === 0) continue; //循环网格，遇到0就跳过
      let queue = [[i, j]],
        size = 0; //在队列中加入当前网格的值
      while (queue.length > 0) {
        let [x, y] = queue.shift(); //不断出队
        //越界判断
        if (x < 0 || x >= row || y < 0 || y >= col || grid[x][y] === 0) continue;
        size += 1; //更新岛屿的数量
        grid[x][y] = 0; //遍历过的网格置为0
        //上下左右遍历，把下一层的节点加入队列
        for (let k = 0; k < 4; k++) {
          queue.push([x + dx[k], y + dy[k]]);
        }
      }
      ans = Math.max(ans, size); //更新最大岛屿面积
    }
  }
  return ans;
};

// @lc code=end
