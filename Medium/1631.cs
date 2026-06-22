using System;
using System.Collections.Generic;

public class Solution {
  public int MinimumEffortPath(int[][] heights) {
    // Dijkstra 算法，计算 (0, 0) 到 (m - 1, n - 1) 的最小体力消耗
    return Dijkstra(heights);
  }

  // 记录当前位置和从起点到当前位置的最小体力消耗
  public class State {
    public int row;
    public int col;
    public int effortFromStart;

    public State(int row, int col, int effortFromStart) {
      this.row = row;
      this.col = col;
      this.effortFromStart = effortFromStart;
    }
  }

  public int Dijkstra(int[][] matrix) {
    // 记录从起点 (0, 0) 到每个节点的最小体力消耗
    int m = matrix.Length;
    int n = matrix[0].Length;

    int[][] distTo = new int[m][];
    for (int i = 0; i < m; i++) {
      distTo[i] = new int[n];
      for (int j = 0; j < n; j++) {
        distTo[i][j] = int.MaxValue;
      }
    }

    int[][] dirs = new int[][] {
      new int[] { 0, 1 },
      new int[] { 1, 0 },
      new int[] { 0, -1 },
      new int[] { -1, 0 }
    };

    PriorityQueue<State, int> pq = new PriorityQueue<State, int>();

    // 从起点 (0, 0) 开始进行 dijkstra 算法
    distTo[0][0] = 0;
    pq.Enqueue(new State(0, 0, 0), 0);

    while (pq.Count > 0) {
      State state = pq.Dequeue();
      int curRow = state.row;
      int curCol = state.col;
      int curEffortFromStart = state.effortFromStart;

      // 已经存在更优路径，则跳过
      if (distTo[curRow][curCol] < curEffortFromStart) {
        continue;
      }

      // 判断是否已经到达目标点
      // 如果要提前返回，可以打开这一段
      // if (curRow == m - 1 && curCol == n - 1) {
      //   return distTo[curRow][curCol];
      // }

      // For Next One
      foreach (int[] dir in dirs) {
        int nextRow = curRow + dir[0];
        int nextCol = curCol + dir[1];

        // 索引越界
        if (nextRow >= m || nextRow < 0 || nextCol >= n || nextCol < 0) {
          continue;
        }

        // 从起点到下一个节点的体力消耗 =
        // 从起点到当前节点的体力消耗 和 当前节点到下一个节点的体力消耗 的较大值
        // Math.Max 的原因是因为题目要求的是路径上每一步的体力消耗的最大值
        int nextEffortFromStart = Math.Max(curEffortFromStart, Math.Abs(matrix[nextRow][nextCol] - matrix[curRow][curCol]));

        // 存在更优路径，则更新 distTo 数组和优先级队列
        if (distTo[nextRow][nextCol] > nextEffortFromStart) {
          distTo[nextRow][nextCol] = nextEffortFromStart;
          pq.Enqueue(new State(nextRow, nextCol, nextEffortFromStart), nextEffortFromStart);
        }
      }
    }

    return distTo[m - 1][n - 1] >= 0 ? distTo[m - 1][n - 1] : -1;
  }
}