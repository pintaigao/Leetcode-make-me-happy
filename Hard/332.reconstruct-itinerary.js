/*
 * @lc app=leetcode id=332 lang=javascript
 *
 * [332] Reconstruct Itinerary
 */

// @lc code=start
/**
 * @param {string[][]} tickets
 * @return {string[]}
 */

/* 1. DFS */
var findItinerary = function (tickets) {
  // 邻接表形式的图，key 是机场名字，value 是从该机场出发能够到达的机场列表
  let graph = new Map();
  // 和 graph 对应，记录每张机票是否被使用过
  // 比如 graph["JFK"][2] = true 说明从机场 JFK 出发的第 3 张机票已经用过了
  let used = new Map();

  // 回溯算法使用的数据结构
  let track = [];
  // 回溯算法记录结果
  let res = null;

  // 1. 用机场的名字构建邻接表
  for (let ticket of tickets) {
    let from = ticket[0];
    let to = ticket[1];
    if (!graph.has(from)) {
      graph.set(from, []);
    }
    graph.get(from).push(to);
  }
  // 2. 对邻接表的每一行进行排序，保证字典序最小
  for (let list of graph.values()) {
    list.sort();
  }
  // 3. 初始化 used 结构，初始值都为 false
  for (let [key, list] of graph.entries()) {
    used.set(key, new Array(list.length).fill(false));
  }
  // 4. 从起点 "JFK" 开始启动 DFS 算法递归遍历
  track.push("JFK");

  function backtrack(airport) {
    if (res !== null) {
      // 已经找到答案了，不用再计算了
      return;
    }
    if (track.length === tickets.length + 1) {
      // track 里面包含了所有的机票，即得到了一个合法的结果
      // 注意 tickets.size() 要加一，因为 track 里面额外包含了起点 "JFK"
      res = Array.from(track);
      return;
    }
    if (!graph.has(airport)) {
      // 没有从 s 出发的边
      return;
    }
    // 遍历当前机场所有能够到达的机场
    let nextAirports = graph.get(airport);
    let usedList = used.get(airport);
    for (let nextIndex = 0; nextIndex < nextAirports.length; nextIndex++) {
      let nextAirport = nextAirports[nextIndex];
      if (usedList[nextIndex]) {
        // 如果这张机票被使用过，跳过
        continue;
      }
      // 做选择
      usedList[nextIndex] = true;
      track.push(nextAirport);
      // 递归
      backtrack(nextAirport);
      // 撤销选择
      usedList[nextIndex] = false;
      track.pop();
    }
  }

  backtrack("JFK");
  return res;
};

// 练习
var findItinerary = function (tickets) {
  let graph = {}, path = [];
  // build graph
  for (const [from, to] of tickets) { graph[from] = graph[from] ? [...graph[from], to] : [to]; }
  // sort destinations in reverse lexical order so we can pop the smallest one
  // 这里 reverse 只是为了将来用 pop
  for (const from in graph) { graph[from].sort().reverse(); }

  function dfs(airport) {
    while (graph[airport] && graph[airport].length > 0) {
      const next = graph[airport].pop();
      dfs(next);
    }

    path.push(airport);
  }

  dfs("JFK");

  return path.reverse();
};

// 欧拉算法
var findItinerary = function (tickets) {
  // 构建邻接表
  const graph = new Map();
  for (const [from, to] of tickets) {
    if (!graph.has(from)) graph.set(from, []);
    graph.get(from).push(to);
  }
  // 对每个出发点的目的地进行排序，确保字典序
  for (const [from, tos] of graph.entries()) {
    tos.sort();
  }
  // Hierholzer 算法寻找以 JFK 为起点的欧拉路径
  // 计算以 JFK 为起点的后序遍历结果
  const postOrder = [];
  const traverse = function (graph, node, postOrder) {
    if (!graph.has(node)) {
      postOrder.push(node);
      return;
    }
    // 复制节点列表，避免在遍历过程中修改原列表
    while (graph.get(node).length > 0) {
      const v = graph.get(node)[0];
      graph.get(node).splice(0, 1);
      traverse(graph, v, postOrder);
    }
    // 获取后序遍历结果
    postOrder.push(node);
  };
  traverse(graph, "JFK", postOrder);
  // 反转后序遍历结果，得到欧拉路径
  postOrder.reverse();
  return postOrder;
};