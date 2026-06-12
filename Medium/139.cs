using System;
using System.Collections.Generic;

public class Solution {
  public bool WordBreak(string s, IList<string> wordDict) {
    int len = s.Length;
    HashSet<string> wordSet = new HashSet<string>(wordDict);
    bool?[] memo = new bool?[len];

    bool CanBreak(int start) {
      if (start == len) {
        return true;
      }

      // memo 中有，就用 memo 中的 // HasValue true 或者 false
      if (memo[start].HasValue) {
        return memo[start].Value;
      }

      for (int i = start + 1; i <= len; i++) {
        string prefix = s.Substring(start, i - start); // start 到要 substring 的 length

        if (wordSet.Contains(prefix) && CanBreak(i)) {
          // 当前递归的结果存一下
          // 这个位置上执行的逻辑看过了，值也保存了
          memo[start] = true;
          return true;
        }
      }

      // 当前递归的结果存一下
      memo[start] = false;
      return false;
    }

    return CanBreak(0);
  }

  public bool WordBreakDP(string s, IList<string> wordDict) {
    HashSet<string> wordSet = new HashSet<string>(wordDict);
    bool[] dp = new bool[s.Length + 1];
    dp[0] = true; // dp[0] 代表 ""

    for (int i = 0; i <= s.Length; i++) {
      for (int j = i - 1; j >= 0; j--) {
        // j 去划分成两部分
        // 后缀部分 s[j..i-1]
        string suffix = s.Substring(j, i - j);

        // 如果 wordDict 中存在 suffix，且左侧子串 [0, j-1] 的 dp[j] 为真
        // 说明 s[0..j-1] 可以被拆成单词，s[j..i-1] 是单词
        // 那么 s[0..i-1] 也可以被拆成单词
        if (wordSet.Contains(suffix) && dp[j]) {
          // dp[i] = true 代表 s[0..i-1] 可以被拆成单词
          dp[i] = true;
          break;
        }
      }
    }

    return dp[s.Length];
  }
}