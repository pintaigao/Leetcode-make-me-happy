using System;
using System.Collections.Generic;

public class Solution {
  public bool CanFinishBFS(int numCourses, int[][] prerequisites) {
    // 1. Build Graph
    // graph[from] = [to1, to2, ...]
    // 表示 from 这门课是 to1、to2、... 这些课的前置课程
    List<int>[] graph = new List<int>[numCourses];
    int[] preCourseCount = new int[numCourses];
    for (int i = 0; i < numCourses; i++) {
      graph[i] = new List<int>();
    }

    foreach (int[] pair in prerequisites) {
      int course = pair[0], pre = pair[1];
      graph[pre].Add(course);
      preCourseCount[course] += 1;
    }

    // 2. 找出入度为 0，也就是没有前置课程的课
    Queue<int> queue = new Queue<int>();
    int courseAttend = 0;
    for (int i = 0; i < preCourseCount.Length; i++) {
      if (preCourseCount[i] == 0) {
        queue.Enqueue(i);
      }
    }

    // 3. BFS，题目的目的是能不能完成所有课程，即检测有没有环
    while (queue.Count > 0) {
      int course = queue.Dequeue();
      courseAttend += 1;
      foreach (int nextCourse in graph[course]) {
        // 上了 course 本课，所以相应的 preCourseCount[nextCourse] -= 1
        preCourseCount[nextCourse] -= 1;
        if (preCourseCount[nextCourse] == 0) {
          queue.Enqueue(nextCourse);
        }
      }
    }

    // 4. 最后查看是不是上了所有的课
    return courseAttend == numCourses;
  }

  public bool CanFinish(int numCourses, int[][] prerequisites) {
    // 1. Build Graph
    Dictionary<int, List<int>> graph = new Dictionary<int, List<int>>();
    HashSet<int> path = new HashSet<int>();
    bool[] visited = new bool[numCourses];
    bool hasCycle = false;

    foreach (int[] pair in prerequisites) {
      int course = pair[0], pre = pair[1];

      if (!graph.ContainsKey(pre)) {
        graph[pre] = new List<int>();
      }

      graph[pre].Add(course);
    }

    // 2. DFS 逻辑
    void Traveler(int course) {
      if (path.Contains(course)) {
        hasCycle = true;
        return;
      }

      if (!graph.ContainsKey(course) || visited[course]) {
        return;
      }

      visited[course] = true;
      path.Add(course);

      foreach (int c in graph[course]) {
        // 这里不能用 if (!visited[c]) Traveler(c)
        // 因为我们需要在 DFS 的过程中检测有没有环
        // 所以不能直接跳过 visited[c] == true 的节点
        // 因为它可能在当前 DFS 的路径上，形成了一个环
        Traveler(c);

        if (hasCycle) {
          return;
        }
      }

      path.Remove(course);
    }

    // 3. 遍历图中的每个节点，进行 DFS
    for (int i = 0; i < numCourses; i++) {
      if (!visited[i]) {
        Traveler(i);

        if (hasCycle) {
          return false;
        }
      }
    }

    return true;
  }
}