// 第一章，经典图算法，Dijkstra 算法核心原理
import { PriorityQueue } from './priority-queue';
// 记录队列中的状态
class State {
  // 当前节点 ID
  constructor(node, distFromStart) {
    this.node = node;
    // 从起点 s 到当前 node 节点的最小路径权重和
    this.distFromStart = distFromStart;
  }
}

// 输入不包含负权重边的加权图 graph 和起点 src
// 返回从起点 src 到其他节点的最小路径权重和
function dijkstra(graph, src) {
  // 记录从起点 src 到其他节点的最小路径权重和

  // distTo[i] 表示从起点 src 到节点 i 的最小路径权重和 !!!
  const distTo = Array(graph.size()).fill(Infinity);

  // 优先级队列，distFromStart 较小的节点排在前面
  const pq = new PriorityQueue((a, b) => a.distFromStart - b.distFromStart);

  // 从起点 src 开始进行 BFS
  pq.enqueue(new State(src, 0));
  distTo[src] = 0;

  while (!pq.isEmpty()) {
    const state = pq.dequeue();
    const curNode = state.node;
    const curDistFromStart = state.distFromStart;

    if (distTo[curNode] < curDistFromStart) { // [!code highlight:5]
      // 在 Dijkstra 算法中，队列中可能存在重复的节点 state
      // 所以要在元素出队时进行判断，去除较差的重复节点
      continue;
    }

    for (const e of graph.neighbors(curNode)) {
      const nextNode = e.to;
      const nextDistFromStart = curDistFromStart + e.weight;

      if (distTo[nextNode] <= nextDistFromStart) {
        continue;
      }
      // [!code highlight:6]
      // 将 nextNode 节点加入优先级队列
      pq.enqueue(new State(nextNode, nextDistFromStart));
      // 记录 nextNode 节点到起点的最小路径权重和
      distTo[nextNode] = nextDistFromStart;
    }
  }

  return distTo;
}