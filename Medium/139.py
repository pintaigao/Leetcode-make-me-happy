from typing import List

class Solution:
  def wordBreak(self, s: str, wordDict: List[str]) -> bool:
    length = len(s)
    word_set = set(wordDict)
    memo = [None] * length

    def can_break(start):
      if start == length:
        return True

      # memo 中有，就用 memo 中的
      if memo[start] is not None:
        return memo[start]

      for i in range(start + 1, length + 1):
        prefix = s[start:i]

        if prefix in word_set and can_break(i):
          # 当前递归的结果存一下
          # 这个位置上执行的逻辑看过了，值也保存了
          memo[start] = True
          return True

      # 当前递归的结果存一下
      memo[start] = False
      return False

    return can_break(0)
  
  def wordBreakDP(self, s: str, wordDict: List[str]) -> bool:
    word_set = set(wordDict)
    dp = [False] * (len(s) + 1)
    dp[0] = True  # dp[0] 代表 ""

    for i in range(len(s) + 1):
      for j in range(i - 1, -1, -1):
        # j 去划分成两部分
        # 后缀部分 s[j:i]
        suffix = s[j:i]

        # 如果 wordDict 中存在 suffix，且左侧子串 [0, j-1] 的 dp[j] 为真
        # 说明 s[0..j-1] 可以被拆成单词，s[j..i-1] 是单词
        # 那么 s[0..i-1] 也可以被拆成单词
        if suffix in word_set and dp[j]:
          # dp[i] = True 代表 s[0..i-1] 可以被拆成单词
          dp[i] = True
          break

    return dp[len(s)]

  