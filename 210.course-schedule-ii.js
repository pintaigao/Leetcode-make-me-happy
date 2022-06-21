/*
 * @lc app=leetcode id=210 lang=javascript
 *
 * [210] Course Schedule II
 */

// @lc code=start
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
/* BFS */
var findOrder = function (numCourses, prerequisites) {
  let inDegree = new Array(numCourses).fill(0); // 初始化入度数组
  let graph = {}; // 哈希表

  // 构建前置课数组和哈希表
  for (let [course, prerequisites_course] of prerequisites) {
    inDegree[course]++;
    graph[prerequisites_course] = graph[prerequisites_course] ? [course, ...graph[prerequisites_course]] : [course];
  }

  let res = []; // 结果数组
  let queue = []; // 存放前置课为0的课
  for (let i = 0; i < numCourses; i++) {
    // 起初推入所有前置课为0的课
    if (inDegree[i] === 0) queue.push(i);
  }

  // 先选前置课为0的课
  while (queue.length) {
    // 没有了前置课为0的课，没课可选，结束循环
    let cur = queue.shift(); // 出栈，代表选这门课
    res.push(cur); // 推入结果数组
    let toEnQueue = graph[cur]; // 这个课的后置课
    if (toEnQueue && toEnQueue.length) {
      // 确保有后续课程
      for (let course of toEnQueue) {
        // 遍历后续课程
        inDegree[course]--; // 将后置课的前置课数量-1
        if (inDegree[course] == 0) {
          // 一旦减到0，让该课入列
          queue.push(course);
        }
      }
    }
  }
  return res.length === numCourses ? res : []; // 选齐了就返回res，否则返回[]
};
// @lc code=end
