from typing import List
import heapq

class Solution:
  def maxEvents(self, events: List[List[int]]) -> int:
    pq = []
    last_day = 0
    index = 0
    res = 0
    n = len(events)

    if len(events) == 1:
      return 1

    # Priority Queue，按照每个会议的结束时间排序，结束时间最早的会议在前面
    # 按开始时间从小到大排序
    events.sort(key=lambda x: x[0])

    # 获得最晚的一天
    for start, end in events:
      last_day = max(last_day, end)

    # 循环每一天
    for d in range(1, last_day + 1):
      # 排除掉已经过期的 event
      while pq and pq[0] < d:
        heapq.heappop(pq)

      # 记录从这一天开始的 event，pq push 的是这个 event 的结束时间
      while index < n and events[index][0] == d:
        heapq.heappush(pq, events[index][1])
        index += 1

      # 马上要结束的排前面
      # Python heapq 会自动保持 pq[0] 是最小的结束时间

      # 这一天参加一个 event
      if pq:
        heapq.heappop(pq)
        res += 1

    return res