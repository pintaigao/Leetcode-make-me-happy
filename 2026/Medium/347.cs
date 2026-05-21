using System;
using System.Collections.Generic;

public class Solution {
  public int[] TopKFrequent(int[] nums, int k) {
    // nums 中的元素 -> 该元素出现的频率
    Dictionary<int, int> valToFreq = new Dictionary<int, int>();
    int[] res = new int[k];

    foreach (int v in nums) {
      if (!valToFreq.ContainsKey(v)) {
        valToFreq[v] = 0;
      }

      valToFreq[v]++;
    }

    // 小顶堆，按照频率从小到大排序
    PriorityQueue<int, int> pq = new PriorityQueue<int, int>();

    foreach (KeyValuePair<int, int> entry in valToFreq) {
      int val = entry.Key;
      int freq = entry.Value;

      pq.Enqueue(val, freq);

      // 弹出最小频率元素，维护队列内是 k 个频率最大的元素
      if (pq.Count > k) {
        pq.Dequeue();
      }
    }

    // res 数组中存储前 k 个最大元素
    for (int i = k - 1; i >= 0; i--) {
      res[i] = pq.Dequeue();
    }

    return res;
  }
}