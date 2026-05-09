from typing import List
class Solution:
    def rob(self, nums: List[int]) -> int:
        result = [[0] * 2 for _ in range(len(nums))]

        for i in range(len(nums)):
            # base case
            if i == 0:
                result[i][0] = 0
                result[i][1] = nums[i]
            else:
                # position 1: no rob
                # 今天不偷，那么昨天可以偷，也可以不偷
                result[i][0] = max(result[i - 1][1], result[i - 1][0])

                # position 2: rob
                # 今天偷，那么昨天不能偷
                result[i][1] = result[i - 1][0] + nums[i]

        return max(result[len(nums) - 1][0], result[len(nums) - 1][1])