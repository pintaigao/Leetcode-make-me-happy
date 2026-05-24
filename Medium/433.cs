using System;
using System.Collections.Generic;

public class Solution {
  public int MinMutation(string startGene, string endGene, string[] bank) {
    // BFS 标准框架
    HashSet<string> bankSet = new HashSet<string>(bank);
    Queue<string> q = new Queue<string>();
    HashSet<string> visited = new HashSet<string>();

    q.Enqueue(startGene);
    visited.Add(startGene);
    int step = 0;
    if (!bankSet.Contains(endGene)) {
      return -1;
    }

    // 当前基因的每个位置都可以变异为 A/G/C/T，穷举所有可能的结构
    List<string> GetAllMutation(string gene) {
      List<string> res = new List<string>();
      char[] geneChars = gene.ToCharArray();

      for (int i = 0; i < geneChars.Length; i++) {
        char oldChar = geneChars[i];

        foreach (char newChar in new char[] { 'A', 'G', 'C', 'T' }) {
          if (oldChar == newChar) {
            continue;
          }

          geneChars[i] = newChar;
          res.Add(new string(geneChars));
        }

        geneChars[i] = oldChar;
      }

      return res;
    }
    // BFS 主体
    while (q.Count > 0) {
      int size = q.Count;

      for (int j = 0; j < size; j++) {
        string cur = q.Dequeue();

        if (cur == endGene) {
          return step;
        }

        // 向周围扩散
        foreach (string newGene in GetAllMutation(cur)) {
          if (!visited.Contains(newGene) && bankSet.Contains(newGene)) {
            q.Enqueue(newGene);
            visited.Add(newGene);
          }
        }
      }

      step++;
    }

    return -1;
  }
}