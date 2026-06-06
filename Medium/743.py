from typing import List
import heapq

class Solution:
  def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
    # 节点编号是从 1 开始的，所以要一个大小为 n + 1 的邻接表
    graph = [[] for _ in range(n + 1)]
    res = 0

    # 构造图
    for from_node, to_node, weight in times:
      # from -> List<(to, weight)>
      # 邻接表存储图结构，同时存储权重信息
      # (to_node, weight) 是一个 tuple，表示 to_node 是 from_node 的一个邻居，权重是 weight
      graph[from_node].append((to_node, weight))

    # Dijkstra 算法模板
    def dijkstra(src):
      # dist_to[i] = 从起点到节点 i 的最小距离
      # float("inf") 表示未知
      # 最小堆，元素为 (dist_from_start, node)
      dist_to = [float("inf")] * len(graph)
      pq = []

      # 起点 src，距离为 0
      # Python 比较 tuple 的规则是：先比较第一个元素，如果第一个元素相等，再比较第二个元素。
      # heapq.heappush(pq, item)  # 入堆
      # heapq.heappop(pq)         # 弹出最小 item
      # pq[0]                     # 查看最小 item，但不删除
      # len(pq)                   # 堆大小
      heapq.heappush(pq, (0, src))
      dist_to[src] = 0

      while pq:
        cur_dist, cur_node = heapq.heappop(pq)

        # 如果已有更优路径，则跳过
        if dist_to[cur_node] < cur_dist:
          continue

        # 遍历当前节点的邻居
        for next_node, weight in graph[cur_node]:
          next_dist = cur_dist + weight

          if dist_to[next_node] <= next_dist:
            continue

          heapq.heappush(pq, (next_dist, next_node))
          dist_to[next_node] = next_dist

      return dist_to

    dist_to = dijkstra(k)

    # 找到最长的那条最短路径
    for i in range(1, n + 1):
      if dist_to[i] == float("inf"):
        # 有节点不可达
        return -1

      res = max(res, dist_to[i])

    return res