/*
 * @lc app=leetcode id=934 lang=javascript
 *
 * [934] Shortest Bridge
 */

// @lc code=start
/**
 * @param {number[][]} A
 * @return {number}
 */

// DFS find the island -> BFS expand the island
var shortestBridge = function (A) {
  let m = A.length,
    n = A[0].length;
  let visited = new Array(m).fill(null).map(() => Array(n));
  let dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  let q = [];
  let found = false;

  let dfs = function (i, j) {
    if (
      i < 0 ||
      j < 0 ||
      i >= A.length ||
      j >= A[0].length ||
      visited[i][j] ||
      A[i][j] == 0
    ) {
      return;
    }
    visited[i][j] = true;
    q.unshift([i, j]);
    for (let dir of dirs) {
      dfs(i + dir[0], j + dir[1]);
    }
  };

  // 1. dfs to find an (一个) island, mark it in `visited`
  for (let i = 0; i < m; i++) {
    if (found) {
      break;
    }
    for (let j = 0; j < n; j++) {
      if (A[i][j] == 1) {
        dfs(i, j);
        found = true;
        break;
      }
    }
  }

  console.log(visited);
  console.log(q);

  // 2. bfs to expand this island
  let step = 0;
  while (q.length !== 0) {
    let size = q.length;
    while (size > 0) {
      let cur = q.pop();
      for (let dir of dirs) {
        let i = cur[0] + dir[0];
        let j = cur[1] + dir[1];
        if (i >= 0 && j >= 0 && i < m && j < n && !visited[i][j]) {
          if (A[i][j] == 1) {
            return step;
          }
          q.unshift([i, j]);
          visited[i][j] = true;
        }
      }
      size -= 1;
    }
    step++;
  }
  return -1;
};

// @lc code=end
shortestBridge([
  [1, 0, 0],
  [1, 0, 0],
  [0, 0, 1],
]);

// shortestBridge([
//   [1, 1, 1, 1, 1],
//   [1, 0, 0, 0, 1],
//   [1, 0, 1, 0, 1],
//   [1, 0, 0, 0, 1],
//   [1, 1, 1, 1, 1],
// ]);
