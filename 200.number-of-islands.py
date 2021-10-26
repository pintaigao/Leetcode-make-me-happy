#
# @lc app=leetcode id=200 lang=python
#
# [200] Number of Islands
#

# @lc code=start
class Solution(object):
    # Solution 1: DFS
    def numIslands(self, grid):
        """
        :type grid: List[List[str]]
        :rtype: int
        """
        if not grid:
            return 0
        
        count = 0
        for i in range(len(grid)):
            for j in range(len(grid[0])):
                if grid[i][j] == '1':
                    self.dfs(grid, i, j)
                    count += 1
            return count

    # Solution 2: BFS
    def numIslands2(self, grid):
        """
        :type grid: List[List[str]]
        :rtype: int
        """
        
# @lc code=end

