using System;
using System.Collections.Generic;
using System.Text;

public class Solution {
  public string RemoveDuplicates(string s, int k) {
    List<char> result = new List<char>(s.ToCharArray());
    List<int> counts = new List<int>();

    for (int i = 0; i < result.Count; ++i) {
      // 如果是指针指向第一个元素，或者当前元素和前一个元素不相同，则 stack push 1
      if (i == 0 || result[i] != result[i - 1]) {
        counts.Insert(0, 1);
      }
      else {
        // 如果当前元素和前一个元素相同，则 stack pop 然后 + 1
        int incremented = counts[0] + 1;
        counts.RemoveAt(0);

        // 如果 incremented == k，则删除 i-k+1 到 i+1 之间的元素
        if (incremented == k) {
          result.RemoveRange(i - k + 1, k);

          // 删除后，指针指向 i-k
          i = i - k;
        }
        else {
          // 如果 incremented < k，则 stack push incremented
          counts.Insert(0, incremented);
        }
      }
    }

    return new string(result.ToArray());
  }
}