/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
function minDistance(word1, word2) {
  // 获取两个字符串的长度
  const [m, n, dp] = [word1.length, word2.length, Array.from({ length: word1.length + 1 }, () => Array(word2.length + 1).fill(0))]; // word1 的长度, word2 的长度, 

  // 填充第一列：将 word1 转为空字符串所需的操作次数
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i; // 只能通过删除操作实现
  }

  // 填充第一行：将空字符串转为 word2 所需的操作次数
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j; // 只能通过插入操作实现
  }

  // 填充 dp 表，逐步计算每个子问题的解
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      // 如果当前字符相同，不需要额外操作
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]; // 延续前面的最优解
      } else {
        // 否则，从插入、删除、替换三种操作中选择最小的代价
        dp[i][j] = Math.min(
          dp[i - 1][j],    // 删除操作
          dp[i][j - 1],    // 插入操作
          dp[i - 1][j - 1] // 替换操作
        ) + 1; // 当前操作需要加 1
      }
    }
  }

  // 返回最终的编辑距离，即 dp[m][n]
  return dp[m][n];
}

// 暴力解法 自顶向下递归
var minDistance1 = function (s1, s2) {
  let m = s1.length, n = s2.length;
  // i，j 初始化指向最后一个索引

  // 定义：返回 s1[0..i] 和 s2[0..j] 的最小编辑距离
  var dp = function (i, j) {
    // base case
    if (i == -1) return j + 1;
    if (j == -1) return i + 1;

    if (s1.charAt(i) == s2.charAt(j)) {
      // 啥都不做
      return dp(i - 1, j - 1);
    }
    return Math.min(
      // 插入
      dp(i, j - 1) + 1,
      // 删除
      dp(i - 1, j) + 1,
      // 替换
      dp(i - 1, j - 1) + 1,
    );
  }

  return dp(m - 1, n - 1);
}

// 对以上暴力解法带备忘录的优化
var minDistance2 = function (s1, s2) {
  let m = s1.length, n = s2.length;
  // 备忘录初始化为特殊值，代表还未计算
  // 为什么要用二维数组的形式？ 因为双指针i，j
  let memo = Array.from({length: m}, () => new Array(n).fill(-1));

  function dp(i,j) {
    if (i == -1) return j + 1;
    if (j == -1) return i + 1;
    // 查备忘录，避免重叠子问题
    if (memo[i][j] != -1) {
      return memo[i][j];
    }
    // 状态转移，结果存入备忘录
    if (s1.charAt(i) == s2.charAt(j)) {
      memo[i][j] = dp(i - 1, j - 1);
    } else {
      memo[i][j] = Math.min(
        dp(i, j - 1) + 1,
        dp(i - 1, j) + 1,
        dp(i - 1, j - 1) + 1
      );
    }
    return memo[i][j];
  }
  
 dp(m - 1, n - 1);
 console.log(memo);
};

// 2.DP table 解法
