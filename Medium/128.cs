using System;
using System.Collections.Generic;

public class Solution {
  public int LongestConsecutive(int[] nums) {
    HashSet<int> numSet = new HashSet<int>(nums);
    int result = 0;

    foreach (int num in numSet) {
      // 如果当前的数，没有比它小一个的，就看有没有以它为第一个的连续序列
      if (!numSet.Contains(num - 1)) {
        int currentNum = num;
        int currentStreak = 1;

        while (numSet.Contains(currentNum + 1)) {
          currentNum += 1;
          currentStreak += 1;
        }

        result = Math.Max(result, currentStreak);
      }
    }

    return result;
  }
}