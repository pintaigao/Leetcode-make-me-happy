/*
 * @lc app=leetcode id=329 lang=javascript
 *
 * [329] Longest Increasing Path in a Matrix
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {number}
 */

/* 1. BFS 超时 */
var longestIncreasingPath = function (matrix) {
  // 从每个点出发，看它能扩散多远
  let [m, n, queue, ans, dirs] = [matrix.length, matrix[0].length, [], 0, [[1, 0], [-1, 0], [0, 1], [0, -1]]];

  // BFS开始，需要将所有节点都加入初始队列
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      queue.push([i, j]);
    }
  }

  while (queue.length) {
    ans++;
    // 内层循环表示一次处理一批，这一批都是相同路径长度的
    let size = queue.length;
    for (let c = 0; c < size; c++) {
      let poll = queue.shift();
      let [i, j] = [poll[0], poll[1]];
      for (let dir of dirs) {
        let [nextI, nextJ] = [i + dir[0], j + dir[1]];
        // 看上下左右有没有比自己大的，有则加入队列，下一批处理
        if (nextI >= 0 && nextJ >= 0 && nextI < m && nextJ < n && matrix[nextI][nextJ] > matrix[i][j]) {
          queue.push([nextI, nextJ]);
        }
      }
    }
  }

  return ans;
};

/* 方法2： 拓扑排序 */
var longestIncreasingPath = function (matrix) {
  // 把符合题目要求的点连起来就是有一张有向无环图
  // 所以我们可以使用多源BFS拓扑排序寻找最短路径的思想在这里寻找最长路径
  let [m, n, queue, ans, dirs] = [matrix.length, matrix[0].length, [], 0, [[1, 0], [-1, 0], [0, 1], [0, -1]]];
  // BFS记录每个节点的出度
  let outDegree = new Array(m).fill(null).map(() => new Array(n).fill(0));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      for (let dir of dirs) {
        let [nextI, nextJ] = [i + dir[0], j + dir[1]];
        // 只要旁边节点的值比它大，它的出度就加1 (就是从它可以向周围几个走)
        if (nextI >= 0 && nextJ >= 0 && nextI < m && nextJ < n && matrix[nextI][nextJ] > matrix[i][j]) {
          outDegree[i][j] += 1;
        }
      }
    }
  }

  // 多源BFS（可以跟上面的循环合在一起）
  // 为了更清晰，这里单独写这个循环， 出度为0（即旁边没有比它更大的）的加入list中
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (outDegree[i][j] == 0) {
        queue.push([i, j]);
      }
    }
  }

  while (queue.length) {
    ans++;
    // 一次遍历一批，每遍历一批，相当于最长路径又加了一
    let size = queue.length;
    for (let c = 0; c < size; c++) {
      let pos = queue.shift();
      let [i, j] = [pos[0], pos[1]];
      // 相当于反向操作
      for (let dir of dirs) {
        let [preI, preJ] = [i + dir[0], j + dir[1]];
        if (preI >= 0 && preI < m && preJ >= 0 && preJ < n && matrix[preI][preJ] < matrix[i][j]) {
          outDegree[preI][preJ] -= 1;
          // 指向当前元素的节点的出度减1，减到0(说明周围没有比它更大的了)就入队
          if (outDegree[preI][preJ] == 0) {
            queue.push([preI, preJ]);
          }
        }
      }
    }
  }

  return ans;
};
// @lc code=end

// DFS 拓扑排序
var longestIncreasingPath = function (matrix) {
  const m = matrix.length;
  const n = matrix[0].length;

  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ];

  const visited = Array.from({ length: m }, () => Array(n).fill(false));
  const order = [];

  function dfs(row, col) {
    visited[row][col] = true;

    for (const [dr, dc] of dirs) {
      const nextRow = row + dr;
      const nextCol = col + dc;

      if (
        nextRow < 0 ||
        nextRow >= m ||
        nextCol < 0 ||
        nextCol >= n
      ) {
        continue;
      }

      // edge: current cell -> larger neighbor
      if (matrix[nextRow][nextCol] > matrix[row][col]) {
        if (!visited[nextRow][nextCol]) {
          dfs(nextRow, nextCol);
        }
      }
    }

    // postorder
    order.push([row, col]);
  }

  // 1. Run DFS from every cell to get topological order
  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      if (!visited[row][col]) {
        dfs(row, col);
      }
    }
  }

  // postorder gives reverse topological order
  order.reverse();

  // 2. DP on topological order
  const dp = Array.from({ length: m }, () => Array(n).fill(1));

  let answer = 1;

  for (const [row, col] of order) {
    for (const [dr, dc] of dirs) {
      const nextRow = row + dr;
      const nextCol = col + dc;

      if (
        nextRow < 0 ||
        nextRow >= m ||
        nextCol < 0 ||
        nextCol >= n
      ) {
        continue;
      }

      if (matrix[nextRow][nextCol] > matrix[row][col]) {
        dp[nextRow][nextCol] = Math.max(
          dp[nextRow][nextCol],
          dp[row][col] + 1
        );

        answer = Math.max(answer, dp[nextRow][nextCol]);
      }
    }
  }

  return answer;
};


// 练习: 基础 DFS
var longestIncreasingPath10 = function (matrix) {
  let direction = [[1, 0], [-1, 0], [0, 1], [0, -1]], res = 0


  function traveler(i, j, step) {
    res = Math.max(res, step);

    for (let [x, y] of direction) {
      let nx = x + i, ny = y + j

      if ((nx >= 0 && nx < matrix.length && ny >= 0 && ny < matrix[0].length) && matrix[nx][ny] > matrix[i][j]) {
        traveler(nx, ny, step + 1);
      }
    }
  }


  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      traveler(i, j, 1);
    }
  }

  return res
}

// 以上会超时，现在 DFS 带 Memo
var longestIncreasingPath = function (matrix) {
  let m = matrix.length, n = matrix[0].length, memo = Array.from({ length: m }, () => Array(n).fill(0)), dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]], answer = 0;

  function dfs(row, col) {
    let best = 1;

    if (memo[row][col] !== 0) {
      return memo[row][col];
    }

    for (const [dr, dc] of dirs) {
      const nextRow = row + dr, nextCol = col + dc;

      if (nextRow >= 0 && nextRow < m && nextCol >= 0 && nextCol < n && matrix[nextRow][nextCol] > matrix[row][col]) {
        best = Math.max(best, 1 + dfs(nextRow, nextCol));
      }
    }

    // 这个位置上的最长递增路径长度
    memo[row][col] = best;
    return best;
  }

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      answer = Math.max(answer, dfs(row, col));
    }
  }

  return answer;
};

// Bottom up 的 DP
var longestIncreasingPath = function (matrix) {
  const m = matrix.length;
  const n = matrix[0].length;

  const cells = [];

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      cells.push([matrix[row][col], row, col]);
    }
  }

  cells.sort((a, b) => a[0] - b[0]);

  const dp = Array.from({ length: m }, () => Array(n).fill(1));

  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ];

  let answer = 1;

  for (const [value, row, col] of cells) {
    for (const [dr, dc] of dirs) {
      const nextRow = row + dr;
      const nextCol = col + dc;

      if (
        nextRow < 0 ||
        nextRow >= m ||
        nextCol < 0 ||
        nextCol >= n
      ) {
        continue;
      }

      if (matrix[nextRow][nextCol] > value) {
        dp[nextRow][nextCol] = Math.max(
          dp[nextRow][nextCol],
          dp[row][col] + 1
        );

        answer = Math.max(answer, dp[nextRow][nextCol]);
      }
    }
  }

  return answer;
};

