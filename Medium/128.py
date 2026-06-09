from typing import List

class Solution:
  def longestConsecutive(self, nums: List[int]) -> int:
    num_set = set(nums)
    result = 0

    for num in num_set:
      # 如果当前的数，没有比它小一个的，就看有没有以它为第一个的连续序列
      if num - 1 not in num_set:
        current_num = num
        current_streak = 1

        while current_num + 1 in num_set:
          current_num += 1
          current_streak += 1

        result = max(result, current_streak)

    return result