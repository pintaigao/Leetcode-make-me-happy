using System;

public class Solution {
  public int CoinChange(int[] coins, int amount) {
    int[] memo = new int[amount + 1];

    for (int i = 0; i < memo.Length; i++) {
      memo[i] = -666;
    }

    // 题目要求的最终结果是 dp(amount)
    // 定义：要凑出目标金额 amount，至少要 dp(coins, amount) 个硬币
    int Dp(int[] coins, int amount) {
      // base case
      if (amount == 0) { return 0; }
      if (amount < 0) { return -1; }
      // 查备忘录，避免重复计算
      if (memo[amount] != -666) { return memo[amount]; }
      int res = int.MaxValue;
      foreach (int coin in coins) {
        // 计算子问题的结果
        int subProblem = Dp(coins, amount - coin);
        // 子问题无解则跳过
        if (subProblem == -1) { continue; }
        // 在子问题中选择最优解，然后加一
        res = Math.Min(res, subProblem + 1);
      }

      // 把计算结果存入备忘录
      memo[amount] = res == int.MaxValue ? -1 : res;
      return memo[amount];
    }

    return Dp(coins, amount);
  }
}