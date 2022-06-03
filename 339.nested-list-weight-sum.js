var depthSum = function (nestedList) {
  let dfs = function (list, depth) {
    let total = 0;
    for (let nested of list) {
      if (nested.isInteger()) {
        total += nested.getInteger() * depth;
      } else {
        total += dfs(nested.getList(), depth + 1);
      }
    }
    return total;
  };
  return dfs(nestedList, 1);
};

// 2.BFS O(N) O(N)
let depthSum2 = function (nestedList) {
  let queue = [];
  queue = [...queue, ...nestedList];

  let depth = 1;
  let total = 0;

  while (queue.length) {
    // size固定
    let size = queue.length;
    for (let i = 0; i < size; i++) {
      let nested = queue.shift();
      if (nested.isInteger()) {
        total += nested.getInteger() * depth;
      } else {
        // 一层一层往下剥
        queue = [...queue, ...nested.getList()];
      }
    }
    depth += 1;
  }
  return total;
};
