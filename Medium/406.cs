using System;
using System.Collections.Generic;
using System.Linq;

public class Solution {
  public int[][] ReconstructQueue(int[][] people) {
    Array.Sort(people, (a, b) => {
      if (a[0] == b[0]) {
        return a[1].CompareTo(b[1]); // k 升序
      }

      return b[0].CompareTo(a[0]); // 身高降序
    });

    List<int[]> output = new List<int[]>();

    foreach (int[] p in people) {
      output.Insert(p[1], p);
    }

    return output.ToArray();
  }
}