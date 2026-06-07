using System;
using System.Collections.Generic;

public class Solution {
  public int MaxLength(IList<string> arr) {
    if (arr == null || arr.Count == 0) {
      return 0;
    }

    // 判断 s 里面的字符是否唯一
    bool IsUniqueChars(string s) {
      HashSet<char> set = new HashSet<char>();

      foreach (char c in s) {
        if (set.Contains(c)) {
          return false;
        }

        set.Add(c);
      }

      return true;
    }

    int result = 0;

    // 组合
    void Dfs(string path, int start) {
      if (IsUniqueChars(path)) {
        result = Math.Max(result, path.Length);
      }
      else {
        return;
      }

      for (int i = start; i < arr.Count; i++) {
        Dfs(path + arr[i], i + 1);
      }
    }

    Dfs("", 0);
    return result;
  }

  public int MaxLength2(IList<string> arr) {
    // 过滤掉包含重复字符的字符串
    // JS: arr = arr.filter(str => new Set(str).size === str.length)
    List<string> filtered = new List<string>();
    foreach (string str in arr) {
      HashSet<char> set = new HashSet<char>(str);

      if (set.Count == str.Length) {
        filtered.Add(str);
      }
    }

    int maxLen = 0;
    HashSet<char> currentStringSet = new HashSet<char>();

    void Backtrack(int index) {
      // 更新最大长度
      maxLen = Math.Max(maxLen, currentStringSet.Count);

      // 遍历剩余字符串
      for (int i = index; i < filtered.Count; i++) {
        // 当前字符串的字符集合
        // 标记是否有冲突
        HashSet<char> strSet = new HashSet<char>(filtered[i]);
        bool hasConflict = false;

        // 检查当前字符串和 currentStringSet 是否有重复字符
        foreach (char ch in strSet) {
          if (currentStringSet.Contains(ch)) {
            hasConflict = true;
            break;
          }
        }

        if (!hasConflict) {
          // 将当前字符串加入组合，并递归处理下一个字符串
          foreach (char ch in strSet) {
            currentStringSet.Add(ch);
          }

          Backtrack(i + 1);

          // 回溯时移除当前字符串的字符
          foreach (char ch in strSet) {
            currentStringSet.Remove(ch);
          }
        }
      }
    }

    Backtrack(0);
    return maxLen;
  }
}