using System;
using System.Collections.Generic;

public class Solution {
  public int MaxEvents(int[][] events) {
    PriorityQueue<int, int> pq = new PriorityQueue<int, int>();
    int lastDay = 0, index = 0, res = 0, n = events.Length;

    if (events.Length == 1) {
      return 1;
    }

    // Priority Queue，按照每个会议的结束时间排序，结束时间最早的会议在前面
    // 按开始时间从小到大排序
    Array.Sort(events, (a, b) => a[0].CompareTo(b[0]));

    // 获得最晚的一天
    foreach (int[] e in events) {
      lastDay = Math.Max(lastDay, e[1]);
    }

    // 循环每一天
    for (int d = 1; d <= lastDay; d++) {
      // 排除掉已经过期的 event
      while (pq.Count > 0 && pq.Peek() < d) {
        pq.Dequeue();
      }

      // 记录从这一天开始的 event，pq push 的是这个 event 的结束时间
      while (index < n && events[index][0] == d) {
        int endDay = events[index][1];
        pq.Enqueue(endDay, endDay);
        index += 1;
      }

      // 马上要结束的排前面
      // C# PriorityQueue 会自动按照 priority 从小到大排列

      // 这一天参加一个 event
      if (pq.Count > 0) {
        pq.Dequeue();
        res += 1;
      }
    }

    return res;
  }
}