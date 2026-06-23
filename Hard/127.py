from typing import List


class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        word_set = set(wordList)
        if endWord not in word_set:
            return 0

        begin_set = {beginWord}
        end_set = {endWord}
        step = 1
        word_len = len(beginWord)

        while begin_set and end_set:
            # Expand the smaller frontier to reduce branching.
            if len(begin_set) > len(end_set):
                begin_set, end_set = end_set, begin_set

            next_set = set()

            for word in begin_set:
                chars = list(word)
                for i in range(word_len):
                    original = chars[i]
                    for c in range(ord('a'), ord('z') + 1):
                        ch = chr(c)
                        if ch == original:
                            continue

                        chars[i] = ch
                        next_word = ''.join(chars)

                        if next_word in end_set:
                            return step + 1

                        if next_word in word_set:
                            next_set.add(next_word)
                            word_set.remove(next_word)

                    chars[i] = original

            begin_set = next_set
            step += 1

        return 0
