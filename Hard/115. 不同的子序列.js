// DFS的方法
var numDistinct = function (s, t) {

  // memo 记录的是
  let memo = Array.from({ length: s.length }, () => Array(t.length).fill(-1)), m = s.length, n = t.length, res = 0;
  // 定义：该函数返回 s[i..] 中的子序列 t[j..] 的数量
  // i, j 分别是 s 和 t 的索引
  // 因为 dp 传了两个参数（两个状态），所以 memo 可以是一个二维数组（代表我看到 i，j 这个时候的记录）
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
      // 可以选择匹配 s[i] 和 t[j]（即看 s[i+1] 和 t[j+1]），也可以选择不匹配 s[i] 从而看看后面有没有 （即 t 这个位置保持不动，不选择当前 s[i]而是选择s[i+1]和 t[j]相匹配）
      res += dp(i + 1, j + 1) + dp(i + 1, j);
    } else {
      // 如果不相等，只能选择s 中后一位和当前t[j]相匹配
      res += dp(i + 1, j);
    }

    // i，j 这个情况下往后的情况我都计算过了，所以 1.memo[i][j] = res; 2. return res;
    memo[i][j] = res;
    return res;
  }

  console.log(memo);

  return dp(0, 0);
};

numDistinct("rabbbit", "rabbit");

// 另外一个 DFS with Memo 的方法
var numDistinct = function (s, t) {
  const memo = new Map();

  function dfs(i, j) {
    if (j === t.length) return 1;
    if (i === s.length) return 0;

    const key = `${i},${j}`;
    if (memo.has(key)) return memo.get(key);

    let result = 0;

    if (s[i] === t[j]) {
      result = dfs(i + 1, j + 1) + dfs(i + 1, j);
    } else {
      result = dfs(i + 1, j);
    }

    memo.set(key, result);
    return result;
  }

  return dfs(0, 0);
};

// DP buttom up 的方法
var numDistinct = function (s, t) {
  // dp: 用 s 的前 i 个字符，组成 t 的前 j 个字符，有多少种方式
  const n = s.length, m = t.length, dp = Array.from({ length: s.length + 1 }, () => Array(t.length + 1).fill(0))
  for (let i = 0; i <= n; i++) {
    // t 是空字符串时，任何 s 都有一种方式组成它：什么都不选。
    dp[i][0] = 1
  }
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      // 比较s[i - 1] 和 t[j - 1]，因为 dp[i][j] 表示前 i 个和前 j 个。
      if (s[i - 1] === t[j - 1]) { // 代表字符
        // s和t的当前字符相等的时候，可以选择将s和t都前移，也可以选择只前移s，t不前移，个数就是两者相加
        // 比如s = "rabbbit", t = "rabbit"，当s和t都在第一个b的时候，可以选择s和t都前移（即当前 b 选择匹配），也可以选择只前移s（s 当前的 b 不选则匹配，跳过它），不前移t（保持 t 的位置，下一个 s 的位置来和它匹配）
        // 如果我不用当前这个 s[i - 1]，那问题就变成：用 s 前 i - 1 个字符，去组成 t 前 j 个字符，有多少种方式？
        // 使用 s[i - 1]：用 s 前 i - 1 个字符，去组成 t 前 j - 1 个字符，有多少种方式
        // 不用当前字符的方式数（即 s 的前 i-1 个（现在看的是 i）和 t 的前j个（现在看的是 j）） + 使用当前字符的方式数
        dp[i][j] = dp[i - 1][j] + dp[i - 1][j - 1]
      } else {
        // 当S[i] != T[j]时，那么出现个数不变，dp自然就延续前一个值，即dp[i][j] = dp[i-1][j]
        dp[i][j] = dp[i - 1][j]
      }
    }
  }
  return dp[n][m]
};
