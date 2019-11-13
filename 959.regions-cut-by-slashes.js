/*
 * @lc app=leetcode id=959 lang=javascript
 *
 * [959] Regions Cut By Slashes
 */
/**
 * @param {string[]} grid
 * @return {number}
 */
var regionsBySlashes = function (grid) {
  if (!grid.length) return 0;

  const n = grid.length;
  let fields = new Array(n * n * 4);
  let count = n * n * 4; // max regions

  // initialize island ids
  for (let i = 0; i < n * n * 4; i++) {
    fields[i] = i;
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i > 0) union(g(i - 1, j, 2), g(i, j, 0));
      if (j > 0) union(g(i, j - 1, 1), g(i, j, 3));
      if (grid[i][j] !== '/') {
        union(g(i, j, 0), g(i, j, 1));
        union(g(i, j, 2), g(i, j, 3));
      }
      if (grid[i][j] !== '\\') {
        union(g(i, j, 0), g(i, j, 3));
        union(g(i, j, 1), g(i, j, 2));
      }
    }
  }

  function find(x) {
    if (x !== fields[x]) {
      fields[x] = find(fields[x]);
    }
    return fields[x];
  }

  function union(x, y) {
    x = find(x);
    y = find(y);

    if (x !== y) {
      fields[x] = y;
      count--;
    }
  }

  function g(i, j, k) {
    return (i * n + j) * 4 + k;
  }

  return count;
};

