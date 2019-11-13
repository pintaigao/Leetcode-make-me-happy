/*
 * @lc app=leetcode id=323 lang=javascript
 *
 * [323] Number of Connected Components in an Undirected Graph
 */
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countComponents = function (n, edges) {
  if (!n || n <= 1) return n;

  let adj = Array.from({ length: n }, x => []);

  for (let edge of edges) {
    adj[edge[0]].push(edge[1]);
    adj[edge[1]].push(edge[0]);
  }

  console.log(adj);

  let count = 0;
  for (let i = 0; i < n; i++) {
    if (adj[i].length) {
      count++;
      let queue = [];
      queue.push(i);
      while (queue.length > 0) {
        let curr = queue.shift();
        if (adj[curr].length) {
          let length = adj[curr].length;
          for (let i = 0; i < length; i++) {
            queue.push(adj[curr][i]);
            let indexOrr = adj[curr].indexOf(adj[curr][i]);
            let indexOrr2 = adj[adj[curr][i]].indexOf(curr);
            // adj[adj[curr][i]].splice(indexOrr2, 1);
            // adj[curr].splice(indexOrr, 1);
          }
        }
      }
    }
  }

  return count;
}

countComponents(5, [[0, 1], [0, 2], [2, 3], [2, 4]]);

