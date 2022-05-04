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
var findCircleNum = function (isConnected) {
  if (isConnected.length === 0) {
    return 0;
  }

  let len = isConnected.length;
  let result = 0;

  var dfs = function (i, j) {
    if (isConnected[i][j] === "#") {
      return;
    }
    //mark it visited
    isConnected[i][j] = "#";

    // 现在固定看j，找到所有和j相连的点，mark them as visited
    for (let k = 0; k < len; k++) {
      if (isConnected[j][k] === 1) {
        dfs(j, k);
      }
    }
  };

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < isConnected[0].length; j++) {
      if (isConnected[i][j] === 1) {
        result++;
        // 如果j和i相连，找到所有和i，j相连的点，mark them as visited
        dfs(i, j);
      }
    }
  }

  return result;
};

/* Solution 2: 用visited */
var findCircleNum = function (isConnected) {
  const n = isConnected.length;
  const visited = new Set();
  const dfs = (i) => {
    for (let j = 0; j < n; j++) {
      if (isConnected[i][j] === 1 && !visited.has(j)) {
        visited.add(j);
        dfs(j);
      }
    }
  };
  let ans = 0;
  for (let i = 0; i < n; i++) {
    if (!visited.has(i)) {
      // 访问节点
      dfs(i);
      ans++;
    }
  }
  return ans;
};
// @lc code=end
