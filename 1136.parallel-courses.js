/*
 * @lc app=leetcode id=1136 lang=javascript
 *
 * [1136] Parallel Courses
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} relations
 * @return {number}
 */

// BFS Solution
var minimumSemesters = function (n, relations) {
  // 创建邻接表和入度数组
  const adjList = {}  // 用于存储每个节点的相邻节点
  const counts = {}   // 用于存储每个节点的入度
  for (let i = 1; i <= n; i++) {
    adjList[i] = []   // 初始化邻接表为空数组
    counts[i] = 0     // 初始化入度为0
  }

  // 构建邻接表和入度数组
  relations.forEach(r => {
    adjList[r[0]].push(r[1])  // 将先修关系添加到邻接表中
    counts[r[1]]++            // 表示r[1]这个课有多少个前置课
  })

  // 找出入度为0的课程，即没有先修课程的课程，作为BFS的起点
  let queue = Object.keys(counts).filter(k => counts[k] === 0)

  // 如果没有入度为0的节点，说明存在环，返回-1
  if (!queue.length) return -1

  let res = 0, visited = 0; // 记录学期数 和 记录访问的节点数
  while (queue.length) {
    res++           // 学期数加1
    const newQueue = []   // 用于存储下一个学期的节点
    while (queue.length) {
      const node = queue.shift()  // 取出队列中的节点
      visited++                   // 访问节点数加1
      adjList[node].forEach(n => {
        if (counts[n] >= 1) {
          counts[n]--             // 更新后续课程的入度
          if (!counts[n]) newQueue.push(n)  // 如果入度为0，加入下一个学期的队列
        }
      })
    }
    queue = newQueue  // 更新队列为下一个学期的节点
  }

  // 如果访问的节点数等于总节点数，表示所有课程都学完了，返回学期数，否则返回-1
  return visited === n ? res : -1
};
// @lc code=end

