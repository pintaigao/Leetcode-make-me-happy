/*
 * @lc app=leetcode id=851 lang=javascript
 *
 * [851] Loud and Rich
 */
/**
 * @param {number[][]} richer
 * @param {number[]} quiet
 * @return {number[]}
 */
var loudAndRich = function (richer, quiet) {
  let res = [], N = quiet.length, graph = [], i = 0

  for (i = 0; i < N; i++) {
    graph.push([])
  }

  for (i = 0; i < richer.length; i++) {
    let tmp = richer[i]
    graph[tmp[1]].push(tmp[0])
  }

  var dfs = function (node) {
    if (res[node] === undefined) {
      res[node] = node
      graph[node].forEach(rich => {
        var cand = dfs(rich)
        if (quiet[cand] < quiet[res[node]]) {
          res[node] = cand
        }
      });
    }
    return res[node]
  }

  for (i = 0; i < N; i++) {
    dfs(i)
  }

  return res
};

loudAndRich([[1, 0], [2, 1], [3, 1], [3, 7], [4, 3], [5, 3], [6, 3]], [3, 2, 5, 4, 6, 1, 7, 0])

