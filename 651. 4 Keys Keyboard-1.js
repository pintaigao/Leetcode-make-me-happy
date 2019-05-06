var maxA = function (n) {
  let dp = [];
  for (let i = 0; i <= n; i++) {
    console.log("In loop i is:" + i);
    dp[i] = i;
    if (i === 5) {
      console.log(dp);
    }
    for (let j = 1; j <= i - 3; j++) {
      console.log("In loop j is:" + j);
      dp[i] = Math.max(dp[i], dp[j] * (i - j - 3 + 1) + dp[j]);
    }
  }
  console.log(dp);
  return dp[n];

};

maxA(11);