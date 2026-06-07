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
    
    from typing import List
    
    def maxLength2(self, arr: List[str]) -> int:
      # 过滤掉包含重复字符的字符串
      # JS: arr = arr.filter(str => new Set(str).size === str.length)
      arr = [s for s in arr if len(set(s)) == len(s)]

      max_len = 0
      current_string_set = set()

      def backtrack(index):
        nonlocal max_len, current_string_set

        # 更新最大长度
        max_len = max(max_len, len(current_string_set))

        # 遍历剩余字符串
        for i in range(index, len(arr)):
          # 当前字符串的字符集合
          # 标记是否有冲突
          str_set = set(arr[i])
          has_conflict = False

          # 检查当前字符串和 current_string_set 是否有重复字符
          for char in str_set:
            if char in current_string_set:
              has_conflict = True
              break

          if not has_conflict:
            # 将当前字符串加入组合，并递归处理下一个字符串
            # JS: currentStringSet = new Set([...currentStringSet, ...strSet])
            current_string_set = current_string_set | str_set

            backtrack(i + 1)

            # 回溯时移除当前字符串的字符
            for char in str_set:
              current_string_set.remove(char)

      backtrack(0)
      return max_len
    
    def maxLength3(self, arr: List[str]) -> int:
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

    