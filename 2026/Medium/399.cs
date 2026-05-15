using System;
using System.Collections.Generic;

public class Solution {
  class Edge {
    public string node;
    public double weight;

    public Edge(string node, double weight) {
      this.node = node;
      this.weight = weight;
    }
  }

  public double[] CalcEquation(IList<IList<string>> equations, double[] values, IList<IList<string>> queries) {
    // 把 equations 抽象成一幅图，邻接表存储
    Dictionary<string, List<Edge>> graph = new Dictionary<string, List<Edge>>();
    double[] res = new double[queries.Count];

    for (int i = 0; i < equations.Count; i++) {
      string a = equations[i][0];
      string b = equations[i][1];
      double w = values[i];

      // 构建双向图
      if (!graph.ContainsKey(a)) {
        graph[a] = new List<Edge>();
      }
      graph[a].Add(new Edge(b, w));

      if (!graph.ContainsKey(b)) {
        graph[b] = new List<Edge>();
      }
      graph[b].Add(new Edge(a, 1.0 / w));
    }

    double Bfs(string start, string end) {
      if (!graph.ContainsKey(start) || !graph.ContainsKey(end)) {
        return -1.0;
      }

      if (start == end) {
        return 1.0;
      }

      // BFS 标准框架
      // key 为节点 ID（变量名），value 记录从 start 到该节点的路径乘积
      Queue<string> queue = new Queue<string>();
      HashSet<string> visited = new HashSet<string>();
      Dictionary<string, double> weight = new Dictionary<string, double>();

      queue.Enqueue(start);
      weight[start] = 1.0;

      // 不能 visited = new HashSet<char>(start)，因为 start = "aa" 的话，结果是字符 'a'
      visited.Add(start);

      while (queue.Count > 0) {
        string cur = queue.Dequeue();

        foreach (Edge neighbor in graph[cur]) {
          if (!visited.Contains(neighbor.node)) {
            // 更新路径乘积
            weight[neighbor.node] = weight[cur] * neighbor.weight;

            if (neighbor.node == end) {
              return weight[end];
            }
            // 记录 visited
            visited.Add(neighbor.node);
            // 新节点加入队列继续遍历
            queue.Enqueue(neighbor.node);
          }
        }
      }

      return -1.0;
    }

    // Loop Query
    // BFS 遍历图，计算 start 到 end 的路径乘积
    for (int i = 0; i < queries.Count; i++) {
      res[i] = Bfs(queries[i][0], queries[i][1]);
    }

    return res;
  }
}