import { PriorityQueue } from "../Algorithm/priority-queue.js"
var maxProbability = function (n, edges, succProb, start, end) {
  const graph = Array.from({ length: n }, () => []), pq = new PriorityQueue((a, b) => b[1] - a[1]); // [node, prob]
  // 构造无向图
  for (let i = 0; i < edges.length; i++) {
    const [from, to] = edges[i];
    // 无向图其实就是双向图
    graph[from].push([to, succProb[i]]);
    graph[to].push([from, succProb[i]]);
  }

  const probTo = Array(graph.length).fill(0.0);

  // 大顶堆，根据概率从大到小出队
  pq.push([start, 1.0]);
  probTo[start] = 1.0;

  while (!pq.isEmpty()) {
    const [curNode, curProb] = pq.pop();

    // 已经存在更优路径，则跳过
    if (probTo[curNode] > curProb) continue;

    // 判断是否已经到达目标点
    if (curNode === end) return probTo[curNode];

    for (const [nextNode, weight] of graph[curNode]) {
      const nextProb = curProb * weight;
      // 已经存在更优路径，则跳过
      if (probTo[nextNode] >= nextProb) {
        continue;
      }

      pq.push([nextNode, nextProb]);
      probTo[nextNode] = nextProb;
    }
  }

  // 若以上没有找到，根据题意返回 0 
  return 0;
};

console.log(maxProbability(3, [[0, 1], [1, 2], [0, 2]], [0.5, 0.5, 0.2], 0, 2));


// DFS 超时
var maxProbability = function (n, edges, succProb, start, end) {
  const graph = Array.from({ length: n }, () => []);
  for (let i = 0; i < edges.length; i++) {
    const [a, b] = edges[i];
    graph[a].push([b, succProb[i]]);
    graph[b].push([a, succProb[i]]);
  }

  let ans = 0, visited = new Array(n).fill(false);

  function dfs(node, pathProb) {
    if (node === end) {
      ans = Math.max(ans, pathProb);
      return;
    }

    visited[node] = true;

    for (const [next, prob] of graph[node]) {
      if (!visited[next]) {
        dfs(next, pathProb * prob);
      }
    }

    visited[node] = false;
  }

  dfs(start, 1);

  return ans;
};