from typing import List


class Solution:
    def reconstructQueue(self, people: List[List[int]]) -> List[List[int]]:
        # 先看 -height：身高越高，-height 越小，所以排前面 再看 k：如果身高一样，k 越小越靠前
        people.sort(key=lambda p: (-p[0], p[1]))

        output = []

        for p in people:
            # 在 p[1] 这个 index 插入 p
            output.insert(p[1], p)

        return output