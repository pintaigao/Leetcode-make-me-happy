using System;
using System.Collections.Generic;

public class Solution {
  public int[][] Insert(int[][] intervals, int[] newInterval) {
    List<int[]> res = new List<int[]>();
    int i = 0;
    int len = intervals.Length;

    // 1. 在 newInterval 左边，完全不重叠的区间
    while (i < len && intervals[i][1] < newInterval[0]) {
      res.Add(intervals[i]);
      i++;
    }

    // 2. 和 newInterval 有重叠的区间，进行合并
    while (i < len && intervals[i][0] <= newInterval[1]) {
      newInterval[0] = Math.Min(newInterval[0], intervals[i][0]);
      newInterval[1] = Math.Max(newInterval[1], intervals[i][1]);
      i++;
    }

    // 3. 合并后的新区间放进去
    res.Add(newInterval);

    // 4. 在 newInterval 右边，完全不重叠的区间
    while (i < len) {
      res.Add(intervals[i]);
      i++;
    }

    return res.ToArray();
  }
}