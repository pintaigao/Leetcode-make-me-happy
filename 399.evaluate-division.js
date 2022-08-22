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

/* BFS */
var calcEquation = function (equations, values, queries) {
  let nvars = 0;
  const variables = new Map();
  /**
   * equations里面的每一组，每一组中的第一个和第二个，如果map没有，分别放入map中，value就是第几个算到他们头上的
   * Map { 'a' => 0, 'b' => 1, 'c' => 2 }
   */
  for (let i = 0; i < equations.length; i++) {
    if (!variables.has(equations[i][0])) {
      variables.set(equations[i][0], nvars++);
    }
    if (!variables.has(equations[i][1])) {
      variables.set(equations[i][1], nvars++);
    }
  }

  /* 对于每个点，存储其直接连接到的所有点及对应的权值
  edges中的每个index代表对应的点
  index所对应的list，表示[另外一个点，index对应的点/另外一个点 所得到的的值]
  [
    [ [ 1, 2 ] ],
    [ [ 0, 0.5 ], [ 2, 3 ] ],
    [ [ 1, 0.3333333333333333 ] ]
  ] */
  const edges = new Array(nvars).fill(0).map(() => []);
  for (let i = 0; i < equations.length; i++) {
    const [va, vb] = [variables.get(equations[i][0]), variables.get(equations[i][1])];
    edges[va].push([vb, values[i]]);
    edges[vb].push([va, 1.0 / values[i]]);
  }

  const ret = [];
  for (let i = 0; i < queries.length; i++) {
    const query = queries[i];
    let result = -1.0;
    if (variables.has(query[0]) && variables.has(query[1])) {
      // 如果这个query里面的两个点，map中都有的话
      const [ia, ib] = [variables.get(query[0]), variables.get(query[1])];
      if (ia === ib) {
        result = 1.0;
      } else {
        // 从a除到b
        const points = [ia];
        const ratios = new Array(nvars).fill(-1.0);
        ratios[ia] = 1.0;

        while (points.length && ratios[ib] < 0) {
          const x = points.pop();
          for (const [y, val] of edges[x]) {
            if (ratios[y] < 0) {
              ratios[y] = ratios[x] * val;
              points.push(y);
            }
          }
        }
        result = ratios[ib];
      }
    }
    ret[i] = result;
  }
  return ret;
};
// @lc code=end

calcEquation(
  [
    ["a", "b"],
    ["b", "c"],
  ],
  [2.0, 3.0],
  [(["a", "c"], ["b", "a"], ["a", "e"], ["a", "a"], ["x", "x"])]
);
