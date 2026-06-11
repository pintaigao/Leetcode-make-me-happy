using System;
using System.Collections.Generic;

public class Solution {
  public int[][] DiagonalSort(int[][] mat) {
    // Data structure to store the diagonals.
    int m = mat.Length;
    int n = mat[0].Length;
    Dictionary<int, List<int>> diagonals = new Dictionary<int, List<int>>();

    // 按照斜的方向，把每一个斜线（key = row - col）上的值放入到 diagonals map 中
    // JS: diagonals[row - col].push(mat[row][col])
    for (int row = 0; row < m; row++) {
      for (int col = 0; col < n; col++) {
        int key = row - col;

        if (!diagonals.ContainsKey(key)) {
          diagonals[key] = new List<int>();
        }

        diagonals[key].Add(mat[row][col]);
      }
    }

    // 排序
    foreach (int key in diagonals.Keys) {
      diagonals[key].Sort();
    }

    // 放回原来的位置
    for (int row = 0; row < m; row++) {
      for (int col = 0; col < n; col++) {
        int key = row - col;

        mat[row][col] = diagonals[key][0];
        diagonals[key].RemoveAt(0);
      }
    }

    return mat;
  }
}