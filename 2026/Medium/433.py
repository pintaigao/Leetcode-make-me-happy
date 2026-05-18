from typing import List
from collections import deque


class Solution:
  def minMutation(self, startGene: str, endGene: str, bank: List[str]) -> int:
    # BFS 标准框架
    bank_set = set(bank)
    q = deque([startGene])
    visited = set([startGene])
    step = 0

    if endGene not in bank_set:
      return -1

    # 当前基因的每个位置都可以变异为 A/G/C/T，穷举所有可能的结构
    def get_all_mutation(gene: str) -> List[str]:
      res = []
      gene_chars = list(gene)

      for i in range(len(gene_chars)):
        old_char = gene_chars[i]

        for new_char in ["A", "G", "C", "T"]:
          if old_char == new_char:
            continue

          gene_chars[i] = new_char
          res.append("".join(gene_chars))

        gene_chars[i] = old_char

      return res

    while len(q) > 0:
      size = len(q)

      for j in range(size):
        cur = q.popleft()

        if cur == endGene:
          return step

        # 向周围扩散
        for new_gene in get_all_mutation(cur):
          if new_gene not in visited and new_gene in bank_set:
            q.append(new_gene)
            visited.add(new_gene)

      step += 1

    return -1