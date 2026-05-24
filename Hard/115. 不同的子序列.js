var numDistinct = function (s, t) {
  let memo = Array.from({ length: s.length }, () => Array(t.length).fill(-1)), m = s.length, n = t.length, res = 0;
  // 定义：该函数返回 s[i..] 中的子序列 t[j..] 的数量
  // @visualize status(i, j)
  // i, j 分别是 s 和 t 的索引
  var dp = function (i, j) {
    if (j == n) {
      // 子序列全部匹配完成
      return 1;
    }
    if (n - j > m - i) {
      // 待匹配子序列的长度不应该比字符串的长度还要短
      return 0;
    }
    if (memo[i][j] != -1) {
      // 已经计算过对应状态
      return memo[i][j];
    }
    // 状态转移方程
    if (s.charAt(i) == t.charAt(j)) {
      // 可以选择匹配 s[i] 和 t[j]，也可以选择不匹配 s[i] 从而看看后面有没有
      res += dp(i + 1, j + 1) + dp(i + 1, j);
    } else {
      res += dp(i + 1, j);
    }

    memo[i][j] = res;
    return res;
  }

  console.log(memo);

  return dp(0, 0);
};

numDistinct("rabbbit", "rabbit");

// DP 的方法
var numDistinct = function (s, t) {
  const n = s.length, m = t.length, dp = Array.from({ length: s.length + 1 }, () => Array(t.length + 1).fill(0))
  for (let i = 0; i <= n; i++) {
    dp[i][0] = 1
  }
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (s[i - 1] === t[j - 1]) {
        // s和t的当前字符相等的时候，可以选择将s和t都前移，也可以选择只前移s，t不前移，个数就是两者相加
        // 比如s = "rabbbit", t = "rabbit"，当s和t都在第一个b的时候，可以选择s和t都前移，也可以选择只前移s，不前移t
        // 如果我不用当前这个 s[i - 1]，那问题就变成：用 s 前 i - 1 个字符，去组成 t 前 j 个字符，有多少种方式？
        // 使用 s[i - 1]：用 s 前 i - 1 个字符，去组成 t 前 j - 1 个字符，有多少种方式
        // 不用当前字符的方式数 + 使用当前字符的方式数
        // dp[i - 1][j]：s=abcd 和 t=ac， 在s，t都在c这个位置，用s的c => ab和 a 有多少种方式；不用s的c => ab 和 ac 有多少种方式（而不是ab和a，因为接下来是ab...d 和 ac相比较，b和d相比较）
        dp[i][j] = dp[i - 1][j] + dp[i - 1][j - 1]
      } else {
        // 当S[j] != T[i]时，那么出现个数不变，dp自然就延续前一个值，即dp[i][j] = dp[i][j-1]
        dp[i][j] = dp[i - 1][j]
      }
    }
  }
  return dp[n][m]
};


// 练习
var numDistinct10 = () => {

}