/*
 * @lc app=leetcode id=207 lang=javascript
 *
 * [207] Course Schedule
 */
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
  const seen = new Set();
  const seeing = new Set();
  const adj = [...Array(numCourses)].map(r => []);
  console.log(adj);

  for (let [u, v] of prerequisites) {
    adj[v].push(u);
  }
  for (let i = 0; i < numCourses; i++) {
    if (!search(i)) {
      return false;
    }
  }
  return true;

  function search(course) {
    if (seen.has(course)) {
      return true;
    }
    if (seeing.has(course)) {
      return false;
    }
    seeing.add(course);
    for (let v of adj[course]) {
      if (!search(v)) {
        return false;
      }
    }
    seeing.delete(course);
    seen.add(course);
    return true;
  }
};

canFinish(2, [[1, 0], [0, 1]]);


