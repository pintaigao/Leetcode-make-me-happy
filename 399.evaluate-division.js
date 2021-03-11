/*
 * @lc app=leetcode id=399 lang=javascript
 *
 * [399] Evaluate Division
 */

// @lc code=start
/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */

// Approach 1: Path Search in Graph
var calcEquation = function (equations, values, queries) {
  let graph = {};

  let visited = new Set();

  let backtrackEvaluate = function (currNode, targetNode, accProduct) {
    // mark the visit
    visited.add(currNode);
    let ret = -1.0;

    let neighbors = graph[currNode];
    if (neighbors[targetNode]) ret = accProduct * neighbors[targetNode];
    else {
      for (let pair in neighbors) {
        let nextNode = pair[0];
        if (visited.has(nextNode)) continue;
        ret = backtrackEvaluate(nextNode, targetNode, accProduct * pair[1]);
        if (ret != -1.0) break;
      }
    }

    // unmark the visit, for the next backtracking
    visited.delete(currNode);
    return ret;
  };

  // Step 1). build the graph from the equations
  for (let i = 0; i < equations.length; i++) {
    let equation = equations[i];
    let dividend = equation[0],
      divisor = equation[1];
    let quotient = values[i];

    if (!graph[dividend]) graph[dividend] = {};
    if (!graph[divisor]) graph[divisor] = {};

    graph[dividend][divisor] = quotient;
    graph[divisor][dividend] = 1 / quotient;
  }

  // Step 2). Evaluate each query via bactracking (DFS)
  // by verifying if there exists a path from dividend to divisor
  let results = new Array(queries.length).fill(0.0);
  for (let i = 0; i < queries.length; i++) {
    let query = queries[i];
    let dividend = query[0],
      divisor = query[1];

    if (!graph[dividend] || !graph[divisor]) results[i] = -1.0;
    else if (dividend == divisor) results[i] = 1.0;
    else {
      visited = new Set();
      results[i] = backtrackEvaluate(dividend, divisor, 1);
    }
  }

  console.log(results);
  return results;
};

// Approach 1: BFS
var calcEquation = function (equations, values, queries) {};

calcEquation(
  [
    ["a", "b"],
    ["b", "c"],
  ],
  [2.0, 3.0],
  [
    ["a", "c"],
    ["b", "a"],
    ["a", "e"],
    ["a", "a"],
    ["x", "x"],
  ]
);
// @lc code=end
