from typing import List


class Solution:
  def coinChange(self, coins: List[int], amount: int) -> int:
    memo = [-666] * (amount + 1)

    # 题目要求的最终结果是 dp(amount)
    # 定义：要凑出目标金额 amount，至少要 dp(coins, amount) 个硬币
    def dp(coins, amount):
      # base case
      if amount == 0:
        return 0

      if amount < 0:
        return -1

      # 查备忘录，避免重复计算
      if memo[amount] != -666:
        return memo[amount]

      # max_value = float("inf")
      # min_value = float("-inf")
      # max_value = math.inf
      # min_value = -math.inf
      res = float("inf")

      for coin in coins:
        # 计算子问题的结果
        sub_problem = dp(coins, amount - coin)

        # 子问题无解则跳过
        if sub_problem == -1:
          continue

        # 在子问题中选择最优解，然后加一
        res = min(res, sub_problem + 1)

      # 把计算结果存入备忘录
      memo[amount] = -1 if res == float("inf") else res

      return memo[amount]

    return dp(coins, amount)