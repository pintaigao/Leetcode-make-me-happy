class Solution:
    def maxLength(self, arr: List[str]) -> int:
      if len(arr) is 0 or not arr:
        return 0

      # 判断s里面的字符是否唯一
      def isUniqueChars(s: string):
        charSet = set()
        for c in s:
            if c in charSet:
                return False
            charSet.add(c)
        return True

      result = 0
      # 组合
      def dfs(path, start):
        if isUniqueChars(path):
            nonlocal result
            result = max(len(path), result)
        else:
            return

        for i in range(start, len(arr)):
            dfs(path + arr[i], i + 1)

      dfs("", 0)
      return result

        
# Solution 2
class Solution2:
    def maxLength(self, arr: List[str]) -> int:
      if len(arr) is 0 or not arr:
        return 0

      # 判断s里面的字符是否唯一
      def isUniqueChars(s: string):
        charSet = set()
        for c in s:
            if c in charSet:
                return False
            charSet.add(c)
        return True

      result = 0
      # 组合
      def dfs(path, start):
        if not isUniqueChars(path):
          return;
    
        nonlocal result
        result = max(len(path), result);

        if start >= len(arr): 
          return;
    
        # 选这个单词
        dfs(path + arr[start], start + 1)
        # 不选这个单词
        dfs(path + arr[start], start + 1)
            

      dfs("", 0)
      return result
