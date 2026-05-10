from collections import deque
from typing import List, Optional


# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right


class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
        queue = deque([root])
        result = []

        if not root:
            return result

        while queue:
            size = len(queue)

            # 当前这一层最右边的 node
            result.append(queue[size - 1].val)

            for i in range(size):
                node = queue.popleft()

                node.left and queue.append(node.left)

                node.right and queue.append(node.right)

        return result