/*
 * @lc app=leetcode id=329 lang=javascript
 *
 * [329] Longest Increasing Path in a Matrix
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {number}
 */

// 扩散的方向，上下左右
let dirs = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

/* 1. BFS 超时 */
var longestIncreasingPath = function (matrix) {
  // 从每个点出发，看它能扩散多远
  let [m, n, queue, ans] = [matrix.length, matrix[0].length, [], 0];

  // BFS开始，需要将所有节点都加入初始队列
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      queue.push([i, j]);
    }
  }

  while (queue.length) {
    ans++;
    // 内层循环表示一次处理一批，这一批都是相同路径长度的
    let size = queue.length;
    for (let c = 0; c < size; c++) {
      let poll = queue.shift();
      let [i, j] = [poll[0], poll[1]];
      for (let dir of dirs) {
        let [nextI, nextJ] = [i + dir[0], j + dir[1]];
        // 看上下左右有没有比自己大的，有则加入队列，下一批处理
        if (nextI >= 0 && nextJ >= 0 && nextI < m && nextJ < n && matrix[nextI][nextJ] > matrix[i][j]) {
          queue.push([nextI, nextJ]);
        }
      }
    }
  }

  return ans;
};

/* 方法2： 拓扑排序 */
var longestIncreasingPath = function (matrix) {
  // 把符合题目要求的点连起来就是有一张有向无环图
  // 所以我们可以使用多源BFS拓扑排序寻找最短路径的思想在这里寻找最长路径
  let [m, n, queue, ans] = [matrix.length, matrix[0].length, [], 0];
  // BFS记录每个节点的出度
  let outDegree = new Array(m).fill(null).map(() => new Array(n).fill(0));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      for (let dir of dirs) {
        let [nextI, nextJ] = [i + dir[0], j + dir[1]];
        // 只要旁边节点的值比它大，它的出度就加1 (就是从它可以向周围几个走)
        if (nextI >= 0 && nextJ >= 0 && nextI < m && nextJ < n && matrix[nextI][nextJ] > matrix[i][j]) {
          outDegree[i][j] += 1;
        }
      }
    }
  }

  // 多源BFS（可以跟上面的循环合在一起）
  // 为了更清晰，这里单独写这个循环， 出度为0（即旁边没有比它更大的）的加入list中
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (outDegree[i][j] == 0) {
        queue.push([i, j]);
      }
    }
  }

  while (queue.length) {
    ans++;
    // 一次遍历一批，每遍历一批，相当于最长路径又加了一
    let size = queue.length;
    for (let c = 0; c < size; c++) {
      let pos = queue.shift();
      let [i, j] = [pos[0], pos[1]];
      // 相当于反向操作
      for (let dir of dirs) {
        let [preI, preJ] = [i + dir[0], j + dir[1]];
        if (preI >= 0 && preI < m && preJ >= 0 && preJ < n && matrix[preI][preJ] < matrix[i][j]) {
          outDegree[preI][preJ] -= 1;
          // 指向当前元素的节点的出度减1，减到0(说明周围没有比它更大的了)就入队
          if (outDegree[preI][preJ] == 0) {
            queue.push([preI, preJ]);
          }
        }
      }
    }
  }

  return ans;
};
// @lc code=end
