import { PriorityQueue } from "../Algorithm/priority-queue.js"
/**
 * @param {number[][]} grid
 * @return {number}
 */
var swimInWater = function (grid) {
  const n = grid.length, dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]], visited = Array.from({ length: n }, () => Array(n).fill(false)), time = 0;

  // MinHeap stores [value, row, col]
  const pq = new PriorityQueue((a, b) => a[0] - b[0]);

  pq.push([grid[0][0], 0, 0]);
  visited[0][0] = true;

  while (pq.size() > 0) {
    const [value, row, col] = pq.pop();

    // The water level must be at least the max height we have seen so far
    time = Math.max(time, value);

    // If we reach bottom-right, this is the minimum possible time
    if (row === n - 1 && col === n - 1) {
      return time;
    }

    for (const [dr, dc] of dirs) {
      const nr = row + dr;
      const nc = col + dc;

      if (nr < 0 || nr >= n || nc < 0 || nc >= n || visited[nr][nc]) { continue; }

      visited[nr][nc] = true;
      pq.push([grid[nr][nc], nr, nc]);
    }
  }

  return -1;
};


// DFS 
var swimInWater2 = function (grid) {
  //找到一条从[0, 0]到[n - 1, n - 1]的路径里，最大值 最小的路径
  let directions = [[0, 1], [1, 0], [-1, 0], [0, -1]], visited = Array.from({ length: grid.length }, () => new Array(grid[0].length).fill(false)), isValid = (x, y) => x >= 0 && x < grid.length && y >= 0 && y < grid[0].length && !visited[x][y], memo = new Map(), res = Infinity

  function dfs(x, y, max) {
    if (x == grid.length - 1 && y == grid[0].length - 1) {
      res = Math.min(res, max)
    }

    // 当前 path 的最大值
    for (let [dx, dy] of directions) {
      let [nx, ny] = [x + dx, y + dy]
      if (!isValid(nx, ny)) continue
      let curMax = Math.max(max, grid[nx][ny])
      // 没有意义了
      if (curMax >= res) continue

      let key = nx + ',' + ny
      if (memo.has(key) && memo.get(key) <= curMax) {
        continue //出现过达到这个点，最值更小的路径，跳过当前路径
      } else { // ！memo.has(key) ｜｜ memo.get(key) > curMax
        memo.set(key, curMax) //更新当前点的路过最小值
      }
      visited[nx][ny] = true //避免重复遍历
      //递归
      dfs(nx, ny, curMax)
      //回溯
      visited[nx][ny] = false //避免重复遍历
    }
  }

  // 当前 path 的最大值
  dfs(0, 0, grid[0][0])
  console.log(memo);

  return res
};

swimInWater2([[0, 1, 2, 3, 4], [24, 23, 22, 21, 5], [12, 13, 14, 15, 16], [11, 17, 18, 19, 20], [10, 9, 8, 7, 6]])