from typing import List

class Solution:
  def findSubstring(self, s: str, words: List[str]) -> List[int]:
    words_count_map = {}, word_len = len(words[0]), window_size = word_len * len(words), result = []

    for word in words:
      words_count_map[word] = words_count_map.get(word, 0) + 1

    for start in range(word_len):
      current_map = {}, un_match_words = 0
      
      i = start
      while i < len(s):
        # 0. 提取单词
        word = s[i:i + word_len]

        # 1. 统计当前窗口内这个单词出现次数
        current_map[word] = current_map.get(word, 0) + 1

        if word not in words_count_map or current_map[word] > words_count_map[word]:
          un_match_words += 1

        # 2. 窗口还没达到完整长度，继续扩张
        if i + word_len - window_size < 0:
          i += word_len
          continue

        # 3. 当前窗口合法
        if un_match_words == 0:
          result.append(i + word_len - window_size)

        # 4. 缩窗口
        left_word_index = i + word_len - window_size
        left_word = s[left_word_index:left_word_index + word_len]

        if left_word not in words_count_map or current_map[left_word] > words_count_map[left_word]:
          un_match_words -= 1

        current_map[left_word] -= 1

        i += word_len

    return result