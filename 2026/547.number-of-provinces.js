/*
 * @lc app=leetcode id=547 lang=javascript
 *
 * [547] Number of Provinces
 */

// @lc code=start
/**
 * @param {number[][]} isConnected
 * @return {number}
 */

// DFS的方法
// loop 二维数组, 如果发现 isConnected(i,j) == 1，dfs(i,j)，dfs 中先将 isConnected(i,j) 标记为访问过，然后继续找和 j 相连的点 k，dfs(j,k)，直到把所有和 i 相连的点都标记为访问过，
// 这样每次发现一个新的 isConnected(i,j) == 1，就代表发现了一个新的省份，结果加一

var findCircleNum = function (isConnected) {
  if (isConnected.length === 0) {
    return 0;
  }

  let len = isConnected.length, result = 0;

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < isConnected[i].length; j++) {
      if (isConnected[i][j] === 1) {
        result++;
        // 如果j和i相连，找到所有和i，j相连的点，mark them as visited
        dfs(i, j);
      }
    }
  }

  var dfs = function (i, j) {
    if (isConnected[i][j] === "#") {
      return;
    }
    //mark it visited
    isConnected[i][j] = "#";

    // 现在固定看j，找到所有和j相连的点，mark them as visited
    for (let k = 0; k < isConnected[j].length; k++) {
      if (isConnected[j][k] === 1) {
        dfs(j, k);
      }
    }
  };

  return result;
};

/* Solution 2: 用visited */
var findCircleNum = function (isConnected) {
  const n = isConnected.length, visited = new Set();
  for (let i = 0; i < n; i++) {
    if (!visited.has(i)) {
      // 访问节点
      dfs(i);
      ans++;
    }
  }
  const dfs = (i) => {
    for (let j = 0; j < n; j++) {
      if (isConnected[i][j] === 1 && !visited.has(j)) {
        visited.add(j);
        dfs(j);
      }
    }
  };
  let ans = 0;
  return ans;
};

// Solution 3: BFS
var findCircleNum = function (isConnected) {
  let n = isConnected.length, visited = new Set(), ans = 0, queue = [];
  for (let i = 0; i < n; i++) {
    if (!visited.has(i)) {
      queue = [i];

      while (queue.length) {
        const city = queue.shift();
        for (let j = 0; j < n; j++) {
          if (isConnected[city][j] === 1 && !visited.has(j)) {
            visited.add(j);
            queue.push(j);
          }
        }
      }
      ans++;
    }
  }
  return ans;
};

// Solution 3: Union Find
import UF from '../Algorithm/union-find.js';
var findCircleNum = function (isConnected) {
  let n = isConnected.length;
  let uf = new UF(n);
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      // 如果两个城市是相连的，那么它们属于同一个连通分量
      if (isConnected[i][j] === 1) {
        uf.union(i, j);
      }
    }
  }
  return uf.getCount();
}
// @lc code=end
