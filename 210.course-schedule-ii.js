/*
 * @lc app=leetcode id=210 lang=javascript
 *
 * [210] Course Schedule II
 */
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
  let adj = Array(numCourses).fill(null);
  let deg = Array(numCourses).fill(0);
  let order = [];
  for (let i = 0; i < prerequisites.length; i++) {
    let curr = prerequisites[i];
    if (!adj[curr[1]]) {
      adj[curr[1]] = [curr[0]];
    } else {
      adj[curr[1]].push(curr[0]);
    }
    deg[curr[0]]++;
  }

  console.log(adj);
  console.log(deg);

  let queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (!deg[i]) queue.push(i);
  }
  while (queue.length) {
    let course = queue.shift();
    order.push(course);
    numCourses--;
    if (adj[course]) {
      for (let next of adj[course]) {
        if (--deg[next] == 0) {
          queue.push(next);
        }
      }
    }
  }

  return numCourses ? [] : order;
};

console.log(
  findOrder(8, [
    [1, 0],
    [2, 6],
    [1, 7],
    [0, 7],
    [6, 4],
    [7, 0],
    [0, 5],
  ])
);
