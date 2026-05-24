/**
 * @param {number[][]} matrix
 * @return {number}
 */
var minFallingPathSum = function (matrix) {
  let dp = new Array(matrix.length).fill(0).map(() => new Array(matrix[0].length).fill(0));
  for (let i = 0; i < matrix.length; i++) {
    dp[0][i] = matrix[0][i];
  }

  for (let i = 1; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (j == 0) {
        dp[i][j] = matrix[i][j] + Math.min(dp[i - 1][j], dp[i - 1][j + 1]);
      } else if (j == matrix[0].length - 1) {
        dp[i][j] = matrix[i][j] + Math.min(dp[i - 1][j - 1], dp[i - 1][j]);
      } else {
        dp[i][j] = matrix[i][j] + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i - 1][j + 1]);
      }
    }
  }
  return Math.min(...dp[matrix.length - 1]);
};

// 备忘录的方法，自顶向下
var minFallingPathSum2 = function (matrix) {
  const n = matrix.length, res = Number.MAX_VALUE;
  // 备忘录，因为是自顶向下，向下的过程中会有重复计算，所以需要备忘录来存储已经计算过的状态
  const memo = Array.from({ length: n }, () => Array(n).fill(66666));

  // 终点可能在 matrix[n-1] 的任意一列
  for (let j = 0; j < n; j++) {
    res = Math.min(res, dp(n - 1, j));
  }
  // @visualize status(i, j)
  function dp(i, j) {
    // 1、索引合法性检查
    if (i < 0 || j < 0 || i >= matrix.length || j >= matrix[0].length) {
      return 99999;
    }

    // 2、base case
    if (i == 0) {
      return matrix[0][j];
    }

    // 3、查找备忘录，防止重复计算
    if (memo[i][j] != 66666) {
      return memo[i][j];
    }

    // 进行状态转移
    memo[i][j] = matrix[i][j] + Math.min(dp(i - 1, j), dp(i - 1, j - 1), dp(i - 1, j + 1));
    return memo[i][j];
  }

  return res;
}