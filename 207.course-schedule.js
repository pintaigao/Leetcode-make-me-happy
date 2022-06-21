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

/* 方法一：入度表（广度优先遍历） */
var canFinish = function (numCourses, prerequisites) {
  let [indegrees, adjacency, queue] = [new Array(numCourses).fill(0), [], []]; // 初始化入度数组

  for (let i = 0; i < numCourses; i++) {
    adjacency.push([]);
  }

  // Get the indegree and adjacency of every course.
  for (let [course, prerequisites_course] of prerequisites) {
    indegrees[course] += 1;
    adjacency[prerequisites_course].push(course);
  }

  // Get all the courses with the indegree of 0.
  for (let i = 0; i < numCourses; i++) {
    indegrees[i] == 0 && queue.push(i);
  }
  // BFS TopSort.
  while (queue.length) {
    let pre = queue.shift();
    // 上了一节课，数量减1
    numCourses--;
    for (let course of adjacency[pre]) {
      indegrees[course] -= 1;
      if (indegrees[course] == 0) queue.push(course);
    }
  }
  return numCourses == 0;
};

/* 方法二：深度优先遍历: 原理是通过 DFS 判断图中是否有环。 */
var canFinish = function (numCourses, prerequisites) {
  List<List<Integer>> adjacency = new ArrayList<>();
  for(int i = 0; i < numCourses; i++)
      adjacency.add(new ArrayList<>());
  int[] flags = new int[numCourses];
  for(int[] cp : prerequisites)
      adjacency.get(cp[1]).add(cp[0]);
  for(int i = 0; i < numCourses; i++)
      if(!dfs(adjacency, flags, i)) return false;
  return true;
};
// @lc code=end
