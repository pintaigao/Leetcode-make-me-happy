using System;
using System.Collections.Generic;

public class Solution
{
  public bool ValidTree4(int n, int[][] edges)
  {
    // 构建邻接表
    var adjacencyList = new List<int>[n];
    for (int i = 0; i < n; i++)
    {
      adjacencyList[i] = new List<int>();
    }

    foreach (var edge in edges)
    {
      int u = edge[0];
      int v = edge[1];
      adjacencyList[u].Add(v);
      adjacencyList[v].Add(u);
    }

    // parent 记录每个节点的父节点
    // 用 -2 表示“还没访问过”
    // 0 的父节点设为 -1，表示根节点没有父节点
    int[] parent = new int[n];
    Array.Fill(parent, -2);
    parent[0] = -1;

    Queue<int> queue = new Queue<int>();
    queue.Enqueue(0);

    int edgeCount = 0;

    while (queue.Count != 0)
    {
      int node = queue.Dequeue();

      foreach (int neighbor in adjacencyList[node])
      {
        // 跳过指向父节点的那条边
        if (parent[node] == neighbor)
        {
          continue;
        }

        // 如果这个邻居已经访问过，说明有环
        if (parent[neighbor] != -2)
        {
          return false;
        }

        queue.Enqueue(neighbor);
        parent[neighbor] = node;
        edgeCount++;
      }
    }

    // 防止图不连通
    return edgeCount == n - 1;
  }
}