from typing import List
import heapq

class Solution:
  def minimumEffortPath(self, heights: List[List[int]]) -> int:
    # Dijkstra 算法，计算 (0, 0) 到 (m - 1, n - 1) 的最小体力消耗
    return self.dijkstra(heights)

  def dijkstra(self, matrix):
    # 记录从起点 (0, 0) 到每个节点的最小体力消耗
    m = len(matrix)
    n = len(matrix[0])
    dist_to = [[float("inf")] * n for _ in range(m)]
    dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]]

    # pq 里面存的是 (effort_from_start, row, col)
    # Python heapq 默认按照 tuple 第一项排序，所以会按照 effort_from_start 从小到大排序
    pq = []

    # 从起点 (0, 0) 开始进行 dijkstra 算法
    dist_to[0][0] = 0
    heapq.heappush(pq, (0, 0, 0))

    while pq:
      effort_from_start, cur_row, cur_col = heapq.heappop(pq)

      # 已经存在更优路径，则跳过
      if dist_to[cur_row][cur_col] < effort_from_start:
        continue

      # 判断是否已经到达目标点
      # 如果要提前返回，可以打开这一段
      # if cur_row == m - 1 and cur_col == n - 1:
      #   return dist_to[cur_row][cur_col]

      # For Next One
      for nx, ny in dirs:
        next_row = cur_row + nx
        next_col = cur_col + ny

        # 索引越界
        if next_row >= m or next_row < 0 or next_col >= n or next_col < 0:
          continue

        # 从起点到下一个节点的体力消耗 =
        # 从起点到当前节点的体力消耗 和 当前节点到下一个节点的体力消耗 的较大值
        # Math.max 的原因是因为题目要求的是路径上每一步的体力消耗的最大值
        next_effort_from_start = max(effort_from_start,abs(matrix[next_row][next_col] - matrix[cur_row][cur_col]))

        # 存在更优路径，则更新 dist_to 数组和优先级队列
        if dist_to[next_row][next_col] > next_effort_from_start:
          dist_to[next_row][next_col] = next_effort_from_start
          heapq.heappush(pq, (next_effort_from_start, next_row, next_col))

    return dist_to[m - 1][n - 1] if dist_to[m - 1][n - 1] >= 0 else -1