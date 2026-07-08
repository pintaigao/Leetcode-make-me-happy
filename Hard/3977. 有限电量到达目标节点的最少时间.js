/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} power
 * @param {number[]} cost
 * @param {number} source
 * @param {number} target
 * @return {number[]}
 */

// 1. 暴力DFS
function minTimeMaxPower(n, edges, power, cost, source, target) {
  // memo[node][powerLeft] = best time we used to reach this state
  let graph = Array.from({ length: n }, () => []), minTime = Infinity, maxRemainPower = -1, memo = Array.from({ length: n }, () => new Map());
  for (const [u, v, t] of edges) { graph[u].push({ node: v, time: t }) }

  function dfs(node, powerLeft, time) {
    // 如果当前时间已经超过答案，没有必要继续
    if (time > minTime) return;

    // 到达 target，直接记录，不再扣电
    // 首先要满足到达 target 时：1. 时间最少 
    if (node === target) {
      if (time < minTime) {
        minTime = time;
        maxRemainPower = powerLeft;
      } else if (time === minTime) {
        // 2. 时间最小的前提下电量最多
        maxRemainPower = Math.max(maxRemainPower, powerLeft);
      }
      return;
    }

    // 如果这个状态以前用更短或相同时间到达过，当前路径没必要继续
    if (memo[node].has(powerLeft) && memo[node].get(powerLeft) <= time) { return; }
    memo[node].set(powerLeft, time);
    // 要离开 node，必须有足够电量
    if (powerLeft < cost[node]) return;
    for (const edge of graph[node]) {
      // 到下一个节点，扣除当前的 energy(从cost中获得)，加上到达下一个节点的时间
      dfs(edge.node, powerLeft - cost[node], time + edge.time);
    }
  }

  dfs(source, power, 0);

  return minTime === Infinity ? [-1, -1] : [minTime, maxRemainPower];
}

// 2. Dijkstra
var minTime = function (n, edges, cost, power, source, target) {
  // dist[node][powerLeft] = minimum time to reach this state
  // 到达 node，并且剩余 powerLeft 电量时，最少需要多少时间，为什么不能只记录 dist[node] = minimum time to reach node, 因为到达 node 的时间可能一样，但是剩余电量不同，剩余电量不同可能会影响后续的路径选择
  let graph = Array.from({ length: n }, () => []), pq = new PriorityQueue((a, b) => a.time - b.time), dist = Array.from({ length: n }, () => Array(power).fill(Infinity)), bestTime = Infinity, bestPower = -1;
  for (const [u, v, t] of edges) { graph[u].push([v, t]); }
  dist[source][power] = 0;
  // 优先队列中存储 { node, time, powerLeft },先走时间短的状态
  pq.enqueue({ node: source, time: 0, powerLeft: power });

  while (!pq.isEmpty()) {
    const { node, time, powerLeft } = pq.dequeue();

    // 如果当前时间已经超过最优 target 时间，可以停止
    if (time > dist[node][powerLeft]) continue;

    // 如果已经超过最优 target 时间，可以停止
    if (bestTime !== Infinity && time > bestTime) break;

    // 和上面一样
    if (node === target) {
      if (time < bestTime) {
        bestTime = time;
        bestPower = powerLeft;
      } else if (time === bestTime) {
        bestPower = Math.max(bestPower, powerLeft);
      }
      continue;
    }

    // 还有电量进行下一步
    if (powerLeft >= cost[node]) {
      const nextPower = powerLeft - cost[node];
      for (const [nextNode, edgeTime] of graph[node]) {
        const nextTime = time + edgeTime;
        // 如果到达下一个节点的时间比之前记录的更短，更新并加入队列
        if (nextTime < dist[nextNode][nextPower]) {
          dist[nextNode][nextPower] = nextTime;
          pq.enqueue({ node: nextNode, time: nextTime, powerLeft: nextPower });
        }
      }
    }
  }

  return bestTime === Infinity ? [-1, -1] : [bestTime, bestPower];
};