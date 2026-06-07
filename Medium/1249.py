class Solution:
  def minRemoveToMakeValid(self, s: str) -> str:
    bracket_index = []
    invalid_index = [False] * len(s)
    result = []

    for i in range(len(s)):
      # 如果遇到左括号
      if s[i] == "(":
        bracket_index.append(i)
        invalid_index[i] = True

      # 如果遇到右括号
      if s[i] == ")":
        if len(bracket_index) == 0:
          # 这个 ")" 的前面不会有 "(" 和它匹配
          invalid_index[i] = True
        else:
          # 说明找到匹配的了
          invalid_index[bracket_index.pop()] = False

    for i in range(len(s)):
      if not invalid_index[i]:
        result.append(s[i])

    return "".join(result)