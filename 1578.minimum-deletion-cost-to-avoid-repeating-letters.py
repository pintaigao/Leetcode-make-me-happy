#
# @lc app=leetcode id=1578 lang=python
#
# [1578] Minimum Deletion Cost to Avoid Repeating Letters
#

# @lc code=start
class Solution(object):
    def minCost(self, s, cost):
        """
        :type s: str
        :type cost: List[int]
        :rtype: int
        """
        stack = []
        total_cost = 0
        for i in range(len(s)):
            if len(stack) == 0 or stack[-1][0] != s[i]:
                stack.append((s[i], cost[i]))
            # need to delete one and delete the smaller cost one
            else:
                if stack[-1][1] >= cost[i]:
                    total_cost += cost[i]
                else:
                    var = stack.pop()
                    total_cost += var[1]
                    stack.append((s[i], cost[i]))
        return total_cost


# @lc code=end
