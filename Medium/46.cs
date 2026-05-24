
using System;
using System.Collections.Generic;

public class Solution {
  public IList<IList<int>> Permute(int[] nums) {
    // 二维数组
    IList<IList<int>> res = new List<IList<int>>();
    List<int> path = new List<int>();
    bool[] used = new bool[nums.Length];

    void Backtracking() {
      if (path.Count == nums.Length) {
        res.Add(new List<int>(path));
        return;
      }

      for (int i = 0; i < nums.Length; i++) {
        if (used[i]) {
          continue;
        }

        path.Add(nums[i]);
        used[i] = true;

        Backtracking();

        path.RemoveAt(path.Count - 1);
        used[i] = false;
      }
    }

    Backtracking();
    return res;
  }
}