// 第一章，经典图算法，Dijkstra 算法核心原理
import { PriorityQueue } from '../priority-queue';
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

  // distTo[i] 表示从起点 src 到节点 i 的最小路径权重和 !!! distTo 数组，确保算法不会陷入死循环，同时记录起点到其他节点的最短路径。
  const distTo = Array(graph.size()).fill(Infinity);

  // 优先级队列，distFromStart 较小的节点排在前面， 如果使用了优先级队列，最先出队的 state.distFromStart 必然很小，distTo[state.node] 就会很小，这就能避免很多非最优的节点 state 入队，从而提升搜索效率。
  const pq = new PriorityQueue((a, b) => a.distFromStart - b.distFromStart);

  // 从起点 src 开始进行 BFS
  pq.enqueue(new State(src, 0));
  distTo[src] = 0;

  while (!pq.isEmpty()) {
    const state = pq.dequeue();
    const curNode = state.node, curDistFromStart = state.distFromStart;

    // 如果 distTo[curNode] 已经有值了，curNode 已经被访问过了，比较
    if (distTo[curNode] < curDistFromStart) {
      // 在 Dijkstra 算法中，队列中可能存在重复的节点 state
      // 所以要在元素出队时进行判断，去除较差的重复节点
      continue;
    }

    for (const e of graph.neighbors(curNode)) {
      // 查看 Next One
      const nextNode = e.to, nextDistFromStart = curDistFromStart + e.weight;
      // 入队剪枝：小于等于
      // 如果 nextNode 也已经被看过了 (distTo[nextNode]有值了)， 而且值要小于等于现在nextNode计算出来的nextDistFromStart，忽略这个 nextNode
      // 为什么等于也可以不用看：因为入队时会同步执行 distTo[nextNode] = nextDistFromStart，所以 distTo[nextNode] 等于某个值，就说明之前已经有一个携带同样距离的 state 入过队了，那个 state 还在队列里等着扩散（或者已经扩散过了），再入队一个一模一样的 state 纯属多余，应该跳过。
      if (distTo[nextNode] <= nextDistFromStart) { continue }
      // 将 nextNode 节点加入优先级队列
      pq.enqueue(new State(nextNode, nextDistFromStart));
      // 记录 nextNode 节点到起点的最小路径权重和
      distTo[nextNode] = nextDistFromStart;
    }
  }

  return distTo;
}