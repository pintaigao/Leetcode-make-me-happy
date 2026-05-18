from typing import List


class Solution:
  def longestStrChain(self, words: List[str]) -> int:
    # 不能写成[set()]*16 因为这样会导致指向同一个 set
    cnt = [set() for _ in range(16)]
    # _ in range(16): 
    #   cnt.append(set())
    map = {}
    ans = 1

    for word in words:
      cnt[len(word) - 1].add(word)

    for i in range(15, 0, -1):
      if len(cnt[i - 1]) == 0:
        continue

      for word in cnt[i]:
        # 这一步表示从后往前，到这个 word 这个位置上，最长字符串链的长度是多少
        w_val = map[word] if word in map else 1

        for j in range(len(word)):
          # 这个 word，通过删除每一个位置上的字符获得一个新的 word(hash)
          hash_word = word[:j] + word[j + 1:]

          if hash_word in cnt[i - 1]:
            if hash_word not in map or map[hash_word] <= w_val:
              # 如果 map[hash_word] > w_val，则不走从 word 到 hash_word 的这条路
              # 其他 word 到这个 hash_word 有更长的最长字符串链
              map[hash_word] = w_val + 1

            ans = max(ans, w_val + 1)

    return ans