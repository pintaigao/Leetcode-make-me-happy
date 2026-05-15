from typing import List
from collections import deque


class Edge:
  def __init__(self, node: str, weight: float):
    self.node = node
    self.weight = weight


class Solution:
  def calcEquation(self, equations: List[List[str]], values: List[float], queries: List[List[str]]) -> List[float]:
    # 把 equations 抽象成一幅图，邻接表存储
    graph = {}
    res = [0.0] * len(queries)
    for i in range(len(equations)):
      a = equations[i][0]
      b = equations[i][1]
      w = values[i]
      # 构建双向图
      if a not in graph:
        graph[a] = []
        graph[a].append(Edge(b, w))

      if b not in graph:
        graph[b] = []
        graph[b].append(Edge(a, 1.0 / w))

    def bfs(start: str, end: str) -> float:
      if start not in graph or end not in graph:
        return -1.0

      if start == end:
        return 1.0

      # BFS 标准框架
      # key 为节点 ID（变量名），value 记录从 start 到该节点的路径乘积
      queue = deque([start]),visited = set(),weight = {start: 1.0}
      # 不能 visited = set(start)，因为 start = "aa" 的话，set(start) 结果是 {"a"}
      visited.add(start)

      while queue:
        cur = queue.popleft()

        for neighbor in graph[cur]:
          if neighbor.node not in visited:
            # 更新路径乘积
            weight[neighbor.node] = weight[cur] * neighbor.weight

            if neighbor.node == end:
              return weight[end]

            # 记录 visited
            visited.add(neighbor.node)

            # 新节点加入队列继续遍历
            queue.append(neighbor.node)

      return -1.0

    # Loop Query
    # BFS 遍历图，计算 start 到 end 的路径乘积
    for i in range(len(queries)):
      res[i] = bfs(queries[i][0], queries[i][1])

    return res
  
  def calcEquationWithTuple(self,equations: List[List[str]],values: List[float],queries: List[List[str]]) -> List[float]:
    # 把 equations 抽象成一幅图，邻接表存储
    graph = {}
    res = [0.0] * len(queries)
    for i in range(len(equations)):
      a = equations[i][0]
      b = equations[i][1]
      w = values[i]
      # 构建双向图
      if a not in graph:
        graph[a] = []
        graph[a].append((b, w))
      if b not in graph:
        graph[b] = []
        graph[b].append((a, 1.0 / w))
        
    def bfs(start: str, end: str) -> float:
      if start not in graph or end not in graph:
        return -1.0
      if start == end:
        return 1.0
      # BFS 标准框架
      # key 为节点 ID（变量名），value 记录从 start 到该节点的路径乘积
      queue = deque([start])
      visited = set()
      weight = {start: 1.0}
      # 不能 visited = set(start)，因为 start = "aa" 的话，set(start) 结果是 {"a"}
      visited.add(start)
      while queue:
        cur = queue.popleft()
        for next_node, edge_weight in graph[cur]:
          if next_node not in visited:
            # 更新路径乘积
            weight[next_node] = weight[cur] * edge_weight
            if next_node == end:
              return weight[end]
            # 记录 visited
            visited.add(next_node)
            # 新节点加入队列继续遍历
            queue.append(next_node)
      return -1.0
    # Loop Query
    # BFS 遍历图，计算 start 到 end 的路径乘积
    for i in range(len(queries)):
      res[i] = bfs(queries[i][0], queries[i][1])
    return res