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
  // 用于存储每个节点的相邻节点
  // 用于存储每个节点的入度
  // 记录学期数 和 记录访问的节点数
  let adjList = {}, counts = Array.from({ length: n + 1 }, () => 0), terms = 0, visited = 0, queue = [];
  // 构建邻接表和入度数组
  for (let i = 0; i < relations.length; i++) {
    adjList[relations[i][0]] = (adjList[relations[i][0]] || []).concat(relations[i][1]) // 将先修关系添加到邻接表中
    counts[relations[i][1]] += 1 // 表示relations[1]这个课有多少个前置课
  }
  // 找出入度为0的课程，即没有先修课程的课程，作为BFS的起点
  for (let i = 1; i <= n; i++) { if (!counts[i]) queue.push(i) } // 将入度为0的课程加入队列

  // 如果没有入度为0的节点，说明存在环，返回-1
  if (!queue.length) return -1
  while (queue.length) {
    terms += 1           // 学期数加1
    const size = queue.length;   // 用于存储下一个学期的节点数
    for (let i = 0; i < size; i++) {
      const node = queue.shift()  // 取出队列中的节点
      visited += 1                   // 访问节点数加1

      if (adjList[node]) { // 如果当前节点有相邻节点
        for (let course of adjList[node]) {  // 遍历当前节点的相邻节点
          if (counts[course] >= 1) {
            counts[course] -= 1 // 更新后续课程的入度
            if (!counts[course]) queue.push(course)  // 如果入度为0，加入下一个学期的队列
          }
        }
      }
    }
  }

  // 如果访问的节点数等于总节点数，表示所有课程都学完了，返回学期数，否则返回-1
  return visited === n ? terms : -1
};
// @lc code=end

