from typing import List

class Solution:
  def removeDuplicates(self, s: str, k: int) -> str:
    result = list(s)
    counts = []
    i = 0
    while i < len(result):
      # 如果是指针指向第一个元素，或者当前元素和前一个元素不相同，则 stack push 1
      if i == 0 or result[i] != result[i - 1]:
        counts.insert(0, 1)
      else:
        # 如果当前元素和前一个元素相同，则 stack pop 然后 + 1
        incremented = counts.pop(0) + 1
        # 如果 incremented == k，则删除 i-k+1 到 i+1 之间的元素
        if incremented == k:
          del result[i - k + 1:i + 1]
          # 删除后，指针指向 i-k
          i = i - k
        else:
          # 如果 incremented < k，则 stack push incremented
          counts.insert(0, incremented)
      i += 1
    return ''.join(result)
  
  def removeDuplicates2(s: str, k: int) -> str:
    # count[i] 表示 chars[i] 位置的字符连续出现了多少次
    count = [0] * len(s)
    chars = list(s)

    i = 0
    while i < len(chars):
      # 如果是第一个元素，或者当前字符和前一个字符不同
      if i == 0 or chars[i] != chars[i - 1]:
        count[i] = 1
      else:
        count[i] = count[i - 1] + 1

      # 如果连续出现 k 次，则删除这一段
      if count[i] == k:
        start = i - k + 1
        # 等价于 JS: s.splice(start, k)
        del chars[start:start + k]
        # 同步删除 count
        del count[start:start + k]
        # 删除后，指针回退
        i = i - k
      i += 1
    return ''.join(chars)