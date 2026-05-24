using System;
using System.Collections.Generic;

public class Solution {
  public IList<int> FindSubstring(string s, string[] words) {
    Dictionary<string, int> wordsCountMap = new Dictionary<string, int>();
    int wordLen = words[0].Length, windowSize = wordLen * words.Length;
    List<int> result = new List<int>();

    // 1. 用 Dictionary 记录 words 里每个 word 出现次数
    foreach (string word in words) {
      if (!wordsCountMap.ContainsKey(word)) {
        wordsCountMap[word] = 0;
      }

      wordsCountMap[word]++;
    }

    // 2. 按 wordLen 分组滑窗
    for (int start = 0; start < wordLen; start++) {
      Dictionary<string, int> currentMap = new Dictionary<string, int>();
      int unMatchWords = 0;

      for (int i = start; i < s.Length; i += wordLen) {
        // 0. 提取单词
        // Substring(start, length)
        string word = s.Substring(i, Math.Min(wordLen, s.Length - i));

        // 1. 统计当前窗口内这个 word 出现次数
        if (!currentMap.ContainsKey(word)) {
          currentMap[word] = 0;
        }

        currentMap[word]++;

        if (!wordsCountMap.ContainsKey(word) || currentMap[word] > wordsCountMap[word]) {
          unMatchWords++;
        }

        // 2. 窗口长度还不够，继续扩大
        if (i + wordLen - windowSize < 0) {
          continue;
        }

        // 3. 如果当前窗口没有 mismatch，记录答案
        if (unMatchWords == 0) {
          result.Add(i + wordLen - windowSize);
        }

        // 4. 缩窗口，移除最左边的 word
        int leftWordIndex = i + wordLen - windowSize;
        string leftWord = s.Substring(leftWordIndex, wordLen);

        if (!wordsCountMap.ContainsKey(leftWord) || currentMap[leftWord] > wordsCountMap[leftWord]) {
          unMatchWords--;
        }

        currentMap[leftWord]--;
      }
    }

    return result;
  }
}