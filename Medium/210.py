from typing import List
from collections import defaultdict


class Solution:
  def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
    map = defaultdict(list)
    res = []
    visited = set()
    current_path = set()
    has_cycle = False

    # Build
    for course, pre in prerequisites:
      map[pre].append(course)
      map[course]

    def dfs(course):
      nonlocal has_cycle

      if course in current_path:
        has_cycle = True
        return

      if course in visited or has_cycle:
        return

      # 防止重复访问
      # visited 和 current_path 的区别：
      # visited 是全局访问过的节点
      # current_path 是当前 DFS 路径上的节点
      visited.add(course)
      current_path.add(course)

      # map[course] = [] 情况下这一条不会运行
      # 前提是 map[course] 被初始化为 []
      for c in map[course]:
        dfs(c)

        if has_cycle:
          return

      # 严格按照 Topological Sort 的方式
      # 后序遍历的时候加上 current 节点
      res.append(course)
      current_path.remove(course)

    for i in range(numCourses):
      dfs(i)

    # 此乃 py 的三元表达式的写法
    return [] if has_cycle else res[::-1]