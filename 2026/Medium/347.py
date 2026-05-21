from typing import List
from collections import defaultdict
import heapq


class Solution:
  def topKFrequent(self, nums: List[int], k: int) -> List[int]:
    # nums 中的元素 -> 该元素出现的频率
    val_to_freq = defaultdict(int)
    res = [0] * k

    for v in nums:
      val_to_freq[v] += 1

    # 小顶堆，按照频率从小到大排序
    pq = []

    for val, freq in val_to_freq.items():
      # entry = [key, value]
      heapq.heappush(pq, (freq, val))

      # 弹出最小频率元素，维护堆内是 k 个频率最大的元素
      if len(pq) > k:
        heapq.heappop(pq)

    # res 数组中存储前 k 个最大元素
    for i in range(k - 1, -1, -1):
      freq, val = heapq.heappop(pq)
      res[i] = val

    return res