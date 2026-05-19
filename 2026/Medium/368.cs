using System;
using System.Collections.Generic;

public class Solution {
  public IList<int> LargestDivisibleSubset(int[] nums) {
    // 定义：dp[i] 表示以 nums[i] 这个数结尾的最长符合要求子序列
    int n = nums.Length;
    List<int>[] dp = new List<int>[n];
    for (int i = 0; i < n; i++) {
      dp[i] = new List<int>();
    }

    Array.Sort(nums);
    dp[0].Add(nums[0]);

    for (int i = 1; i < n; i++) {
      int maxSubsetLen = 0;
      int index = -1;

      // 在 nums[0..i-1] 中寻找那个 nums[i] 能接到结尾的最长子序列
      for (int j = 0; j < i; j++) {
        if (nums[i] % nums[j] == 0 && dp[j].Count > maxSubsetLen) {
          maxSubsetLen = dp[j].Count;
          index = j;
        }
      }

      // nums[0..i-1] 中最长的那个子序列，再加上 nums[i]
      // 就是 nums[0..i] 最长的子序列
      // index != -1 就是有，list 传递
      if (index != -1) {
        dp[i] = new List<int>(dp[index]);
        dp[i].Add(nums[i]);
      }
      else {
        dp[i] = new List<int>();
        dp[i].Add(nums[i]);
      }
    }

    // 寻找最长的数组
    List<int> res = dp[0];
    for (int i = 1; i < dp.Length; i++) {
      if (res.Count < dp[i].Count) {
        res = dp[i];
      }
    }

    return res;
  }
}