/*
 * @lc app=leetcode id=694 lang=javascript
 *
 * [694] Number of Distinct Islands
 */
/**
 * @param {number[][]} grid
 * @return {number}
 */
var numDistinctIslands = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const set = new Set();
  let cnt = 0;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        let path = [];
        dfs(i, j, path, '#');
        console.log(path);
        console.log();
        path = path.join('');
        if (!set.has(path)) {
          set.add(path);
          cnt++;
        }
      }
    }
  }

  return cnt;

  function dfs(i, j, path, dir) {
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === 0) {
      path.push('*');
      // 没必要再进行下去了
      return;
    }

    grid[i][j] = 0;
    path.push(dir);
    dfs(i - 1, j, path, '#');
    dfs(i + 1, j, path, '#');
    dfs(i, j - 1, path, '#');
    dfs(i, j + 1, path, '#');
  }
};

numDistinctIslands([[1,1,0,1,1],[1,0,0,0,0],[0,0,0,0,1],[1,1,0,1,1]]);

