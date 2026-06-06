using System;
using System.Collections.Generic;

public class Solution {
  public int NetworkDelayTime(int[][] times, int n, int k) {
    // 节点编号是从 1 开始的，所以要一个大小为 n + 1 的邻接表
    List<(int toNode, int weight)>[] graph = new List<(int toNode, int weight)>[n + 1];
    int res = 0;

    for (int i = 0; i <= n; i++) {
      graph[i] = new List<(int toNode, int weight)>();
    }

    // 构造图
    foreach (int[] edge in times) {
      int from = edge[0];
      int to = edge[1];
      int weight = edge[2];

      // from -> List<(to, weight)>
      // 邻接表存储图结构，同时存储权重信息
      graph[from].Add((to, weight));
    }

    // Dijkstra 算法模板
    int[] Dijkstra(int src) {
      // distTo[i] = 从起点到节点 i 的最小距离
      // int.MaxValue 表示未知
      // 最小堆，元素为 (distFromStart, node)
      int[] distTo = new int[graph.Length];

      for (int i = 0; i < distTo.Length; i++) {
        distTo[i] = int.MaxValue;
      }

      PriorityQueue<(int distFromStart, int node), int> pq = new PriorityQueue<(int distFromStart, int node), int>();

      // 起点 src，距离为 0
      pq.Enqueue((0, src), 0);
      distTo[src] = 0;

      while (pq.Count > 0) {
        var cur = pq.Dequeue();
        int curDist = cur.distFromStart;
        int curNode = cur.node;

        // 如果已有更优路径，则跳过
        if (distTo[curNode] < curDist) {
          continue;
        }

        // 遍历当前节点的邻居
        foreach (var edge in graph[curNode]) {
          int nextNode = edge.toNode;
          int weight = edge.weight;
          int nextDist = curDist + weight;

          if (distTo[nextNode] <= nextDist) {
            continue;
          }

          pq.Enqueue((nextDist, nextNode), nextDist);
          distTo[nextNode] = nextDist;
        }
      }

      return distTo;
    }

    int[] distToResult = Dijkstra(k);

    // 找到最长的那条最短路径
    for (int i = 1; i <= n; i++) {
      if (distToResult[i] == int.MaxValue) {
        // 有节点不可达
        return -1;
      }

      res = Math.Max(res, distToResult[i]);
    }

    return res;
  }
}