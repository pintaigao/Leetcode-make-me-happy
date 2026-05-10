class Solution:
    def shortestToChar(self, S: str, C: str) -> List[int]:
        n = len(S)
        pos = -n
        res = [0] * n

        # 从左往右，每个字符先计算它到左边最近 C 的距离
        for i in range(n):
            if S[i] == C:
                pos = i

            res[i] = i - pos

        # 从右往左，每个字符再计算它到右边最近 C 的距离
        # Python 的 range(start, stop, step) 规则是：
        for i in range(pos - 1, -1, -1):
            if S[i] == C:
                pos = i

            # 取左边最近 C 的距离 和 右边最近 C 的距离 的较小值
            res[i] = min(res[i], pos - i)

        return res