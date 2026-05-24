from collections import deque, defaultdict
from typing import Optional, List


# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right


class Solution:
    def verticalOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        output = []

        if root is None:
            return output
        
        # list：当 key 不存在的时候，自动创建一个默认 value。
        # column_table = defaultdict(list)
        column_table = {}
        queue = deque([(root, 0)])

        while queue:
            node, column = queue.pop()

            if node is not None:
                if column not in column_table:
                    column_table[column] = []
                column_table[column].append(node.val)
                queue.appendleft((node.left, column - 1))
                queue.appendleft((node.right, column + 1))

        sorted_keys = sorted(column_table.keys())

        for k in sorted_keys:
            output.append(column_table[k])

        return output