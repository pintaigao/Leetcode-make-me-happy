using System;
using System.Collections.Generic;

public class Solution {
  public int MinimumSemesters(int n, int[][] relations) {
    // 创建邻接表和入度数组
    // 用于存储每个节点的相邻节点
    // 用于存储每个节点的入度
    // 记录学期数 和 记录访问的节点数
    Dictionary<int, List<int>> adjList = new Dictionary<int, List<int>>();
    int[] counts = new int[n + 1];
    int terms = 0;
    int visited = 0;
    Queue<int> queue = new Queue<int>();

    // 构建邻接表和入度数组
    for (int i = 0; i < relations.Length; i++) {
      int prevCourse = relations[i][0];
      int nextCourse = relations[i][1];

      // 将先修关系添加到邻接表中
      if (!adjList.ContainsKey(prevCourse)) {
        adjList[prevCourse] = new List<int>();
      }

      adjList[prevCourse].Add(nextCourse);

      // 表示 nextCourse 这个课有多少个前置课
      counts[nextCourse] += 1;
    }

    // 找出入度为 0 的课程，即没有先修课程的课程，作为 BFS 的起点
    for (int i = 1; i <= n; i++) {
      if (counts[i] == 0) {
        queue.Enqueue(i);
      }
    }

    // 如果没有入度为 0 的节点，说明存在环，返回 -1
    if (queue.Count == 0) {
      return -1;
    }

    while (queue.Count > 0) {
      terms += 1;
      int size = queue.Count;

      for (int i = 0; i < size; i++) {
        int node = queue.Dequeue();
        visited += 1;

        // 如果当前节点有相邻节点
        if (adjList.ContainsKey(node)) {
          // 遍历当前节点的相邻节点
          foreach (int course in adjList[node]) {
            if (counts[course] >= 1) {
              // 更新后续课程的入度
              counts[course] -= 1;

              // 如果入度为 0，加入下一个学期的队列
              if (counts[course] == 0) {
                queue.Enqueue(course);
              }
            }
          }
        }
      }
    }

    // 如果访问的节点数等于总节点数，表示所有课程都学完了，返回学期数，否则返回 -1
    return visited == n ? terms : -1;
  }
}