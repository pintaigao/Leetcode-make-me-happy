from typing import List
from collections import deque, defaultdict

class Solution:
  def minimumSemesters(self, n: int, relations: List[List[int]]) -> int:
    adj_list = defaultdict(list)
    counts = [0] * (n + 1)
    terms = 0
    visited = 0
    queue = deque()

    for prev_course, next_course in relations:
      adj_list[prev_course].append(next_course)
      counts[next_course] += 1

    for course in range(1, n + 1):
      if counts[course] == 0:
        queue.append(course)

    if not queue:
      return -1

    while queue:
      terms += 1
      size = len(queue)

      for _ in range(size):
        node = queue.popleft()
        visited += 1

        for next_course in adj_list[node]:
          counts[next_course] -= 1

          if counts[next_course] == 0:
            queue.append(next_course)

    return terms if visited == n else -1