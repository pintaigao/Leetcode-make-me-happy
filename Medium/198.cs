using System;
using System.Collections.Generic;

public class Solution {
  public int Rob(int[] nums) {
    if (nums == null || nums.Length == 0) {
      return 0;
    }

    int[,] result = new int[nums.Length, 2];

    for (int i = 0; i < nums.Length; i++) {
      // base case
      if (i == 0) {
        result[i, 0] = 0;
        result[i, 1] = nums[i];
      }
      else {
        // position 1: no rob
        // 今天不偷，昨天可以偷，也可以不偷
        result[i, 0] = Math.Max(result[i - 1, 1], result[i - 1, 0]);

        // position 2: rob
        // 今天偷，昨天不能偷
        result[i, 1] = result[i - 1, 0] + nums[i];
      }
    }

    return Math.Max(result[nums.Length - 1, 0], result[nums.Length - 1, 1]);
  }
}