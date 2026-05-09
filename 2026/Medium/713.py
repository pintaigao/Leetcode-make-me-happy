"""
@lc app=leetcode id=713 lang=python3

[713] Subarray Product Less Than K
"""

# @lc code=start
class Solution:
    def numSubarrayProductLessThanK(self, nums: List[int], k: int) -> int:
        if k <= 1:
            return 0
        
        prod = 1
        ans = 0
        left = 0
        right = 0
        
        while right < len(nums):
            # 增加右边
            prod *= nums[right]
            right += 1
            
            # 收缩左边
            while prod >= k:
                prod //= nums[left]
                left += 1
            
            # 每多加一个数字，就会产生right - left + 1个子数组，因为比如说[1,2]多加一个3，子数组多了[3],[3,2],[3,2,1]，所以多了3个，
            ans += right - left
        
        return ans
# @lc code=end