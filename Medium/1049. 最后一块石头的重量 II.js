var lastStoneWeightII = function (stones) {
  let sum = stones.reduce((acc, stone) => acc + stone, 0);
  // 背包问题状态转移方程
  // 定义：仅使用前 i 个元素，背包容量为 j 时，能够装的最大重量为 dp[i][j]
  let halfSum = Math.floor(sum / 2);
  let dp = Array.from({ length: stones.length + 1 }, () => Array(halfSum + 1).fill(0));

  for (let i = 1; i <= stones.length; i++) {
    // 当前石头重量，注意下标从 1 开始
    let curStone = stones[i - 1];
    for (let j = 0; j <= halfSum; j++) {
      // 对于第 i 个物品，有两种情况：
      // 1. 不选第 i 个物品，则 dp[i][j] = dp[i - 1][j]
      // 2. 选第 i 个物品，则 dp[i][j] = dp[i - 1][j - curStone] + curStone
      if (j >= curStone) {
        // 可以装下第 i 个物品，则两种选择中取最大值
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - curStone] + curStone);
      } else {
        // 装不下第 i 个物品，则只能选择不装
        dp[i][j] = dp[i - 1][j];
      }
    }
  }
  // 背包容量为 sum/2 时，能够装的最大重量
  let maxWeight = dp[stones.length][halfSum];
  // 两个子集的重量差
  return sum - maxWeight - maxWeight;
};