/*
JavaScript -> C# 转换速查
重点：刷 LeetCode 时，把 JS 思维转换成 C# 写法。
JS 对应写法会放在 comment 里。
*/

using System;
using System.Collections.Generic;
using System.Linq;

public class ConversionNotes {
  public void Notes() {
    // =========================
    // 1. Array / List
    // =========================

    // JS: let arr = [];
    List<int> arr = new List<int>();

    // JS: let arr = new Array(n).fill(0);
    int n = 5;
    int[] nums = new int[n]; // 默认全是 0

    // JS: let arr = new Array(n).fill(-1);
    int[] nums2 = new int[n];
    Array.Fill(nums2, -1);

    // JS: let graph = Array.from({ length: n }, () => []);
    List<int>[] graph = new List<int>[n];
    for (int i = 0; i < n; i++) {
      graph[i] = new List<int>();
    }

    // JS: s.split("")
    string s = "abc";
    List<char> chars = new List<char>(s.ToCharArray());

    // JS: arr.push(x)
    arr.Add(1);

    // JS: arr.pop()
    arr.RemoveAt(arr.Count - 1);

    // JS: arr.unshift(x)
    arr.Insert(0, 1);

    // JS: arr.shift()
    int first = arr[0];
    arr.RemoveAt(0);

    // JS: arr.splice(start, deleteCount)
    int start = 0;
    int deleteCount = 1;
    arr.RemoveRange(start, deleteCount);

    // JS: arr.slice(start, end)
    List<int> sliced = arr.GetRange(start, deleteCount);

    // JS: arr.join("")
    string joined = new string(chars.ToArray());

    // JS: res.reverse()
    arr.Reverse();


    // =========================
    // 2. Object / Map / Dictionary
    // =========================

    // JS: let dict = {};
    Dictionary<int, int> dict = new Dictionary<int, int>();

    // JS: let map = new Map();
    Dictionary<int, List<int>> map = new Dictionary<int, List<int>>();

    // JS:
    // map[pre] = (map[pre] || []).concat(course);
    // map[course] = map[course] || [];
    int pre = 0;
    int course = 1;
    if (!map.ContainsKey(pre)) {
      map[pre] = new List<int>();
    }
    map[pre].Add(course);
    if (!map.ContainsKey(course)) {
      map[course] = new List<int>();
    }

    // JS: if (map.has(key))
    int key = 1;
    if (map.ContainsKey(key)) {
    }

    // JS: map.get(key)
    List<int> value = map[key];

    // safer version
    if (map.TryGetValue(key, out List<int> foundValue)) {
    }

    // JS: map.set(key, value)
    map[key] = new List<int>();

    // JS: Object.keys(obj)
    var keys = map.Keys;

    // JS: Object.values(obj)
    var values = map.Values;

    // JS: Object.entries(obj)
    foreach (KeyValuePair<int, List<int>> entry in map) {
      int entryKey = entry.Key;
      List<int> entryValue = entry.Value;
    }


    // =========================
    // 3. Set
    // =========================

    // JS: let visited = new Set();
    HashSet<int> visited = new HashSet<int>();

    // JS: visited.add(x)
    visited.Add(1);

    // JS: visited.has(x)
    if (visited.Contains(1)) {
    }

    // JS: visited.delete(x)
    visited.Remove(1);


    // =========================
    // 4. Queue / BFS
    // =========================

    // JS: let queue = [];
    Queue<int> queue = new Queue<int>();

    // JS: queue.push(x)
    queue.Enqueue(1);

    // JS: queue.shift()
    int cur = queue.Dequeue();

    // JS: while (queue.length)
    while (queue.Count > 0) {
      break;
    }

    // JS: queue.length
    int length = queue.Count;


    // =========================
    // 5. PriorityQueue
    // =========================

    // JS: const pq = new PriorityQueue((a, b) => a[0] - b[0]);
    // C#: PriorityQueue<TElement, TPriority>
    // priority 越小越先出来
    PriorityQueue<(int dist, int node), int> pq = new PriorityQueue<(int dist, int node), int>();

    // JS: pq.enqueue([dist, node])
    int dist = 3;
    int node = 2;
    pq.Enqueue((dist, node), dist);

    // JS: const [curDist, curNode] = pq.dequeue();
    var item = pq.Dequeue();
    int curDist = item.dist;
    int curNode = item.node;

    // JS: pq.isEmpty()
    if (pq.Count == 0) {
    }

    // 如果要 max heap，用负数 priority
    pq.Enqueue((dist, node), -dist);


    // =========================
    // 6. Tuple
    // =========================

    // JS: graph[from].push([to, weight])
    List<(int toNode, int weight)>[] weightedGraph = new List<(int toNode, int weight)>[n + 1];
    for (int i = 0; i <= n; i++) {
      weightedGraph[i] = new List<(int toNode, int weight)>();
    }

    int from = 1;
    int to = 2;
    int weight = 5;
    weightedGraph[from].Add((to, weight));

    // JS: for (const [nextNode, weight] of graph[curNode])
    foreach (var edge in weightedGraph[from]) {
      int nextNode = edge.toNode;
      int edgeWeight = edge.weight;
    }

    // C# 也可以解构 tuple
    foreach (var (nextNode, edgeWeight) in weightedGraph[from]) {
    }


    // =========================
    // 7. For Loop
    // =========================

    // JS: for (let i = 0; i < n; i++)
    for (int i = 0; i < n; i++) {
    }

    // JS: for (let i = n - 1; i >= 0; i--)
    for (int i = n - 1; i >= 0; i--) {
    }

    // JS: for (let item of arr)
    foreach (int x in arr) {
    }

    // JS: for (let [course, pre] of prerequisites)
    int[][] prerequisites = new int[][] {
      new int[] { 1, 0 },
      new int[] { 2, 0 }
    };
    foreach (int[] pair in prerequisites) {
      int c = pair[0];
      int p = pair[1];
    }


    // =========================
    // 8. String
    // =========================

    // JS: s[i]
    char ch = s[0];

    // JS: s.charCodeAt(i) - 'A'.charCodeAt(0)
    int index = s[0] - 'A';

    // JS: s.substring(start, end)
    // C# Substring(start, length)，第二个参数是长度，不是 end index
    string sub = s.Substring(0, 2);

    // JS: s.substring(0, i) + s.substring(i + 1)
    int removeIndex = 1;
    string newS = s.Substring(0, removeIndex) + s.Substring(removeIndex + 1);


    // =========================
    // 9. Infinity
    // =========================

    // JS: Infinity
    int inf = int.MaxValue;

    // JS: Math.max(a, b)
    int maxVal = Math.Max(1, 2);

    // JS: Math.min(a, b)
    int minVal = Math.Min(1, 2);


    // =========================
    // 10. Sort
    // =========================

    int[] arr2 = new int[] { 3, 1, 2 };

    // JS: arr.sort((a, b) => a - b)
    Array.Sort(arr2);

    // JS: arr.sort((a, b) => b - a)
    Array.Sort(arr2, (a, b) => b.CompareTo(a));

    int[][] people = new int[][] {
      new int[] { 7, 0 },
      new int[] { 4, 4 },
      new int[] { 7, 1 }
    };

    // JS: people.sort((a, b) => b[0] - a[0] || a[1] - b[1])
    Array.Sort(people, (a, b) => {
      if (a[0] == b[0]) {
        return a[1].CompareTo(b[1]);
      }
      return b[0].CompareTo(a[0]);
    });


    // =========================
    // 11. Local Function / DFS
    // =========================

    // JS:
    // let hasCycle = false;
    // function dfs(course) {
    //   hasCycle = true;
    // }
    // C# local function 可以直接修改外层变量
    bool hasCycle = false;

    void Dfs(int currentCourse) {
      hasCycle = true;
    }

    Dfs(0);


    // =========================
    // 12. 常见 LeetCode Return
    // =========================

    // JS: return [];
    int[] emptyArray = new int[0];

    // JS: return res;
    List<int> res = new List<int>();
    int[] resultArray = res.ToArray();

    // JS: return "";
    string emptyString = "";

    // JS: return true / false
    bool booleanValue = true;
  }
}
