using System;
using System.Collections.Generic;

public class Solution {
  public int LongestStrChain(string[] words) {
    HashSet<string>[] cnt = new HashSet<string>[16];

    for (int i = 0; i < 16; i++) {
      cnt[i] = new HashSet<string>();
    }

    Dictionary<string, int> map = new Dictionary<string, int>();
    int ans = 1;

    foreach (string word in words) {
      cnt[word.Length - 1].Add(word);
    }

    for (int i = 15; i > 0; i--) {
      if (cnt[i - 1].Count == 0) {
        continue;
      }

      foreach (string word in cnt[i]) {
        // 这一步表示从后往前，到这个 word 这个位置上，最长字符串链的长度是多少
        int wVal = map.ContainsKey(word) ? map[word] : 1;

        for (int j = 0; j < word.Length; j++) {
          // 这个 word，通过删除每一个位置上的字符获得一个新的 word(hash)
          string hash = word.Substring(0, j) + word.Substring(j + 1);

          if (cnt[i - 1].Contains(hash)) {
            if (!map.ContainsKey(hash) || map[hash] <= wVal) {
              // 如果 map[hash] > wVal，则不走从 word 到 hash 的这条路
              // 其他 word 到这个 hash 有更长的最长字符串链
              map[hash] = wVal + 1;
            }

            ans = Math.Max(ans, wVal + 1);
          }
        }
      }
    }

    return ans;
  }
}