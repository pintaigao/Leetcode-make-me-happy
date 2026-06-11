from typing import List
from collections import defaultdict, deque

class Solution:
  def diagonalSort(self, mat: List[List[int]]) -> List[List[int]]:
    # Data structure to store the diagonals.
    m = len(mat)
    n = len(mat[0])
    diagonals = defaultdict(list)

    # 按照斜的方向，把每一个斜线（key = row - col）上的值放入到 diagonals map 中
    # JS: diagonals[row - col].push(mat[row][col])
    for row in range(m):
      for col in range(n):
        diagonals[row - col].append(mat[row][col])

    # 排序
    for key in diagonals:
      diagonals[key].sort()

    # 放回原来的位置
    for row in range(m):
      for col in range(n):
        mat[row][col] = diagonals[row - col].pop(0)

    return mat