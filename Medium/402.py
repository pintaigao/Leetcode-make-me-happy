class Solution:
    def removeKdigits(self, num: str, k: int) -> str:
        stk = []

        for c in num:
            # 单调栈：保持栈内数字尽量递增
            while len(stk) > 0 & c < stk[-1] & k > 0:
                stk.pop()
                k -= 1

            # 防止 0 作为数字开头
            if len(stk) == 0 and c == '0':
                continue

            stk.append(c)

        # 如果 k 还没用完，继续从尾部删除
        while k > 0 and len(stk) > 0:
            stk.pop()
            k -= 1

        if len(stk) == 0:
            return "0"

        return ''.join(stk)