using System;

public class Solution {
  public int CharacterReplacement(string s, int k) {
    int left = 0;
    int right = 0;
    int[] windowCharCount = new int[26];
    int windowMaxCount = 0;
    int res = 0;

    while (right < s.Length) {
      // 扩大窗口
      windowCharCount[s[right] - 'A']++;

      windowMaxCount = Math.Max(windowMaxCount, windowCharCount[s[right] - 'A']);
      right++;

      // 如果窗口长度 - 窗口内最多字符出现次数 > k
      // 说明 k 次替换机会不足以把窗口内字符全部变成同一个字符
      while (right - left - windowMaxCount > k) {
        int leftCharIndex = s[left] - 'A';
        windowCharCount[leftCharIndex]--;
        left++;
      }

      // 当前窗口合法，更新答案
      res = Math.Max(res, right - left);
    }

    return res;
  }
}