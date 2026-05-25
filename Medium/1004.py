class Solution:
    def longestOnes(self, nums: List[int], k: int) -> int:
        # 一个窗口里面最多有k个0
        left = 0
        right = 0
        res = 0
        while right < len(nums):
          # 扩大窗口
          if nums[right] == 0:
              k -= 1
          right += 1

          # 缩小窗口
          while k < 0:
            if nums[left] == 0:
              k += 1
            left += 1


          if k >= 0:
            res = max(res, right-left)
  
        return res;    

        


            
