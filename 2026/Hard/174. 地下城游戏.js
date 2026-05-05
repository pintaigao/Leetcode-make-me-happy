var calculateMinimumHP = function (grid) {
  // 备忘录中都初始化为 -1
  let m = grid.length, n = grid[0].length, memo = Array.from({ length: m }, () => Array(n).fill(-1));

  // 备忘录，消除重叠子问题
  // 定义：从 (i, j) 到达右下角，需要的初始血量至少是多少
  // @visualize status(i,j)
  var dp = function (i, j) {
    // base case
    if (i == m - 1 && j == n - 1) {
      return grid[i][j] >= 0 ? 1 : -grid[i][j] + 1;
    }
    if (i == m || j == n) {
      return Number.MAX_SAFE_INTEGER;
    }
    // 避免重复计算
    if (memo[i][j] != -1) {
      return memo[i][j];
    }
    // 状态转移逻辑
    let res = Math.min(dp(i, j + 1), dp(i + 1, j)) - grid[i][j];
    // 骑士的生命值至少为 1
    memo[i][j] = res <= 0 ? 1 : res;

    return memo[i][j];
  };

  return dp(0, 0);
};


// 逆着推上去
var calculateMinimumHP10 = function (grid) {
  let m = grid.length, n = grid[0].length, result = Array.from({ length: m }, () => Array(n).fill(1));

  function caculateMin(num, i, j) {
    if (grid[i][j] > 0 && grid[i][j] >= num) {
      return 1;
    } else if (grid[i][j] > 0 && grid[i][j] < num) {
      return num - grid[i][j];
    } else {
      return num + Math.abs(grid[i][j]);
    }
  }

  for (let i = grid.length - 1; i >= 0; i--) {
    for (let j = grid[0].length - 1; j >= 0; j--) {
      if (i == grid.length - 1 && j == grid[0].length - 1) {
        result[i][j] = caculateMin(1, i, j);
      } else if (i == grid.length - 1) {
        result[i][j] = caculateMin(result[i][j + 1], i, j)
      } else if (j == grid[0].length - 1) {
        result[i][j] = caculateMin(result[i + 1][j], i, j)
      } else {
        result[i][j] = Math.min(caculateMin(result[i][j + 1], i, j), caculateMin(result[i + 1][j], i, j));
      }
    }
  }

  return result[0][0];
};


// 最快的方法
let calculateMinimumHP11 = function (grid) {
  const m = grid.length, n = grid[0].length, dp = Array(m + 1).fill().map(() => Array(n + 1).fill(Infinity))
  dp[m][n - 1] = dp[m - 1][n] = 1
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      // 这样一来，我们就无需担心路径和的问题，只需要关注最小初始值。对于 dp[i][j]，我们只要关心 dp[i][j+1] 和 dp[i+1][j] 的最小值 minn。记当前格子的值为 dungeon(i,j)，那么在坐标 (i,j) 的初始值只要达到 minn−dungeon(i,j) 即可。同时，初始值还必须大于等于 1。这样我们就可以得到状态转移方程
      dp[i][j] = Math.max(Math.min(dp[i + 1][j], dp[i][j + 1]) - grid[i][j], 1)
    }
  }
  return dp[0][0]
}