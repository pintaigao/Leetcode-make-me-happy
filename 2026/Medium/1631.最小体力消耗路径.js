import { PriorityQueue } from "../../Algorithm/priority-queue.js";

var minimumEffortPath = function (heights) {
  // Dijkstra 算法，计算 (0, 0) 到 (m - 1, n - 1) 的最小体力消耗
  return dijkstra(heights);

  // 记录当前位置和从起点到当前位置的最小体力消耗
  function State(row, col, effortFromStart) {
    this.row = row;
    this.col = col;
    this.effortFromStart = effortFromStart;
  }

  // Dijkstra 算法模板 https://labuladong.online/algo/data-structure/dijkstra/
  function dijkstra(matrix) {
    // 记录从起点 (0, 0) 到每个节点的最小体力消耗
    const m = matrix.length, n = matrix[0].length, distTo = Array.from({ length: m }, () => Array(n).fill(Infinity));

    let pq = new PriorityQueue((a, b) => a.effortFromStart - b.effortFromStart);
    // 从起点 (0, 0) 开始进行 dijkstra 算法
    distTo[0][0] = 0;
    pq.push(new State(0, 0, 0));

    while (pq.size() > 0) {
      const state = pq.pop();
      const curRow = state.row, curCol = state.col, curEffortFromStart = state.effortFromStart;

      // 已经存在更优路径，则跳过
      if (distTo[curRow][curCol] < curEffortFromStart) {
        continue;
      }

      // 判断是否已经到达目标点
      if (curRow === m - 1 && curCol === n - 1) {
        return distTo[curRow][curCol];
      }

      for (const neighbor of adj(matrix, curRow, curCol)) {
        const nextRow = neighbor[0], nextCol = neighbor[1]
        // 从起点到下一个节点的体力消耗 = 从起点到当前节点的体力消耗 和 当前节点到下一个节点的体力消耗 的较大值
        // 体力消耗 = 当前节点到下一个节点的高度差
        // Math.max的原因是因为题目要求的是路径上每一步的体力消耗的最大值，而不是所有步骤的体力消耗之和。
        let nextEffortFromStart = Math.max(curEffortFromStart, Math.abs(matrix[nextRow][nextCol] - matrix[curRow][curCol]));
        // let nextEffortFromStart = curEffortFromStart + Math.abs(matrix[nextRow][nextCol] - matrix[curRow][curCol]);
        // 已经存在更优路径，则跳过
        if (distTo[nextRow][nextCol] <= nextEffortFromStart) {
          continue;
        }
        pq.push(new State(nextRow, nextCol, nextEffortFromStart));
        distTo[nextRow][nextCol] = nextEffortFromStart;
      }
      console.log(pq._data);
      console.log(d);
    }



    return -1;
  }

  // 返回坐标 (x, y) 的上下左右相邻坐标
  function adj(matrix, x, y) {
    // 方向数组，上下左右的坐标偏移量 
    const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]], m = matrix.length, n = matrix[0].length, neighbors = [];
    for (const dir of dirs) {
      const nx = x + dir[0], ny = y + dir[1];
      if (nx >= m || nx < 0 || ny >= n || ny < 0) {
        // 索引越界
        continue;
      }
      neighbors.push([nx, ny]);
    }
    return neighbors;
  }
};

console.log("Test case result: ", minimumEffortPath([[1, 2, 2], [3, 8, 2], [5, 3, 5]])); // 2