from collections import deque
from typing import Optional


# Definition for a Node.
# class Node:
#     def __init__(self, val: int = 0, left: 'Node' = None, right: 'Node' = None, next: 'Node' = None):
#         self.val = val
#         self.left = left
#         self.right = right
#         self.next = next


class Solution:
  def connect(self, root: 'Optional[Node]') -> 'Optional[Node]':
    if root is None:
      return root
    queue = deque([root])
    while queue:
      # 将队列中的元素串联起来
      size = len(queue)
      tmp = queue[0]
      for i in range(1, size):
        tmp.next = queue[i]
        tmp = queue[i]

      # 遍历队列中的每个元素，将每个元素的左右节点也放入队列中
      for i in range(size):
        tmp = queue.popleft()

        tmp.left and queue.append(tmp.left)

        if tmp.right is not None:
          queue.append(tmp.right)
          
        # 或者
        # if tmp.left:
        #   queue.append(tmp.left)
    
    return root