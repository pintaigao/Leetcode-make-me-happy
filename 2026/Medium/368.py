from typing import List


class Solution:
  def largestDivisibleSubset(self, nums: List[int]) -> List[int]:
    # 定义：dp[i] 表示以 nums[i] 这个数结尾的最长符合要求子序列
    n = len(nums)
    dp = [[] for _ in range(n)]

    nums.sort()
    dp[0].append(nums[0])

    for i in range(1, n):
      max_subset_len = 0
      index = -1

      # 在 nums[0..i-1] 中寻找那个 nums[i] 能接到结尾的最长子序列
      for j in range(i):
        if nums[i] % nums[j] == 0 and len(dp[j]) > max_subset_len:
          max_subset_len = len(dp[j])
          index = j

      # nums[0..i-1] 中最长的那个子序列，再加上 nums[i]
      # 就是 nums[0..i] 最长的子序列
      # index != -1 就是有，list 传递
      if index != -1:
        dp[i] = dp[index][:] + [nums[i]]
      else:
        dp[i] = [nums[i]]

    # 寻找最长的数组
    res = dp[0]

    # for i in range(1, len(dp)):
    #   if len(res) < len(dp[i]):
    #     res = dp[i]
    # return res
    
    # 利用 python 语言特性
    return max(dp, key=len)
