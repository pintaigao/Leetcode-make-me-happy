using System;
using System.Collections.Generic;
using System.Linq;

public class Solution {
  public int[] FindOrder(int numCourses, int[][] prerequisites) {
    Dictionary<int, List<int>> map = new Dictionary<int, List<int>>();
    List<int> res = new List<int>();
    HashSet<int> visited = new HashSet<int>();
    HashSet<int> currentPath = new HashSet<int>();
    bool hasCycle = false;

    // Build
    foreach (int[] pair in prerequisites) {
      int course = pair[0];
      int pre = pair[1];

      if (!map.ContainsKey(pre)) {
        map[pre] = new List<int>();
      }

      map[pre].Add(course);

      if (!map.ContainsKey(course)) {
        map[course] = new List<int>();
      }
    }

    void Dfs(int course) {
      if (currentPath.Contains(course)) {
        hasCycle = true;
        return;
      }

      if (visited.Contains(course) || hasCycle) {
        return;
      }

      // 防止重复访问
      // visited 和 currentPath 的区别：
      // visited 是全局访问过的节点
      // currentPath 是当前 DFS 路径上的节点
      visited.Add(course);
      currentPath.Add(course);

      // 如果 map 里没有这个 course，说明它没有后续课程
      // 对应 JS 里 map[course] = [] 的情况
      if (map.ContainsKey(course)) {
        foreach (int c in map[course]) {
          Dfs(c);

          if (hasCycle) {
            return;
          }
        }
      }

      // 严格按照 Topological Sort 的方式
      // 后序遍历的时候加上 current 节点
      res.Add(course);
      currentPath.Remove(course);
    }

    for (int i = 0; i < numCourses; i++) {
      Dfs(i);
    }

    if (hasCycle) {
      return new int[0];
    }

    res.Reverse();
    return res.ToArray();
  }
}