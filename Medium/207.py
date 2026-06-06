from collections import defaultdict
from typing import List


class Solution:
  def canFinishBFS(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
    # 1. Build Graph
    # graph[from] = [to1, to2, ...]
    # 表示 from 这门课是 to1、to2、... 这些课的前置课程
    graph = [[] for _ in range(numCourses)]
    pre_course_count = [0] * numCourses
    for course, pre in prerequisites:
      graph[pre].append(course)
      pre_course_count[course] += 1
    # 2. 找出入度为 0，也就是没有前置课程的课
    queue = deque()
    course_attend = 0

    for i in range(len(pre_course_count)):
      if pre_course_count[i] == 0:
        queue.append(i)
    # 3. BFS，题目的目的是能不能完成所有课程，即检测有没有环
    while queue:
      course = queue.popleft()
      course_attend += 1
      for next_course in graph[course]:
        # 上了 course 本课，所以相应的 pre_course_count[next_course] -= 1
        pre_course_count[next_course] -= 1
        if pre_course_count[next_course] == 0:
          queue.append(next_course)
    # 4. 最后查看是不是上了所有的课
    return course_attend == numCourses
  
  def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
    # 1. Build Graph
    graph = defaultdict(list)
    path = set()
    visited = [False] * numCourses
    has_cycle = False

    for course, pre in prerequisites:
      graph[pre].append(course)

    # 2. DFS 逻辑
    # traveler() 里面要修改外层的 has_cycle，就必须写 nonlocal has_cycle
    # 如果没有 traveler 以为 has_cycle 是traveler 的内部变量
    def traveler(course):
      nonlocal has_cycle

      if course in path:
        has_cycle = True
        return

      if course not in graph or visited[course]:
        return

      visited[course] = True
      path.add(course)

      for c in graph[course]:
        traveler(c)

        if has_cycle:
          return

      path.remove(course)

    # 3. 遍历图中的每个节点，进行 DFS
    for i in range(numCourses):
      if not visited[i]:
        traveler(i)

        if has_cycle:
          return False

    return True