class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        left = 0
        right = 0
        window_char_count = [0] * 26
        window_max_count = 0
        res = 0

        while right < len(s):
            # 扩大窗口
            c = ord(s[right]) - ord('A')
            window_char_count[c] += 1
            window_max_count = max(window_max_count, window_char_count[c])
            right += 1

            # 如果窗口长度 - 窗口内最多字符出现次数 > k
            # 说明剩下那些字符无法全部用 k 次替换变成同一个字符
            while right - left - window_max_count > k:
                left_char_index = ord(s[left]) - ord('A')
                window_char_count[left_char_index] -= 1
                left += 1

            # 当前窗口合法，更新答案
            res = max(res, right - left)

        return res