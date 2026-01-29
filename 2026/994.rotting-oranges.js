/*
 * @lc app=leetcode id=994 lang=javascript
 *
 * [994] Rotting Oranges
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */

// BFS 1
var orangesRotting = function (grid) {
  // queue存放腐烂橘子的位置，不是新鲜橘子的位置
  let queue = [], freshOranges = 0, ROWS = grid.length, COLS = grid[0].length;
  // 1. 先统计所有腐烂橘子的位置，放入队列
  for (let r = 0; r < ROWS; ++r)
    for (let c = 0; c < COLS; ++c)
      if (grid[r][c] == 2) queue.push([r, c]);
      else if (grid[r][c] == 1) freshOranges++;

  // 以上，统计2的位置，以及1有多少个
  // 放入[-1,-1]，表示一轮感染完毕，要断点的原因是因为 queue 里面有第一轮的..第二轮的...如果不放入断点，无法区分每一轮感染完毕
  queue.push("break");

  // Step 2). start the rotting process via BFS
  // 开始计时
  let minutesElapsed = -1, directions = [[-1, 0], [1, 0], [0, 1], [0, -1]];

  console.log(`Before go into the loop the queue is:`);
  console.log(queue);
  console.log();

  while (queue.length !== 0) {
    console.log(queue);

    let p = queue.shift();

    if (p === "break") {
      //表示一轮感染完毕
      minutesElapsed += 1;
      // 如果队列不为空，而且上一轮（遇到“break”之前）的腐烂的橘子已经全部处理完毕了，说明新一轮的腐烂橘子已经加入队列，继续下一轮感染，所以新加入一个断点
      if (queue.length !== 0) queue.push("break");
    } else {
      let row = p[0], col = p[1];
      // 这个腐烂橘子会感染相邻的橘子
      for (let d of directions) {
        let neighborRow = row + d[0], neighborCol = col + d[1];
        if (neighborRow >= 0 && neighborRow < ROWS && neighborCol >= 0 && neighborCol < COLS && grid[neighborRow][neighborCol] == 1) {
          // 这个橘子被感染了
          grid[neighborRow][neighborCol] = 2;
          freshOranges -= 1;
          // 这个橘子的位置加入队列
          queue.push([neighborRow, neighborCol]);
        }
      }
    }
  }

  // return elapsed minutes if no fresh orange left
  return freshOranges == 0 ? minutesElapsed : -1;
};

// BFS2,不用断点的方法
/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
  let m = grid.length, n = grid[0].length, q = [], fresh = 0, dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]], minutes = 0;
  // 先统计所有新鲜橘子数量，以及所有腐烂橘子位置
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) fresh++;
      else if (grid[i][j] === 2) q.push([i, j]);
    }
  }

  while (q.length && fresh > 0) {
    // 或者这一波先记录q的长度，然后处理这么多节点
    let size = q.length, rottedThisMinute = false;

    // 先处理这一波
    for (let k = 0; k < size; k++) {
      const [x, y] = q.shift();

      for (const [dx, dy] of dirs) {
        const nx = x + dx, ny = y + dy;
        // 越界或不是新鲜橘子
        if (nx < 0 || nx >= m || ny < 0 || ny >= n) continue;
        if (grid[nx][ny] !== 1) continue;

        grid[nx][ny] = 2;
        fresh--;
        rottedThisMinute = true;
        q.push([nx, ny]);
      }
    }

    // 这一波处理完毕，分钟数加一
    if (rottedThisMinute) minutes++;
  }

  return fresh === 0 ? minutes : -1;
};
// @lc code=end

orangesRotting([
  [2, 1, 1],
  [1, 1, 0],
  [0, 1, 1],
]);
// @lc code=end
