/*
 * @lc app=leetcode id=207 lang=javascript
 *
 * [207] Course Schedule
 */

// @lc code=start
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */

/* 方法一：入度表（广度优先遍历） BFS */
// BFS 的方法，通过入度表来检测有没有环，最终没环达成的结果是遍历过的课的数量 == 课程总数，时间复杂度 O(V + E)，空间复杂度 O(V + E)
var canFinish = function (numCourses, prerequisites) {
  // 1. Build Graph
  // graph[from] = [to1, to2, ...] 表示 from 这门课是 to1、to2、... 这些课的前置课程
  let graph = Array.from({ length: numCourses }, () => []), preCourseCount = Array.from({ length: numCourses }, () => 0)
  for (let [course, pre] of prerequisites) {
    graph[pre].push(course);
    preCourseCount[course] += 1;
  }

  // 2. 找出入度为 0 (没有前置课程)的课
  let queue = [], courseAttend = 0;
  for (let i = 0; i < preCourseCount.length; i++) {
    if (preCourseCount[i] == 0) {
      queue.push(i);
    }
  }

  // 2. BFS，题目的目的是能不能完成所有课程，即检测有没有环
  while (queue.length) {
    let course = queue.shift();
    courseAttend += 1;

    for (let nextCourse of graph[course]) {
      // 上了 course 本课，所以相应的 preCourseCount[nextCourse] -= 1
      preCourseCount[nextCourse] -= 1;

      if (preCourseCount[nextCourse] == 0) {
        queue.push(nextCourse)
      }
    }
  }

  // 4. 最后查看是不是上了所有的课 
  return courseAttend === numCourses;
}


canFinish(4, [[1, 0], [2, 0], [3, 1], [3, 2]])


// DFS 的方法，通过递归的方式来检测有没有环，时间复杂度 O(V + E)，空间复杂度 O(V + E)
// DFS visited[] 和 path[], visited 用于全图看这个节点有没有被访问过，path 用于当前 DFS 的路径上看这个节点有没有被访问过
// 最终没环达成的结果是 visited[] 中所有节点都被访问过了， 或者中途检测到环了，直接返回 false
var canFinish2 = function (numCourses, prerequisites) {
  // 1. Build Graph
  let graph = {}, path = new Set(), visited = new Array(numCourses).fill(false), hasCycle = false;
  for (let [course, pre] of prerequisites) {
    graph[pre] = (graph[pre] || []).concat(course);
  }

  // 2. DFS 逻辑
  function traveler(course) {
    if (path.has(course)) {
      hasCycle = true;
      return;
    }

    if (!graph[course] || visited[course]) return;

    visited[course] = true;
    path.add(course);
    for (let c of graph[course]) {
      // 这里不能用 !visited[c]&&traveler(c)，因为我们需要在 DFS 的过程中检测有没有环，所以不能直接跳过 visited[c] == true 的节点，因为它可能在当前 DFS 的路径上，形成了一个环
      // 如果 traveler(c) 前面加了 !visited[c],下一步if (path.has(course)) 就检测不到环了
      // 什么时候可以用？当题目保证图没有环
      traveler(c);
      if (hasCycle) return;
    }
    path.delete(course);
  }

  // 3. 遍历图中的每个节点，进行 DFS·
  for (let i = 0; i < numCourses; i++) {
    if (!visited[i]) {
      traveler(i);

      if (hasCycle) return false;
    }
  }

  return true;
}

// BFS
var canFinish = function (numCourses, prerequisites) {
  // 建图，有向边代表「被依赖」关系
  let indegree = new Array(numCourses).fill(0);
  let graph = buildGraph();

  // 根据入度初始化队列中的节点,即所有入度为 0 的节点
  let q = [];
  for (let i = 0; i < numCourses; i++) {
    if (indegree[i] === 0) {
      // 节点 i 没有入度，即没有依赖的节点
      // 可以作为拓扑排序的起点，加入队列
      q.push(i);
    }
  }

  // 记录遍历的节点个数
  let count = 0;
  // 开始执行 BFS 循环
  while (q.length) {
    // 弹出节点 cur，并将它指向的节点的入度减一
    let cur = q.shift();
    count++;
    for (let next of graph[cur]) {
      indegree[next]--;
      // 进 queue 的条件是入度变为 0，即 next 依赖的节点都已被遍历
      if (indegree[next] === 0) {
        // 如果入度变为 0，说明 next 依赖的节点都已被遍历
        q.push(next);
      }
    }
  }

  // 建图函数
  function buildGraph() {
    // 图中共有 numCourses 个节点
    var graph = new Array(numCourses);
    for (var i = 0; i < numCourses; i++) {
      graph[i] = [];
    }
    for (var j = 0; j < prerequisites.length; j++) {
      var edge = prerequisites[j];
      var from = edge[1], to = edge[0];
      // 添加一条从 from 指向 to 的有向边
      // 边的方向是「被依赖」关系，即修完课程 from 才能修课程 to
      graph[from].push(to);
      // 节点 to 的入度加一
      indegree[edge[0]]++;
    }

    return graph;
  }

  // 如果所有节点都被遍历过，说明不成环
  return count === numCourses;
}

// canFinish2(100, [[1, 0], [2, 0], [2, 1], [3, 1], [3, 2], [4, 2], [4, 3], [5, 3], [5, 4], [6, 4], [6, 5], [7, 5], [7, 6], [8, 6], [8, 7], [9, 7], [9, 8], [10, 8], [10, 9], [11, 9], [11, 10], [12, 10], [12, 11], [13, 11], [13, 12], [14, 12], [14, 13], [15, 13], [15, 14], [16, 14], [16, 15], [17, 15], [17, 16], [18, 16], [18, 17], [19, 17], [19, 18], [20, 18], [20, 19], [21, 19], [21, 20], [22, 20], [22, 21], [23, 21], [23, 22], [24, 22], [24, 23], [25, 23], [25, 24], [26, 24], [26, 25], [27, 25], [27, 26], [28, 26], [28, 27], [29, 27], [29, 28], [30, 28], [30, 29], [31, 29], [31, 30], [32, 30], [32, 31], [33, 31], [33, 32], [34, 32], [34, 33], [35, 33], [35, 34], [36, 34], [36, 35], [37, 35], [37, 36], [38, 36], [38, 37], [39, 37], [39, 38], [40, 38], [40, 39], [41, 39], [41, 40], [42, 40], [42, 41], [43, 41], [43, 42], [44, 42], [44, 43], [45, 43], [45, 44], [46, 44], [46, 45], [47, 45], [47, 46], [48, 46], [48, 47], [49, 47], [49, 48], [50, 48], [50, 49], [51, 49], [51, 50], [52, 50], [52, 51], [53, 51], [53, 52], [54, 52], [54, 53], [55, 53], [55, 54], [56, 54], [56, 55], [57, 55], [57, 56], [58, 56], [58, 57], [59, 57], [59, 58], [60, 58], [60, 59], [61, 59], [61, 60], [62, 60], [62, 61], [63, 61], [63, 62], [64, 62], [64, 63], [65, 63], [65, 64], [66, 64], [66, 65], [67, 65], [67, 66], [68, 66], [68, 67], [69, 67], [69, 68], [70, 68], [70, 69], [71, 69], [71, 70], [72, 70], [72, 71], [73, 71], [73, 72], [74, 72], [74, 73], [75, 73], [75, 74], [76, 74], [76, 75], [77, 75], [77, 76], [78, 76], [78, 77], [79, 77], [79, 78], [80, 78], [80, 79], [81, 79], [81, 80], [82, 80], [82, 81], [83, 81], [83, 82], [84, 82], [84, 83], [85, 83], [85, 84], [86, 84], [86, 85], [87, 85], [87, 86], [88, 86], [88, 87], [89, 87], [89, 88], [90, 88], [90, 89], [91, 89], [91, 90], [92, 90], [92, 91], [93, 91], [93, 92], [94, 92], [94, 93], [95, 93], [95, 94], [96, 94], [96, 95], [97, 95], [97, 96], [98, 96], [98, 97], [99, 97]]);
