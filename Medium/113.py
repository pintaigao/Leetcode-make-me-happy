from typing import List, Optional


# Definition for a binary tree node.
class TreeNode:
  def __init__(self, val=0, left=None, right=None):
    self.val = val
    self.left = left
    self.right = right


class Solution:
  def pathSum(self, root: Optional[TreeNode], targetSum: int) -> List[List[int]]:
    result = []
    path = []

    def dfs(root, targetSum):
      if root is None:
        return

      path.append(root.val)
      targetSum -= root.val
      
      # debug
      print("current path:", path, "remaining:", targetSum)

      if root.left is None and root.right is None and targetSum == 0:
        result.append(path[:])

      dfs(root.left, targetSum)
      dfs(root.right, targetSum)

      path.pop()

    dfs(root, targetSum)
    return result
  
  
  # 手动测试

root = TreeNode(5)
root.left = TreeNode(4)
root.right = TreeNode(8)
root.left.left = TreeNode(11)
root.left.left.left = TreeNode(7)
root.left.left.right = TreeNode(2)
root.right.left = TreeNode(13)
root.right.right = TreeNode(4)
root.right.right.left = TreeNode(5)
root.right.right.right = TreeNode(1)
solution = Solution()

print(solution.pathSum(root, 22))