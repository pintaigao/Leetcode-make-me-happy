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
}