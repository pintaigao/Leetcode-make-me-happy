/*
 * @lc app=leetcode id=797 lang=javascript
 *
 * [797] All Paths From Source to Target
 */

// @lc code=start
/**
 * @param {number[][]} graph
 * @return {number[][]}
 */
/* Solution 1: DFS */
var allPathsSourceTarget = function (graph) {
  const adj = new Map(), N = graph.length - 1, res = [], path = [];

  // map中的key是节点label，value是与该节点相连的节点Set
  for (let i = 0; i < graph.length; i++) {
    adj.set(i, new Set(graph[i]));
  }

  function dfs(label) {
    // 先访问这个label
    path.push(label);
    if (label === N) {
      // path.slice() 深拷贝
      res.push(path.slice());
      path.pop();
      return;
    }
    // 再访问这个label的所有相连节点，从map中取出
    adj.get(label).forEach((v) => {
      dfs(v);
    });

    // 删除这个label
    path.pop();
  }

  // 从0开始深度优先遍历
  dfs(0);
  return res;
};

// Solution 2: BFS
var allPathsSourceTarget = function (graph) {
  const adj = new Map();
  const N = graph.length - 1;
  const res = [];
  for (let i = 0; i < graph.length; i++) {
    adj.set(i, new Set(graph[i]));
  }

  const queue = [[0, new Set()]];
  while (queue.length) {
    const [node, set] = queue.shift();
    // 先访问这个label,路径 += label
    set.add(node);
    // 如果到头了，把路径放入res
    if (node === N) {
      res.push([...set]);
    }
    // 再看这个label的所有相连节点，一个一个放入queue，发散来看
    for (let k of adj.get(node)) {
      queue.push([k, new Set(set)]);
    }
  }
  return res;
};

var allPathsSourceTarget = function (graph) {
  const N = graph.length - 1;
  const res = [];
  const path = [];
  const queue = [0];
  while (queue.length) {
    const [node] = queue.shift();
    // 先访问这个label,路径 += label
    path.push(node);
    // 如果到头了，把路径放入res
    if (node === N) {
      res.push([...path]);
    }
    // 再看这个label的所有相连节点，一个一个放入queue，发散来看
    for (let k of graph[node]) {
      queue.push(k);
    }
  }
  return res;
};
// @lc code=end


// 练习
// Since the problem asks for all possible paths from source to target, not the shortest path or the number of paths, my first instinct is to use DFS to enumerate every valid path.
// DFS fits this kind of problem very naturally: we start from node 0, keep exploring deeper, and whenever we reach the target, we record the current path.
// Also, the graph is a DAG, so we don’t need to worry about cycles here.
// 基本骨架 basic skeleton
var allPathsSourceTarget = function (graph) {
  // 1. First, I’ll create a result array res to store all valid paths.
  const res = [], target = graph.length - 1;
  // 4.At this point, I realize that knowing only the current node is not enough, because I need to return the full path.
  // So I need a path array to track the current path from 0 to the current node.
  // Since the source is always 0, I’ll initialize it as [0].
  // When I reach the target, I’ll add the current path to the result.
  const path = [0]
  // 2. I’ll define a recursive function dfs(node), where node represents the current node I’m visiting.
  function dfs(node) {
    // 3.先写终点判断 The base case should be when the current node equals the target, which is n - 1. If I get here, that means I’ve found one complete path.
    if (node === target) {
      res.push([...path])
      return
    }
    // 5.If I haven’t reached the target yet, I’ll iterate through all neighbors of the current node.
    // graph[node] gives me all the next nodes I can go to from here.
    for (const next of graph[node]) {
      // 6.For each neighbor, I need to add it to the current path first, because I’m about to recurse into that node.
      path.push(next)
      dfs(next)
      // 7.After the recursive call returns, I need to remove the node I just added, so I restore the path to its previous state.
      // That way I can try the next branch cleanly.
      // This is the standard backtracking step.
      path.pop()
    }
  }
  // 8.Finally, I start DFS from node 0, and once the traversal finishes, I return res.
  dfs(0)
  return res;
}

// BFS 面试版
var allPathsSourceTarget = function (graph) {
  // 1.First, I’ll create the result array.
  const res = []
  // 2. Since I’m using BFS, I need a queue.
  // I know I want to start from node 0. Let me think about what exactly I need to store in the queue.
  const queue = []
  // 3. If I only store the current node in the queue, I can traverse the graph, but when I reach the target, I won’t know the full path.
  // So storing only the node is not enough.
  // So each queue entry should store both the current node and the path used to get there.
  queue.push({ node: 0, path: [0] })
  // Here, each queue entry is a state object.
  // node is where I am now, and path is how I got there from the source.
  // 4. Now I’ll process the queue in standard BFS fashion.
  while (queue.length) {
    // 5. For each state, I extract the current node and the current path.
    const current = queue.shift()
    const node = current.node, path = current.path

    // 6. 中止条件 If the current node is the target, then the current path is one complete answer.
    if (node === graph.length - 1) {
      res.push(path)
      continue;
    }

    // 7. 如果不是终点，就扩展邻居 Otherwise, I expand all neighbors of the current node.
    for (const next of graph[node]) {
      // 8. When I go to a neighbor, I need to create a new state.The new node is next, and the new path should be the old path plus this next node.
      // 9. I create a new path with [...path, next] so each state has its own independent path.
      queue.push({
        node: next,
        path: [...path, next]
      })
    }
  }

  return res;
  // 总结：So the key idea in the BFS solution is that the queue stores states rather than just nodes.
  // Each state includes the current node and the full path to reach it.
  // Whenever I pop a state, if it’s already at the target, I record the path; otherwise, I expand its neighbors and enqueue new states.
}

