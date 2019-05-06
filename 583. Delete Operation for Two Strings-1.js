var minDistance = function (word1, word2) {
  let m = word1.length;
  let n = word2.length;
  let dp = [];
  dp[0]= new Array(word2.length+1).fill(0);

  for (let i = 1; i <= m; i++) {
    dp[i] = new Array(word2.length+1).fill(0);
    
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  console.log(dp);
  return m + n - 2 * dp[m][n];
};

minDistance("delete","leet");