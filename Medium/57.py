from typing import List


class Solution:
    def insert(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
        res = []
        i = 0
        length = len(intervals)

        # 1. 先把 newInterval 左边完全不重叠的区间放进 res
        while i < length and intervals[i][1] < newInterval[0]:
            res.append(intervals[i])
            i += 1

        # 2. 合并所有和 newInterval 有重叠的区间
        while i < length and intervals[i][0] <= newInterval[1]:
            newInterval[0] = min(newInterval[0], intervals[i][0])
            newInterval[1] = max(newInterval[1], intervals[i][1])
            i += 1

        # 3. 把合并后的新区间放进 res
        res.append(newInterval)

        # 4. 把 newInterval 右边完全不重叠的区间放进 res
        while i < length:
            res.append(intervals[i])
            i += 1

        return res